import { Player } from "./types";

import { Badge } from "./Badge";
import { seatRatios } from "../lib/cardsViews/layout";
import { css, styled, keyframes } from "goober";

import { Tooltip } from "./Tooltip";

const vecToDir = ({ x, y }: { x: number; y: number }) => {
  if (x === 0 && y > 0) return "right";
  if (x === 1 && y > 0) return "left";
  if (y === 1 && x > 0) return "top";
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
  showBids: boolean;
  players: Player[];
  bids: (number | null)[];
  actuals: number[];
  trickLeader: number;
};

export const Players = ({
  players,
  bids,
  actuals,
  showBids,
  trickLeader,
}: PlayersProps) => {
  const positions = seatRatios[players.length - 1];

  const playerNodes = players.map(({ avatar, active }, idx) => {
    const { x, y } = positions[idx][0];
    return (
      <div class={`${a} ${insideParentEdge(x, y)}`} key={idx}>
        <Badge avatar={avatar} />
        {bids[idx] !== null ? (
          showBids ? (
            <Tooltip
              style={{ animation: `${fadeIn} 500ms both` }}
              dir={vecToDir({ x, y })}
            >
              {`Bid: ${bids[idx]}`}
            </Tooltip>
          ) : (
            <InfoPosition style={{ top: "100%" }}>
              {`${actuals[idx]} / ${bids[idx]}`}
            </InfoPosition>
          )
        ) : null}
        {trickLeader === idx && (
          <div
            style={{
              position: "absolute",
              bottom: "2px",
              left: "2px",
              fontSize: "16px",
            }}
          >
            1️⃣
          </div>
        )}
        {active && (
          <div
            style={{
              position: "absolute",
              bottom: "2px",
              right: "6px",
              fontSize: "16px",
            }}
          >
            ⏳
          </div>
        )}
      </div>
    );
  });

  return <>{playerNodes}</>;
};
