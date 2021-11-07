import type { WizardFrame } from "./types";

import { Title } from "./Title";
import { Lobby } from "./Lobby";
import { DragSurface } from "../lib/cardsViews/preactInterfaces";
import { TableWrapper } from "./TableWrapper";
import { TableCenter } from "./TableCenter";
import { Cards } from "./Cards";
import { Players } from "./Players";
import { UiButtons } from "./UiButtons";
import { PlayInfo } from "./PlayInfo";
import { ErrorReciever } from "./ErrorReceiver";

export function App(frame: WizardFrame) {
  const { state, actions, err } = frame;

  return (
    <>
      <UiButtons exit={actions.exit} scores={state ? state.scores : null} />
      <AppStart {...frame} />
      <ErrorReciever err={err} />
    </>
  );
}

function AppStart(frame: WizardFrame) {
  let { state, room, err, actions } = frame;

  if (room === null) {
    return <Title join={actions.join} />;
  }

  const activePlayer = state ? state.activePlayer : null;
  const players = room.seats.map((avatar, idx) => ({
    avatar,
    active: idx === activePlayer,
  }));

  if (state === null) {
    return (
      <Lobby
        players={players}
        isAdmin={room.seatIndex === 0}
        roomId={room.id}
        start={actions.start}
        addBot={actions.addBot}
      />
    );
  }

  const { waitFor } = actions;
  if (state.type === "deal") waitFor(2000);
  if (state.type === "bidEnd") waitFor(2000);
  if (state.type === "bid") waitFor(500);
  if (state.type === "turnEnd") waitFor(1000);

  let { isInHand, play, isValidPlay, getTableDimensions } = actions;

  return (
    <DragSurface isInHand={isInHand} play={play} isValidPlay={isValidPlay}>
      <TableWrapper getTableDimensions={getTableDimensions}>
        <Players players={players} bids={state.bids} actuals={state.actuals} />
        <TableCenter {...{ state, room, actions, err }} />
      </TableWrapper>
      <PlayInfo
        turn={state.turn}
        trumpCard={state.trumpCard}
        trumpSuit={state.trumpSuit}
      />
      <Cards {...{ state, room, actions, err }} />
    </DragSurface>
  );
}
