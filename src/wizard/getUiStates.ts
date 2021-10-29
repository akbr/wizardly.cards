import { GetUiStates } from "../lib/server/types";
import { WizardShape, UIStates } from "./types";

export const getUiStates: GetUiStates<WizardShape> = (s, prev) => {
  if (s.type === "end" || (prev && prev.type === "end")) return;

  let uiStates: UIStates[] = [];

  let isInitialPhase =
    s.type === "selectTrump" ||
    (s.type === "bid" &&
      s.bids.filter((x) => x !== false).length === 0 &&
      !(prev && prev.type === "selectTrump"));

  let injectWin = prev && prev.type === "play" && s.trick.cards.length === 0;

  let injectTurnOver = injectWin && isInitialPhase;

  let injectDeal = isInitialPhase;

  if (injectWin && s.prevTrick && prev) {
    let { cards, winner, leader } = s.prevTrick;
    uiStates.push({
      ...prev,
      type: "trickWin",
      activePlayer: -1,
      winner,
      trick: {
        cards,
        leader,
      },
    });
  }

  if (injectTurnOver && prev) {
    uiStates.push({
      ...prev,
      type: "turnOver",
      actuals: s.scores[s.scores.length - 1],
      activePlayer: -1,
      trick: s.trick,
    });
  }

  if (injectDeal) {
    uiStates.push({
      type: "deal",
      turn: s.turn,
      scores: s.scores,
    });
  }

  return uiStates.length ? uiStates : undefined;
};
