import { WizardFrame } from "./types";

import { css } from "goober";
import { Fragment } from "preact";
import { useState, useCallback } from "preact/hooks";
import { a, topMargins } from "./commonCss";
import { EmojiButton, Button } from "./common";

import { DialogOf } from "./Dialog";
import { ScoreTable } from "./ScoreTable";

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
      <div> Nothing here yet... wanna quit? </div>
      <Button onClick={exit}>Exit</Button>
    </div>
  );
};

export const UiButtons = ({ state, actions, room }: WizardFrame) => {
  const [optionsVisible, setOptions] = useState(false);
  const [scoresVisible, setScores] = useState(false);

  const openOptions = useCallback(() => setOptions(true), []);
  const closeOptions = useCallback(() => setOptions(false), []);

  const openScores = useCallback(() => setScores(true), []);
  const closeScores = useCallback(() => setScores(false), []);
  const doExit = useCallback(() => {
    closeOptions();
    actions.exit();
  }, []);

  return (
    <Fragment>
      <div class={`${a} ${flex} ${topMargins}`} style={{ zIndex: "500" }}>
        <OptionsButton open={openOptions} />
        {state && <ScoresButton open={openScores} />}
      </div>
      <DialogOf close={closeOptions} visible={optionsVisible}>
        <Options exit={doExit} />
      </DialogOf>
      <DialogOf close={closeScores} visible={scoresVisible}>
        {state && room && scoresVisible && (
          <div style={{ display: "grid", placeContent: "center" }}>
            <ScoreTable
              scores={state.scores}
              avatars={room.seats}
              playerIndex={room.seatIndex}
            />
          </div>
        )}
      </DialogOf>
    </Fragment>
  );
};
