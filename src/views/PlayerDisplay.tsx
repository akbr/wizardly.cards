import { styled } from "goober";

import { Appear } from "./common";
import { Badge } from "./Badge";
import { Tooltip } from "./Tooltip";

const vecToDir = ({ x, y }: { x: number; y: number }) => {
  if (x === 0 && y > 0) return "right";
  if (x === 1 && y > 0) return "left";
  if (y === 1 && x > 0) return "top";
  return "bottom";
};

const InfoPosition = styled("div")`
  position: absolute;
  width: 100%;
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

type PlayerProps = {
  avatar: string;
  bid: number | null;
  showBidBubble: boolean;
  actual: number;
  isLeader: boolean;
  active: boolean;
  dir: { x: number; y: number };
};

export const PlayerDisplay = ({
  avatar,
  bid,
  showBidBubble,
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
          ) : (
            <InfoPosition style={{ top: "100%" }}>
              {`${actual} / ${bid}`}
            </InfoPosition>
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
