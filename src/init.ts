import { setup } from "goober";
import { h } from "preact";

import { render } from "lib/premix";
import { createServer } from "lib/server";
import { createHarness } from "lib/appHarness";
import { listenToHash } from "lib/appHarness/listenToHash";

import { WizardShape } from "./wizard/types";
import { engine } from "./wizard";
import { createActions } from "./wizard/actions";

import { AppOuter } from "./views/AppOuter";

export function init() {
  setup(h);

  const isDev = location.port === "1234";
  const server = isDev
    ? createServer(engine)
    : location.origin.replace(/^http/, "ws");

  const harness = createHarness<WizardShape>(server);
  const actions = createActions(harness);

  let { store, meter, manager } = harness;

  const $appRoot = document.getElementById("app")!;

  store.subscribe((frame, prevFrame) => {
    render(h(AppOuter, { frame, prevFrame, actions }), $appRoot, meter.waitFor);
  });

  manager.openSocket();

  listenToHash(harness);

  return { ...harness, actions, server };
}
