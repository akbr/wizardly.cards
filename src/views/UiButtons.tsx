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
      <div> OPTIONS! </div>
      <Button onClick={exit}>Exit</Button>
    </div>
  );
};

type UiButtonsProps = {
  exit: () => void;
  scores: number[][] | null;
};

export const UiButtons = ({ exit, scores }: UiButtonsProps) => {
  const [optionsVisible, setOptions] = useState(false);
  const [scoresVisible, setScores] = useState(false);

  const openOptions = useCallback(() => setOptions(true), []);
  const closeOptions = useCallback(() => setOptions(false), []);

  const openScores = useCallback(() => setScores(true), []);
  const closeScores = useCallback(() => setScores(false), []);
  const doExit = useCallback(() => {
    closeOptions();
    exit();
  }, []);

  return (
    <Fragment>
      <div class={`${a} ${flex} ${topMargins}`} style={{ zIndex: "500" }}>
        <OptionsButton open={openOptions} />
        {scores && <ScoresButton open={openScores} />}
      </div>
      <DialogOf close={closeOptions} visible={optionsVisible}>
        <Options exit={doExit} />
      </DialogOf>
    </Fragment>
  );
};

/**
 *       <DialogOf close={closeScores} visible={scoresVisible}>
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
 */
