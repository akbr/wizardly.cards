export type Msg = { type: string; [key: string]: any };
type Options = { [key: string]: any };

export type EngineTypesShape = {
  states: Msg;
  uiStates?: Msg;
  msgs: Msg;
  actions: Msg;
  options: Options | void;
  botOptions: Options | void;
};

export type Bot<States> = (
  state: States,
  botPlayerIndex: number | undefined
) => void;

export interface Engine<T extends EngineTypesShape> {
  shouldAddSeat?: (numSeats: number, gameStarted: boolean) => boolean;
  shouldRemoveSeat?: (numSeats: number, gameStarted: boolean) => boolean;
  shouldStart?: (numSeats: number) => boolean;
  autoStart?: boolean;
  getInitialState: (numSeats: number, options?: T["options"]) => T["states"];
  reducer: (
    state: T["states"],
    action: T["actions"],
    seatIndex: number,
    numSeats: number
  ) => T["states"] | T["msgs"];
  isState: (x: Msg) => boolean;
  adapt?: (
    state: T["states"],
    seatIndex: number,
    numSeats: number
  ) => T["states"];
  createBot?: (
    socket: { send: (action: T["actions"]) => void; close: () => void },
    options: T["botOptions"]
  ) => Bot<T["states"]>;
}

export type GetUiStates<T extends EngineTypesShape> = (
  state: T["states"],
  prev?: T["states"]
) => T["uiStates"] | T["uiStates"][] | undefined;

// ---

export type Room = {
  type: "room";
  data:
    | {
        id: string;
        seats: string[];
        spectators: number;
        seatIndex: number;
        started: boolean;
      }
    | false;
};

export type Error = {
  type: "error";
  data: string;
};

export type Join = {
  type: "join";
  data?: { id: string; seatIndex?: number };
};
export type Start<Options> = {
  type: "start";
  data?: Options;
};
export type AddBot<Options> = {
  type: "addBot";
  data?: Options;
};

export type ServerTypes<ET extends EngineTypesShape> = {
  states: Room;
  msgs: Error;
  actions: Join | Start<ET["options"]> | AddBot<ET["botOptions"]>;
};

export type OutputsWith<ET extends EngineTypesShape> =
  | ["engine", ET["states"]]
  | ["engineMsg", ET["msgs"]]
  | ["server", ServerTypes<ET>["states"]]
  | ["serverMsg", ServerTypes<ET>["msgs"]];

export type InputsWith<ET extends EngineTypesShape> =
  | ["engine", ET["actions"]]
  | ["server", ServerTypes<ET>["actions"]];
