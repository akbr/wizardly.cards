import type { WizardFrame } from "./types";

import { Title } from "./Title";
import { Lobby } from "./Lobby";
import {
  CardsHand,
  CardsPlay,
  DragSurface,
} from "../lib/cardsViews/preactInterfaces";
import { TableWrapper } from "./TableWrapper";
import { TableCenter } from "./TableCenter";
import { Players } from "./Players";
import { UiButtons } from "./UiButtons";
import { PlayInfo } from "./PlayInfo";
import { ErrorReciever } from "./ErrorReceiver";
import { rotateArray, rotateIndex } from "../lib/array";

export function App(frame: WizardFrame) {
  const { state, actions, err } = frame;

  return (
    <>
      <UiButtons exit={actions.exit} scores={state ? state.scores : null} />
      <AppInner {...frame} />
      <ErrorReciever err={err} />
    </>
  );
}

function AppInner(frame: WizardFrame) {
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

  // Game modes

  const { waitFor } = actions;
  if (state.type === "deal") waitFor(2000);
  if (state.type === "bidEnd") waitFor(2000);
  if (state.type === "bid") waitFor(500);
  if (state.type === "turnEnd") waitFor(2000);

  const { isInHand, play, isValidPlay, getTableDimensions } = actions;
  const { seatIndex } = room;
  const {
    type,
    numPlayers,
    turn,
    bids,
    actuals,
    trick,
    trickLeader,
    trumpCard,
    trumpSuit,
    hands,
  } = state;

  const winningIndex =
    state.type === "trickEnd"
      ? rotateIndex(state.numPlayers, state.trickWinner, -state.trickLeader)
      : undefined;
  const hand = hands[seatIndex];

  return (
    <DragSurface {...{ isInHand, isValidPlay, play }}>
      <TableWrapper {...{ getTableDimensions }}>
        <Players
          {...{
            showBids: type === "bid" || type === "bidEnd",
            players: rotateArray(players, -seatIndex),
            bids: rotateArray(bids, -seatIndex),
            actuals: rotateArray(actuals, -seatIndex),
            trickLeader: rotateIndex(numPlayers, trickLeader, -seatIndex),
          }}
        />
        <TableCenter {...{ state, room, actions, err }} />
      </TableWrapper>
      <PlayInfo {...{ bids, turn, trumpCard, trumpSuit }} />
      <CardsPlay
        {...{
          getTableDimensions,
          trick,
          numPlayers,
          playerPerspective: seatIndex,
          startPlayer: trickLeader,
          winningIndex,
        }}
      />
      {hand.length > 0 && <CardsHand hand={hand} />}
    </DragSurface>
  );
}
