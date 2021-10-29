import { ViewProps } from "../wizard/types";
import { rotateArray } from "../lib/array";

export const avatars = ["🐵", "🐸", "🦊", "🐷", "🐭", "🐼"];

export function derivePlayers({ state, room }: ViewProps) {
  if (!room) return [];

  let activePlayer = "activePlayer" in state ? state.activePlayer : -1;

  return rotateArray(
    room.seats.map((_, idx) => ({
      avatar: avatars[idx],
      name: "",
      active: idx === activePlayer,
    })),
    -room.seatIndex
  );
}

export function deriveBids({ state, room }: ViewProps) {
  return "bids" in state && room
    ? rotateArray(state.bids, -room.seatIndex)
    : undefined;
}

export function deriveActuals({ state, room }: ViewProps) {
  return "actuals" in state && room
    ? rotateArray(state.actuals, -room.seatIndex)
    : [];
}
