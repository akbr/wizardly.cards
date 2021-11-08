import { styled } from "goober";
import { a, topMargins } from "./commonCss";
import { colors } from "../lib/cardsViews/createCard";
import { getBidsDiff, getBidsStatus } from "./derivations";

let MiniCard = styled("div")`
  display: inline-block;
  background-color: white;
  padding: 4px;
  border-radius: 2px;
  margin: 6px 0px 6px 4px;
`;

let Icon = styled("svg")`
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
`;

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

  let [value, suit] = trumpCard ? trumpCard.split("|") : [];

  value = suit === "w" ? "w" : suit === "j" ? "" : value;

  return (
    <div class={`${a} ${topMargins}`} style={{ right: 0, textAlign: "right" }}>
      <div>Round {turn}</div>
      {trumpSuit && (
        <MiniCard>
          <Icon style={{ fill: colors[trumpSuit] }}>
            <use href={`#card-${trumpSuit}`}></use>
          </Icon>
          {value !== "" && (
            <Icon
              style={{
                fill:
                  value === "w"
                    ? colors.w
                    : value === "j"
                    ? colors.j
                    : colors[trumpSuit],
              }}
            >
              <use href={`#card-${value}`}></use>
            </Icon>
          )}
        </MiniCard>
      )}
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
