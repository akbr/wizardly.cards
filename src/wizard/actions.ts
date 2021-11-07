import { WizardShape } from "../wizard/types";
import { AppHarness } from "../lib/appHarness/types";

import { engine } from "../wizard";
import { getHandHeight } from "../lib/cardsViews/handUpdate.calc";

export const createActions = ({
  store,
  manager,
  meter,
}: AppHarness<WizardShape>) => {
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
      let { room, state } = getState();
      if (!room || !state) return false;
      return state.hands[room.seatIndex].includes(cardId);
    },
    isValidPlay: (cardId: string) => {
      let { state, room } = getState();
      if (!room || !state || !engine.isState(state)) return false;
      let nextState = engine.reducer(
        state,
        { numSeats: room.seats.length },
        {
          action: { type: "play", data: cardId },
          seatIndex: room.seatIndex,
        }
      );
      if (nextState.type === "err") {
        setState({ err: nextState });
        return false;
      } else {
        return true;
      }
    },
    getTableDimensions: () => {
      let { room, state } = getState();
      let hand = room && state ? state.hands[room.seatIndex] : [];
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
    },
    waitFor,
  };
};

export type Actions = ReturnType<typeof createActions>;
