import { a, topMargins } from "./commonCss";
import { getBidsDiff, getBidsStatus } from "./derivations";
import { MiniCard } from "../lib/cardsViews/MiniCard";
import { getTuple } from "../wizard/logic";

type PlayInfoProps = {
  turn: number;
  trumpCard: string | null;
  trumpSuit: string | null;
  bids: (number | null)[];
};

export const PlayInfo = ({
  turn,
  bids,
  trumpCard,
  trumpSuit,
}: PlayInfoProps) => {
  const bidsComplete = getBidsStatus(bids);
  const bidsDiff = getBidsDiff(bids, turn);

  const displayCard =
    trumpCard !== null
      ? (() => {
          let [value, suit] = getTuple(trumpCard);
          let showValue =
            suit === "w" ? (trumpSuit !== null ? trumpSuit : undefined) : value;
          return <MiniCard suit={suit} value={showValue} />;
        })()
      : null;

  return (
    <div class={`${a} ${topMargins}`} style={{ right: 0, textAlign: "right" }}>
      <div>Round {turn}</div>
      {displayCard}
      {bidsComplete &&
        (bidsDiff === 0 ? (
          <div>Even bids</div>
        ) : bidsDiff > 1 ? (
          <div>Overbid by {bidsDiff}</div>
        ) : (
          <div>Underbid by {Math.abs(bidsDiff)}</div>
        ))}
    </div>
  );
};
