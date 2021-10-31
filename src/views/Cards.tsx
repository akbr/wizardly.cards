import { ViewProps } from "../wizard/types";

import { Hand, Play } from "../lib/cardsViews/preactInterfaces";
import { rotateIndex } from "../lib/array";

export function Cards({ state, actions, room }: ViewProps) {
  if (!room) return null;

  return (
    <>
      {"trick" in state && (
        <Play
          {...{
            getTableDimensions: actions.getTableDimensions,
            trick: state.trick.cards,
            numPlayers: state.numPlayers,
            playerPerspective: room.seatIndex,
            startPlayer: state.trick.leader,
            winningIndex:
              state.type === "trickWin"
                ? rotateIndex(
                    state.numPlayers,
                    state.winner,
                    -state.trick.leader
                  )
                : undefined,
          }}
        />
      )}
      {"hands" in state && <Hand hand={state.hands[room.seatIndex]} />}
    </>
  );
}
