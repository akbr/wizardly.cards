import type { EngineTypesShape, GetUiStates } from "../server/types";
import type { ManagerWith, AllStates, StoreShape } from "./types";

import { default as createZStore } from "zustand/vanilla";
import { createMeter } from "../timing";
import { createHashEmitter, replaceHash } from "../hash";

export function createStore<ET extends EngineTypesShape>(
  manager: ManagerWith<ET>,
  getUiStates?: GetUiStates<ET>
) {
  const meter = createMeter<AllStates<ET>>();

  const store = createZStore<StoreShape<ET>>(() => ({
    state: { type: "init" },
    room: false
  }));

  meter.subscribe((state) => {
    store.setState({ state });
  });

  let prev: ET["states"] | undefined;
  manager.onData = (res) => {
    if (res[0] === "engine") {
      if (getUiStates) {
        let interim = getUiStates(res[1], prev);
        if (interim) {
          if (Array.isArray(interim)) {
            interim.forEach((s) => meter.push(s));
          } else {
            meter.push(interim);
          }
        }
      }
      prev = res[1];
      meter.push(res[1]);
    }

    if (res[0] === "engineMsg") {
      console.warn(res[1]);
    }

    if (res[0] === "server") {
      let room = res[1].data;

      if (room && room.started === false) {
        meter.push({ type: "lobby" });
        prev = undefined;
      }
      store.setState({ room });
    }

    let room = store.getState().room;
    replaceHash(
      room ? { id: room.id, playerIndex: room.seatIndex } : undefined
    );

    if (res[0] === "serverMsg") {
      console.warn(res[1]);
    }
  };

  createHashEmitter(({ id, playerIndex }) => {
    manager.openSocket();
    if (id !== undefined) {
      manager.send([
        "server",
        { type: "join", data: { id, seatIndex: playerIndex } }
      ]);
    } else {
      meter.push({ type: "title" });
    }
  });

  return { store, meter };
}
