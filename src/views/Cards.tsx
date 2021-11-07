import { WizardGameFrame } from "./types";

import { Hand, Play } from "../lib/cardsViews/preactInterfaces";
import { rotateIndex } from "../lib/array";

export function Cards({ state, room, actions }: WizardGameFrame) {
  return (
    <>
      {"trick" in state && (
        <Play
          {...{
            getTableDimensions: actions.getTableDimensions,
            trick: state.trick,
            numPlayers: state.numPlayers,
            playerPerspective: room.seatIndex,
            startPlayer: state.trickLeader,
            winningIndex:
              state.type === "trickEnd"
                ? rotateIndex(
                    state.numPlayers,
                    state.trickWinner,
                    -state.trickLeader
                  )
                : undefined,
          }}
        />
      )}
      {state.hands[room.seatIndex].length > 0 && (
        <Hand hand={state.hands[room.seatIndex]} />
      )}
    </>
  );
}
