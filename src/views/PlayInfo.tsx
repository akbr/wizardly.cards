import { styled } from "goober";
import { getBidsDiff, getBidsStatus } from "../derivations";
import { Appear } from "../lib/components/common";
import { MiniCard } from "../lib/card-views/MiniCard";
import { getTuple } from "../engine/logic";

const InfoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  margin: 6px;
  right: 0;
  text-align: right;
`;

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
    <InfoContainer>
      <div>Round: {turn}</div>
      {displayCard && <Appear>{displayCard}</Appear>}
      {bidsComplete && (
        <Appear>
          {bidsDiff === 0 ? (
            <div>Bids: Even</div>
          ) : bidsDiff > 1 ? (
            <div>Bids: +{bidsDiff}</div>
          ) : (
            <div>Bids: -{Math.abs(bidsDiff)}</div>
          )}
        </Appear>
      )}
    </InfoContainer>
  );
};
