import { styled } from "goober";
import { a, topMargins } from "./commonCss";
import { colors } from "../lib/cardsViews/createCard";

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
  trumpCard: string | false;
  trumpSuit?: string;
};

export const PlayInfo = ({ turn, trumpCard, trumpSuit }: PlayInfoProps) => {
  let [value, suit] = trumpCard ? trumpCard.split("|") : [];

  value = suit === "w" ? "w" : suit === "j" ? "" : value;

  return (
    <div class={`${a} ${topMargins}`} style={{ right: 0, textAlign: "right" }}>
      <div>Turn: {turn}</div>
      {trumpSuit && (
        <div>
          Trump:{" "}
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
                      : colors[trumpSuit]
                }}
              >
                <use href={`#card-${value}`}></use>
              </Icon>
            )}
          </MiniCard>
        </div>
      )}
    </div>
  );
};
