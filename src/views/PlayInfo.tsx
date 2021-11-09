import { a, topMargins } from "./commonCss";
import { getBidsDiff, getBidsStatus } from "./derivations";
import { MiniCard } from "../lib/cardsViews/MiniCard";
import { getTuple } from "../wizard/logic";
import { Appear } from "./common";

const getDisplayCard = (trumpCard: string | null, trumpSuit: string | null) => {
  if (trumpCard === null) return null;
  let [value, suit] = getTuple(trumpCard);
  return suit === "w" ? (
    <MiniCard suit={suit} value={trumpSuit !== null ? trumpSuit : undefined} />
  ) : suit === "j" ? (
    <MiniCard suit={suit} />
  ) : (
    <MiniCard suit={suit} value={value} />
  );
};

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

  const displayCard = getDisplayCard(trumpCard, trumpSuit);

  return (
    <div class={`${a} ${topMargins}`} style={{ right: 0, textAlign: "right" }}>
      <div>Round {turn}</div>
      {displayCard}
      {bidsComplete && (
        <Appear>
          {bidsDiff === 0 ? (
            <div>Bids: ⚖️</div>
          ) : bidsDiff > 1 ? (
            <div>Bids: +{bidsDiff}</div>
          ) : (
            <div>Bids: -{Math.abs(bidsDiff)}</div>
          )}
        </Appear>
      )}
    </div>
  );
};
