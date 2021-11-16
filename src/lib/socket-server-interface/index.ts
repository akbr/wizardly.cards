import type { EngineTypesShape, ServerApi } from "../socket-server/types";
import type { AppHarness } from "./types";

import { createSocketManager } from "../socket/socketManager";
import { createStore } from "./createStore";

export function createHarness<ET extends EngineTypesShape>(
  server: ServerApi<ET> | string
): AppHarness<ET> {
  const manager = createSocketManager(server);
  const { store, meter } = createStore<ET>(manager);
  return { manager, store, meter };
}
