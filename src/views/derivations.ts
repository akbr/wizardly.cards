import { WizardShape } from "../wizard/types";
import { StoreShape } from "../lib/appInterfaces/types";
import { rotateArray } from "../lib/array";

type Store = StoreShape<WizardShape>;

export const avatars = ["🐵", "🐸", "🦊", "🐷", "🐭", "🐼"];

export function derivePlayers({ state, room }: Store) {
  if (!room) return [];

  let activePlayer = "activePlayer" in state ? state.activePlayer : -1;
  let players = room.seats.map((_, idx) => ({
    avatar: avatars[idx],
    name: "",
    active: idx === activePlayer,
  }));

  return rotateArray(players, -room.seatIndex);
}

export function deriveBids({ state, room }: Store) {
  return "bids" in state && room
    ? rotateArray(state.bids, -room.seatIndex)
    : undefined;
}

export function deriveActuals({ state, room }: Store) {
  return "actuals" in state && room
    ? rotateArray(state.actuals, -room.seatIndex)
    : [];
}

export function deriveHand({ state, room }: Store) {
  return "hands" in state && room ? state.hands[room.seatIndex] : [];
}
