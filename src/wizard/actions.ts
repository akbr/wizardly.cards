import { WizardShape } from "./types";
import { engine } from "./";
import { AppInterfaces } from "../lib/appInterfaces/types";
import { getHandHeight } from "../lib/cardsViews/handUpdate.calc";
import { deriveHand } from "../views/derivations";

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
    isInHand: (cardId = "") => deriveHand(getState()).includes(cardId),
    isValidPlay: (cardId: string) => {
      let { state, room } = getState();
      if (!room || !engine.isState(state)) return false;
      let nextState = engine.reducer(
        //@ts-ignore (has passed isState)
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
      let hand = deriveHand(getState());
      let screen = {
        w: window.innerWidth > 700 ? 700 : window.innerWidth,
        h: window.innerHeight,
      };
      let space = getHandHeight(screen, hand.length || 1);
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
