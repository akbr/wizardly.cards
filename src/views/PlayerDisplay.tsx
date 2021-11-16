import { WizardShape } from "../engine/types";

import { styled, keyframes } from "goober";

import { Badge } from "../lib/components/Badge";
import { getScore } from "../derivations";

import { Twemoji } from "../lib/components/Twemoji";

const BidInfo = styled("div")`
  text-align: center;
  font-size: 14px;
`;
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
  name: string;
  type: WizardShape["states"]["type"];
  bid: number | null;
  actual: number;
  leader: boolean;
  active: boolean;
  dir: "top" | "bottom" | "left" | "right";
};

export const PlayerDisplay = ({
  avatar,
  name,
  type,
  bid,
  actual,
  leader,
  active,
  dir,
}: PlayerProps) => {
  const info =
    type === "play" || type === "trickEnd" || type === "turnEnd" ? (
      <BidInfo>{`${actual} / ${bid}`}</BidInfo>
    ) : type === "showScores" ? (
      <ScorePop score={getScore(bid!, actual)} />
    ) : null;

  const say =
    (type === "bid" || type === "bidEnd") && bid !== null
      ? { dir, content: `Bid: ${bid}` }
      : null;

  return (
    <Badge
      avatar={avatar}
      name={name}
      info={info}
      tl={leader ? <Twemoji char={"1️⃣"} size={18} /> : null}
      tr={active ? <Twemoji char={"⏳"} size={18} /> : null}
      say={say}
    />
  );
};
