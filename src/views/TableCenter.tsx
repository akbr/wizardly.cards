import { ViewProps } from "../wizard/types";

import { DeadCenterWrapper } from "./common";
import { Dealing } from "./Dealing";
import { BidInput } from "./BidInput";
import { TrumpInput } from "./TrumpInput";

export function TableCenter({ state, actions, room }: ViewProps) {
  let active =
    "activePlayer" in state && room && state.activePlayer === room.seatIndex;

  return (
    <DeadCenterWrapper>
      {state.type === "deal" && <Dealing turn={state.turn} />}
      {state.type === "bid" && (
        <BidInput
          {...{
            numPlayers: state.numPlayers,
            active,
            bids: state.bids,
            turn: state.turn,
            submit: actions.bid
          }}
        />
      )}
      {state.type === "selectTrump" && (
        <TrumpInput
          {...{
            active,
            selectTrump: actions.selectTrump
          }}
        />
      )}
    </DeadCenterWrapper>
  );
}
