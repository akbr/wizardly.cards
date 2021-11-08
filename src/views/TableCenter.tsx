import { styled } from "goober";
import { WizardGameFrame } from "./types";

import { DeadCenterWrapper, Throb } from "./common";
import { Dealing } from "./Dealing";
import { BidInput } from "./BidInput";
import { TrumpInput } from "./TrumpInput";
import { getBidsDiff } from "./derivations";

const LimitWidth = styled("div")`
  max-width: 135px;
  text-align: center;
`;

type BidEndProps = {
  bids: (number | null)[];
  turn: number;
};

export function BidEnd({ bids, turn }: BidEndProps) {
  let diff = getBidsDiff(bids, turn);

  return diff === 0 ? (
    <div>⚖️ Even bids!</div>
  ) : diff > 0 ? (
    <div>📉 Underbid by {Math.abs(diff)}!</div>
  ) : (
    <div>📈 Overbid by {Math.abs(diff)}!</div>
  );
}

export function TableCenter({ state, room, actions }: WizardGameFrame) {
  const active = room.seatIndex === state.activePlayer;

  return (
    <DeadCenterWrapper>
      <LimitWidth>
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
          <div>
            <h3>Round End</h3>
            <Throb>Tallying scores...</Throb>
          </div>
        ) : null}
      </LimitWidth>
    </DeadCenterWrapper>
  );
}
