import { useState } from "preact/hooks";
import { styled } from "goober";
import { Button } from "./common";
import { isValidBid } from "../wizard/logic";

const Outer = styled("div")`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;
`;

const Console = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const BidDisplay = styled("div")`
  display: inline-block;
  vertical-align: center;
  font-size: 2em;
`;

type BidInputProps = {
  canadian?: boolean;
  active: boolean;
  bids: (number | false)[];
  turn: number;
  numPlayers: number;
  submit: (bid: number) => void;
};

export function BidInput({
  canadian = false,
  active,
  bids,
  numPlayers,
  turn,
  submit
}: BidInputProps) {
  const [bid, setBid] = useState(0);

  if (!active) {
    return <h2>Waiting for bids...</h2>;
  }

  const bidIsvalid = isValidBid(bid, {
    canadian,
    numPlayers,
    turn,
    bids
  });

  return (
    <Outer>
      <h2>Enter your bid:</h2>
      <Console>
        <Button onClick={() => setBid(bid + 1)} disabled={bid === turn}>
          +
        </Button>
        <BidDisplay style={{ color: bidIsvalid ? "" : "red" }}>
          {bid}
        </BidDisplay>
        <Button onClick={() => setBid(bid - 1)} disabled={bid === 0}>
          -
        </Button>
      </Console>
      <Button onClick={() => submit(bid)} disabled={!isValidBid}>
        Submit
      </Button>
    </Outer>
  );
}
