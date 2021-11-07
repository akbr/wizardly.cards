import { WizardGameFrame } from "./types";

import { DeadCenterWrapper } from "./common";
import { Dealing } from "./Dealing";
import { BidInput } from "./BidInput";
import { TrumpInput } from "./TrumpInput";

export function TableCenter({ state, room, actions }: WizardGameFrame) {
  const active = room.seatIndex === state.activePlayer;

  return (
    <DeadCenterWrapper>
      {state.type === "deal" ? (
        <Dealing turn={state.turn} />
      ) : state.type === "bidEnd" ? (
        <div>The bids are in!</div>
      ) : state.type === "bid" ? (
        <BidInput
          {...{
            active,
            numPlayers: state.numPlayers,
            bids: state.bids,
            turn: state.turn,
            submit: actions.bid,
          }}
        />
      ) : state.type === "selectTrump" ? (
        <TrumpInput
          {...{
            active,
            selectTrump: actions.selectTrump,
          }}
        />
      ) : null}
    </DeadCenterWrapper>
  );
}
