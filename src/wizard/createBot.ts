import { WizardEngine } from "./types";
import { getPlayableCards } from "./logic";
import { randomFromArray } from "../lib/random";

export const createBot: WizardEngine["createBot"] =
  ({ send }) =>
  (state, playerIndex) => {
    const itsMyTurn =
      "activePlayer" in state && state.activePlayer === playerIndex;

    if (!itsMyTurn) return;

    if (state.type === "selectTrump") {
      send({
        type: "selectTrump",
        data: randomFromArray(["c", "d", "h", "s"]),
      });
    }

    if (state.type === "bid") {
      send({ type: "bid", data: 0 });
    }

    if (state.type === "play") {
      let playableCards = getPlayableCards(state.hands[0], state.trick.cards);
      send({ type: "play", data: randomFromArray(playableCards) });
    }
  };
