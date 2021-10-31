import { WizardShape } from "./types";
import { engine } from "./";
import { AppInterfaces } from "../lib/appInterfaces/types";
import { getHandHeight } from "../lib/cardsViews/handUpdate.calc";

export const createActions = ({
  store,
  manager,
  meter,
}: AppInterfaces<WizardShape>) => {
  const { send } = manager;
  const { getState, setState } = store;
  const { waitFor } = meter;

  return {
    join: (id?: string) => {
      //@ts-ignore
      send(["server", { type: "join", data: { id } }]);
    },
    start: () => send(["server", { type: "start" }]),
    addBot: () => send(["server", { type: "addBot" }]),
    bid: (num: number) => send(["engine", { type: "bid", data: num }]),
    selectTrump: (suit: string) =>
      send(["engine", { type: "selectTrump", data: suit }]),
    play: (cardId: string) => send(["engine", { type: "play", data: cardId }]),
    isInHand: (cardId = "") => {
      let { state, room } = getState();
      if (!room) return false;
      return "hands" in state
        ? state.hands[room.seatIndex].includes(cardId)
        : false;
    },
    isValidPlay: (cardId: string) => {
      let { state, room } = getState();
      if (!room || state.type !== "play") return false;
      let nextState = engine.reducer(
        state,
        { type: "play", data: cardId },
        room.seatIndex,
        room.seats.length
      );
      if (nextState.type === "err") {
        setState({ err: nextState });
        return false;
      } else {
        return true;
      }
    },
    getTableDimensions: () => {
      let { state } = getState();
      let numCards = "hands" in state ? state.hands[0].length : 1;
      let screen = {
        w: window.innerWidth > 700 ? 700 : window.innerWidth,
        h: window.innerHeight,
      };
      let space = getHandHeight(screen, numCards);
      let extraBuffer = 24;
      return {
        w: screen.w,
        h: screen.h - space - extraBuffer,
      };
    },
    exit: () => {
      manager.openSocket();
      meter.push({ type: "title" });
    },
    waitFor,
  };
};

export type Actions = ReturnType<typeof createActions>;
