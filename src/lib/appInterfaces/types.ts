import { SocketManager } from "../socket/socketManager";
import type {
  EngineTypesShape,
  OutputsWith,
  InputsWith,
  Room
} from "../server//types";
import { Meter } from "../timing";
import { StoreApi } from "zustand/vanilla";

// ----

type LocalStates = { type: "title" } | { type: "lobby" };

export type AllStates<ET extends EngineTypesShape> =
  | LocalStates
  | ET["states"]
  | ET["uiStates"];

export type StoreShape<ET extends EngineTypesShape> = {
  state: AllStates<ET>;
  room: Room["data"];
};

export type ManagerWith<ET extends EngineTypesShape> = SocketManager<
  InputsWith<ET>,
  OutputsWith<ET>
>;

export interface AppInterfaces<ET extends EngineTypesShape> {
  store: StoreApi<StoreShape<ET>>;
  manager: ManagerWith<ET>;
  meter: Meter<AllStates<ET>>;
}
