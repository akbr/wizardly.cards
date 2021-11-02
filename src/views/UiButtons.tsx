import { css } from "goober";
import { Fragment } from "preact";
import { useState, useCallback } from "preact/hooks";
import { a, topMargins } from "./commonCss";
import { EmojiButton, Button } from "./common";

import { ViewProps } from "../wizard/types";
import { DialogOf } from "./Dialog";
import { ScoreTable } from "./ScoreTable";
import { derivePlayers } from "./derivations";

let flex = css`
  display: flex;
  gap: 0.2em;
`;

const OptionsButton = ({ open }: { open: () => void }) => {
  return (
    <EmojiButton onClick={open}>
      <span role="img" aria-label="Settings">
        ⚙️
      </span>
    </EmojiButton>
  );
};

const ScoresButton = ({ open }: { open: () => void }) => {
  return (
    <EmojiButton onClick={open}>
      <span role="img" aria-label="Score pad">
        🗒️
      </span>
    </EmojiButton>
  );
};

const Options = ({ exit }: { exit: () => void }) => {
  return (
    <div>
      <div> OPTIONS! </div>
      <Button onClick={exit}>Exit</Button>
    </div>
  );
};

type TableButtonProps = {
  exit: () => void;
  scores?: number[][];
  avatars?: string[];
  playerIndex?: number;
};

export const UiButtons = (props: ViewProps) => {
  const [optionsVisible, setOptions] = useState(false);
  const [scoresVisible, setScores] = useState(false);

  const openOptions = useCallback(() => setOptions(true), []);
  const closeOptions = useCallback(() => setOptions(false), []);

  const openScores = useCallback(() => setScores(true), []);
  const closeScores = useCallback(() => setScores(false), []);
  const exit = useCallback(() => {
    closeOptions();
    props.actions.exit();
  }, []);

  let { state, room, actions } = props;
  let scores = "scores" in state ? state.scores : false;
  let players = derivePlayers(props);
  let playerIndex = room ? room.seatIndex : -1;

  return (
    <Fragment>
      <div class={`${a} ${flex} ${topMargins}`} style={{ zIndex: "500" }}>
        <OptionsButton open={openOptions} />
        {scores && <ScoresButton open={openScores} />}
      </div>
      <DialogOf close={closeOptions} visible={optionsVisible}>
        <Options exit={exit} />
      </DialogOf>
      {scores && (
        <DialogOf close={closeScores} visible={scoresVisible}>
          {scoresVisible && (
            <div style={{ display: "grid", placeContent: "center" }}>
              <ScoreTable
                scores={scores}
                avatars={players.map((player) => player.avatar)}
                playerIndex={playerIndex}
              />
            </div>
          )}
        </DialogOf>
      )}
    </Fragment>
  );
};
