import { ViewProps } from "../wizard/types";
import { derivePlayers, deriveBids, deriveActuals } from "./derivations";

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

export function App(props: ViewProps) {
  return (
    <>
      <UiButtons {...props} />
      <AppInner {...props} />
      <ErrorReciever err={props.err} />
    </>
  );
}

function AppInner(props: ViewProps) {
  let { state, room, actions } = props;

  if (state.type === "title" || !room) {
    return <Title join={actions.join} />;
  }

  if (state.type === "end") {
    return null;
  }

  if (state.type === "lobby") {
    return (
      <Lobby
        roomCode={room.id}
        isAdmin={room.seatIndex === 0}
        players={derivePlayers(props)}
        start={actions.start}
        addBot={actions.addBot}
      />
    );
  }

  let { waitFor } = actions;
  if (state.type === "deal") waitFor(2000);
  if (state.type === "bid") waitFor(500);
  if (state.type === "turnOver") waitFor(1000);

  let { isInHand, play, isValidPlay, getTableDimensions } = actions;

  return (
    <DragSurface isInHand={isInHand} play={play} isValidPlay={isValidPlay}>
      <TableWrapper getTableDimensions={getTableDimensions}>
        <Players
          players={derivePlayers(props)}
          bids={deriveBids(props)}
          actuals={deriveActuals(props)}
        />
        <TableCenter {...props} />
      </TableWrapper>
      {"turn" in state && (
        <PlayInfo
          turn={state.turn}
          trumpCard={"trumpCard" in state ? state.trumpCard : false}
          trumpSuit={"trumpSuit" in state ? state.trumpSuit : undefined}
        />
      )}
      <Cards {...props} />
    </DragSurface>
  );
}
