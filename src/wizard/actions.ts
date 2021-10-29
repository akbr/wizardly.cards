import { WizardShape } from "./types";
import { AppInterfaces } from "../lib/appInterfaces/types";
import { getHandHeight } from "../lib/cardsViews/handUpdate.calc";
import { getPlayableCards } from "./logic";

export const createActions = ({
  store,
  manager,
  meter,
}: AppInterfaces<WizardShape>) => {
  const { send } = manager;
  const { getState } = store;
  const { waitFor } = meter;

  return {
    join: (id?: string) => {
      let data = id ? { data: { id } } : {};
      send(["server", { type: "join", ...data }]);
    },
    start: () => send(["server", { type: "start" }]),
    addBot: () => send(["server", { type: "addBot" }]),
    bid: (num: number) => send(["engine", { type: "bid", data: num }]),
    selectTrump: (suit: string) =>
      send(["engine", { type: "selectTrump", data: suit }]),
    play: (cardId: string) => send(["engine", { type: "play", data: cardId }]),
    isInHand: (cardId?: string) => {
      if (!cardId) return false;
      let state = getState().state;
      return "hands" in state ? state.hands[0].indexOf(cardId) !== -1 : false;
    },
    isValidPlay: (cardId: string) => {
      let { state, room } = getState();
      if (
        state.type === "play" &&
        room &&
        state.activePlayer === room.seatIndex
      ) {
        let playable = getPlayableCards(state.hands[0], state.trick.cards);
        return playable.indexOf(cardId) !== -1;
      }
      return false;
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
