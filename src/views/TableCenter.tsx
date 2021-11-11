import { styled } from "goober";
import { WizardGameFrame } from "./types";

import { Appear, DeadCenterWrapper } from "./common";
import { BidInput } from "./BidInput";
import { TrumpInput } from "./TrumpInput";

const LimitWidth = styled("div")`
  text-align: center;
  max-width: 135px;
`;

export const Dealing = ({ turn }: { turn: number }) => <h2>Round {turn}</h2>;

export function TableCenter({ state, room, actions }: WizardGameFrame) {
  const active = room.seatIndex === state.activePlayer;

  return (
    <DeadCenterWrapper>
      <LimitWidth>
        {state.type === "deal" ? (
          <Dealing turn={state.turn} />
        ) : state.type === "bid" ? (
          <Appear>
            <BidInput
              {...{
                active,
                numPlayers: state.numPlayers,
                bids: state.bids,
                turn: state.turn,
                submit: actions.bid,
              }}
            />
          </Appear>
        ) : state.type === "bidEnd" ? null : state.type === "selectTrump" ? (
          <TrumpInput
            {...{
              active,
              selectTrump: actions.selectTrump,
            }}
          />
        ) : state.type === "turnEnd" ? (
          <div>
            <h3>Round Over</h3>
          </div>
        ) : null}
      </LimitWidth>
    </DeadCenterWrapper>
  );
}
