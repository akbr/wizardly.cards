import { Player } from "./types";
import { styled } from "goober";

import { seatRatios } from "../lib/card-views/layout";
import { PlayerDisplay } from "./PlayerDisplay";

const getTranslate = (r: number) => (r === 0 ? 0 : r === 1 ? -100 : -50);

const PlayerPositioner = styled("div")(({ xRatio, yRatio }) => ({
  position: "absolute",
  left: `${xRatio * 100}%`,
  top: `${yRatio * 100}%`,
  transform: `translate(
    ${getTranslate(xRatio)}%,
    ${getTranslate(yRatio)}%
  )`,
}));

type PlayersProps = {
  showBids: boolean;
  showScores: boolean;
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
  showScores,
  trickLeader,
}: PlayersProps) => {
  const positions = seatRatios[players.length - 1];

  const playerNodes = players.map(({ avatar, active }, idx) => {
    const dir = positions[idx][0];
    return (
      <PlayerPositioner xRatio={dir.x} yRatio={dir.y} key={idx}>
        <PlayerDisplay
          {...{
            avatar,
            active,
            bid: bids[idx],
            actual: actuals[idx],
            showBidBubble: showBids,
            showScores,
            isLeader: idx === trickLeader,
            dir,
          }}
        />
      </PlayerPositioner>
    );
  });

  return <>{playerNodes}</>;
};
