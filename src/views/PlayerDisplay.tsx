import { styled, keyframes } from "goober";

import { Appear } from "./common";
import { Badge } from "./Badge";
import { Tooltip } from "./Tooltip";
import { getScore } from "./derivations";

const vecToDir = ({ x, y }: { x: number; y: number }) => {
  if (x === 0 && y > 0) return "right";
  if (x === 1 && y > 0) return "left";
  if (y === 1 && x > 0) return "top";
  return "bottom";
};

const InfoPosition = styled("div")`
  position: absolute;
  width: 100%;
  top: 100%;
  text-align: center;
  font-size: 14px;
`;

const EmojiNum = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1.5px solid #000;
  background-color: #1e90ff;
  font-size: 11px;
`;

export const EmojiOne = () => <EmojiNum>1</EmojiNum>;

export const scoreAppear = keyframes`
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(2) rotate(32deg);
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    transform: translateY(-15px);
    opacity: 0;
  }
`;

const Score = styled("div")`
  text-shadow: 0 0 7px var(--glow-color), 0 0 10px var(--glow-color),
    0 0 21px var(--glow-color);
  animation: ${scoreAppear} 3.5s both;
`;

const ScorePop = ({ score }: { score: number }) => {
  let isPositive = score > 0;
  let strScore = isPositive ? `+${score}` : `${score}`;
  let color = isPositive ? "blue" : "red";
  return <Score style={{ "--glow-color": color }}>{strScore}</Score>;
};

type PlayerProps = {
  avatar: string;
  bid: number | null;
  showBidBubble: boolean;
  showScores: boolean;
  actual: number;
  isLeader: boolean;
  active: boolean;
  dir: { x: number; y: number };
};

export const PlayerDisplay = ({
  avatar,
  bid,
  showBidBubble,
  showScores,
  actual,
  isLeader,
  active,
  dir,
}: PlayerProps) => {
  return (
    <>
      <Badge avatar={avatar} />
      {bid !== null ? (
        <Appear>
          {showBidBubble ? (
            <Tooltip dir={vecToDir(dir)}>{`Bid: ${bid}`}</Tooltip>
          ) : showScores ? (
            <InfoPosition>
              <ScorePop score={getScore(bid, actual)} />
            </InfoPosition>
          ) : (
            <InfoPosition>{`${actual} / ${bid}`}</InfoPosition>
          )}
        </Appear>
      ) : null}
      {isLeader && (
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            left: "5px",
            fontSize: "16px",
          }}
        >
          <EmojiOne />
        </div>
      )}
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            right: "5px",
            fontSize: "16px",
          }}
        >
          ⏳
        </div>
      )}
    </>
  );
};
