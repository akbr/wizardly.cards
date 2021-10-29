import { Badge } from "./Badge";
import { seatRatios } from "../lib/cardsViews/layout";
import { css, styled, keyframes } from "goober";
import { Fragment } from "preact";

const a = css({
  position: "absolute"
});

const getTranslate = (r: number) => (r === 0 ? 0 : r === 1 ? -100 : -50);
const insideParentEdge = (xRatio: number, yRatio: number) =>
  css({
    left: `${xRatio * 100}%`,
    top: `${yRatio * 100}%`,
    transform: `translate(
      ${getTranslate(xRatio)}%,
      ${getTranslate(yRatio)}%
    )`
  });

const InfoPosition = styled("div")`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 14px;
`;

export type PlayersProps = {
  avatar: string;
  name: string;
  active?: boolean;
}[];

export const Players = ({
  players,
  bids,
  actuals
}: {
  players: PlayersProps;
  bids: (number | boolean)[] | undefined;
  actuals?: number[];
}) => {
  let positions = seatRatios[players.length - 1];

  let displays = players.map((player, idx) => {
    let { x, y } = positions[idx][0];
    let { avatar, name, active } = player;
    let hasBid = bids && bids[idx] !== false;
    let bidsComplete = bids && bids.indexOf(false) === -1;

    let content =
      hasBid && !bidsComplete
        ? `Bid: ${bids[idx]}`
        : hasBid && bidsComplete
        ? `${actuals[idx]} / ${bids[idx]}`
        : undefined;

    return (
      <div class={`${a} ${insideParentEdge(x, y)}`}>
        <Badge color={"blue"} avatar={avatar} name={name} active={active} />
        <InfoPosition style={{ top: "100%" }}>{content}</InfoPosition>
      </div>
    );
  });

  return <Fragment>{displays}</Fragment>;
};
