import { WizardGameFrame } from "./types";

import { DeadCenterWrapper } from "./common";
import { Dealing } from "./Dealing";
import { BidInput } from "./BidInput";
import { TrumpInput } from "./TrumpInput";
import { getBidsDiff } from "./derivations";

type BidEndProps = {
  bids: (number | null)[];
  turn: number;
};

export function BidEnd({ bids, turn }: BidEndProps) {
  let diff = getBidsDiff(bids, turn);

  return diff === 0 ? (
    <h2>⚖️ Even bids!</h2>
  ) : diff > 0 ? (
    <h2>📈 Over by {Math.abs(diff)}!</h2>
  ) : (
    <h2>📉 Under by {Math.abs(diff)}!</h2>
  );
}

export function TableCenter({ state, room, actions }: WizardGameFrame) {
  const active = room.seatIndex === state.activePlayer;

  return (
    <DeadCenterWrapper>
      {state.type === "deal" ? (
        <Dealing turn={state.turn} />
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
      ) : state.type === "bidEnd" ? (
        <BidEnd bids={state.bids} turn={state.turn} />
      ) : state.type === "selectTrump" ? (
        <TrumpInput
          {...{
            active,
            selectTrump: actions.selectTrump,
          }}
        />
      ) : state.type === "turnEnd" ? (
        <h2>Turn is over!</h2>
      ) : null}
    </DeadCenterWrapper>
  );
}
