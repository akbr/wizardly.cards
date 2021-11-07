import { Player } from "./types";

import { Badge } from "./Badge";
import { seatRatios } from "../lib/cardsViews/layout";
import { css, styled, keyframes } from "goober";
import { Fragment } from "preact";

import { Tooltip } from "./Tooltip";

const vecToDir = ({ x, y }: { x: number; y: number }) => {
  if (x === 0 && y > 0) return "right";
  if (x === 1 && y > 0) return "left";
  if (y === 0 && x > 1) return "top";
  return "bottom";
};

const a = css({
  position: "absolute",
});

const getTranslate = (r: number) => (r === 0 ? 0 : r === 1 ? -100 : -50);
const insideParentEdge = (xRatio: number, yRatio: number) =>
  css({
    left: `${xRatio * 100}%`,
    top: `${yRatio * 100}%`,
    transform: `translate(
      ${getTranslate(xRatio)}%,
      ${getTranslate(yRatio)}%
    )`,
  });

const InfoPosition = styled("div")`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 14px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

type PlayersProps = {
  players: Player[];
  bids: (number | null)[];
  actuals: number[];
};

export const Players = ({ players, bids, actuals }: PlayersProps) => {
  const positions = seatRatios[players.length - 1];

  const displays = players.map((player, idx) => {
    const { x, y } = positions[idx][0];
    const { avatar, active } = player;

    const hasBid = bids[idx] !== null;
    const bidsComplete = bids.indexOf(null) === -1;

    const content =
      hasBid && !bidsComplete ? (
        <Tooltip
          style={{ animation: `${fadeIn} 1s both` }}
          dir={vecToDir({ x, y })}
        >{`Bid: ${bids[idx]}`}</Tooltip>
      ) : hasBid && bidsComplete ? (
        <InfoPosition
          style={{ top: "100%" }}
        >{`${actuals[idx]} / ${bids[idx]}`}</InfoPosition>
      ) : undefined;

    return (
      <div class={`${a} ${insideParentEdge(x, y)}`}>
        <Badge color={"blue"} avatar={avatar} active={active} />
        {content}
      </div>
    );
  });

  return <Fragment>{displays}</Fragment>;
};
