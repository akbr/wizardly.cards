import type { Engine, EngineTypesShape, GetUiStates } from "../server/types";
import type { ManagerWith } from "./types";

import { createSocketManager } from "../socket/socketManager";
import { createServer } from "../server";
import { createStore } from "./createStore";

export function initLocal<T extends EngineTypesShape>(
  engine: Engine<T>,
  getUiStates?: GetUiStates<T>
) {
  const server = createServer(engine);
  const manager = createSocketManager(server);
  const { store, meter } = createStore<T>(manager, getUiStates);
  return { server, manager, store, meter };
}

export function initRemote<ET extends EngineTypesShape>(
  addr: string,
  getUiStates?: GetUiStates<ET>
) {
  const manager: ManagerWith<ET> = createSocketManager(addr);
  const { store, meter } = createStore<ET>(manager, getUiStates);
  return { manager, store, meter };
}
