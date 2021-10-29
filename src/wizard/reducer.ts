import type { WizardEngine } from "./types";
import { toNextTurn, onSelectTrump, onBid, onPlay, err } from "./reducerFns";

export const getInitialState: WizardEngine["getInitialState"] = (
  numSeats,
  options
) =>
  toNextTurn({
    numPlayers: numSeats,
    options: options || { canadian: false }
  });

export const reducer: WizardEngine["reducer"] = (state, action, seatIndex) => {
  /**
   * Utility fns
   */
  const actionIsValid = () =>
    "activePlayer" in state &&
    state.activePlayer === seatIndex &&
    state.type === action.type;

  const isString = (x: unknown) => typeof x === "string";
  const isNumber = (x: unknown) => typeof x === "number";

  if (!actionIsValid()) return err("Not your turn");

  /**
   * Waterfall
   */
  if (state.type === "selectTrump") {
    return isString(action.data)
      ? onSelectTrump(state, action.data as string)
      : err("Invalid suit type (expected string).");
  }

  if (state.type === "bid") {
    return isNumber(action.data)
      ? onBid(state, action.data as number)
      : err("Invalid bid type (expected number).");
  }

  if (state.type === "play") {
    return isString(action.data)
      ? onPlay(state, action.data as string)
      : err("Invalid cardId type (expected string).");
  }

  return state;
};
