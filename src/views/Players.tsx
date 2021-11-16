import { Player } from "./types";
import { styled } from "goober";

import { seatRatios } from "../lib/card-views/layout";
import { PlayerDisplay } from "./PlayerDisplay";
import { WizardShape } from "../engine/types";

const getTranslate = (r: number) => (r === 0 ? 0 : r === 1 ? -100 : -50);
const xOffsetAmt = 10;
const getXOffset = (r: number) =>
  r === 0 ? xOffsetAmt : r === 1 ? -xOffsetAmt : 0;
const yOffsetAmt = 20;
const getYOffset = (r: number) =>
  r === 0 ? yOffsetAmt : r === 1 ? -yOffsetAmt - 4 : 0;

const vecToDir = ({ x, y }: { x: number; y: number }) => {
  if (x === 0 && y > 0) return "right";
  if (x === 1 && y > 0) return "left";
  if (y === 1 && x > 0) return "top";
  return "bottom";
};

const PlayerPositioner = styled("div")(({ xRatio, yRatio }) => ({
  position: "absolute",
  left: `${xRatio * 100}%`,
  top: `${yRatio * 100}%`,
  transform: `translate(
    calc(${getTranslate(xRatio)}% + ${getXOffset(xRatio)}px),
    calc(${getTranslate(yRatio)}% + ${getYOffset(yRatio)}px)
    )`,
}));

type PlayersProps = {
  type: WizardShape["states"]["type"];
  players: Player[];
  bids: (number | null)[];
  actuals: number[];
  trickLeader: number;
};

export const Players = ({
  type,
  players,
  bids,
  actuals,
  trickLeader,
}: PlayersProps) => {
  const positions = seatRatios[players.length - 1];

  const playerNodes = players.map(({ avatar, name, active }, idx) => {
    const dir = positions[idx][0];
    return (
      <PlayerPositioner xRatio={dir.x} yRatio={dir.y} key={idx}>
        <PlayerDisplay
          {...{
            name,
            type,
            avatar,
            active,
            bid: bids[idx],
            actual: actuals[idx],
            leader: idx === trickLeader,
            dir: vecToDir(dir),
          }}
        />
      </PlayerPositioner>
    );
  });

  return <>{playerNodes}</>;
};
