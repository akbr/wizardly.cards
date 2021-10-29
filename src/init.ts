import { setup } from "goober";
import { h } from "preact";
import { render } from "./lib/premix";

import { App } from "./views/App";
import { engine } from "./wizard";
import { initRemote, initLocal } from "./lib/appInterfaces";
import { createActions } from "./wizard/actions";
import { getUiStates } from "./wizard/getUiStates";

export function init() {
  setup(h);

  const isDev = location.port === "1234";
  const appInterfaces = isDev
    ? initLocal(engine, getUiStates)
    : initRemote(location.origin.replace(/^http/, "ws"), getUiStates);

  const { store, meter } = appInterfaces;
  const actions = createActions(appInterfaces);

  const $appRoot = document.getElementById("app")!;
  store.subscribe((x) => {
    render(h(App, { ...x, actions }), $appRoot, meter.waitFor);
  });

  store.setState({ state: { type: "title" } });

  return { ...appInterfaces, actions };
}
