import { WizardEngine } from "./types";
import { getPlayableCards } from "./logic";

export const createBot: WizardEngine["createBot"] = ({ send }) => (
  state,
  playerIndex
) => {
  const itsMyTurn =
    "activePlayer" in state && state.activePlayer === playerIndex;

  if (!itsMyTurn) return;

  if (state.type === "selectTrump") {
    send({ type: "selectTrump", data: "h" });
  }

  if (state.type === "bid") {
    send({ type: "bid", data: 0 });
  }

  if (state.type === "play") {
    let playable = getPlayableCards(state.hands[0], state.trick.cards);
    send({ type: "play", data: playable[0] });
  }
};
