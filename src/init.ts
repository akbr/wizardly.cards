import "../styles.css";
import { setup } from "goober";
import { h } from "preact";
import { render } from "./lib/premix";

import { App } from "./views/App";
import { engine } from "./wizard";
import { initRemote, initLocal } from "./lib/appInterfaces";
import { createActions } from "./wizard/actions";
import { getUiStates } from "./wizard/getUiStates";

export function init(remote = false) {
  setup(h);

  const url = location.origin.replace(/^http/, "ws");

  const appInterfaces = remote
    ? initRemote(url, getUiStates)
    : initLocal(engine, getUiStates);
  const { store, meter, manager } = appInterfaces;
  const actions = createActions(appInterfaces);

  const $appRoot = document.getElementById("app")!;
  store.subscribe((x) => {
    render(h(App, { ...x, actions }), $appRoot, meter.waitFor);
  });

  store.setState({ state: { type: "title" } });

  return { ...appInterfaces, actions };
}
