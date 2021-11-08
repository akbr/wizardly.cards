import { setup } from "goober";
import { h } from "preact";
import { render } from "./lib/premix";

import { createServer } from "./lib/server";

import { engine } from "./wizard";
import { createHarness } from "./lib/appHarness";
import { listenToHash } from "./lib/appHarness/listenToHash";
import { createActions } from "./wizard/actions";

import { App } from "./views/App";

export function init() {
  setup(h);

  const isDev = location.port === "1234";
  const server = isDev
    ? createServer(engine)
    : location.origin.replace(/^http/, "ws");

  const harness = createHarness(server);
  const actions = createActions(harness);

  let { store, meter, manager } = harness;

  const $appRoot = document.getElementById("app")!;

  render(
    h(App, { ...harness.store.getState(), actions }),
    $appRoot,
    meter.waitFor
  );

  store.subscribe((frame) => {
    render(h(App, { ...frame, actions }), $appRoot, meter.waitFor);
  });

  manager.openSocket();

  listenToHash(harness);

  return { ...harness, actions, server };
}
