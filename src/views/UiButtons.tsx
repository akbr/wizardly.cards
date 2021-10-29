import { css } from "goober";
import { Fragment } from "preact";
import { useState, useCallback } from "preact/hooks";
import { a, topMargins } from "./commonCss";
import { EmojiButton, Button } from "./common";

import { DialogOf } from "./Dialog";

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
};

export const UiButtons = ({ scores, exit }: TableButtonProps) => {
  const [optionsVisible, setOptions] = useState(false);
  const [scoresVisible, setScores] = useState(false);

  const openOptions = useCallback(() => setOptions(true), []);
  const closeOptions = useCallback(() => setOptions(false), []);

  const openScores = useCallback(() => setScores(true), []);
  const closeScores = useCallback(() => setScores(false), []);

  return (
    <Fragment>
      <div class={`${a} ${flex} ${topMargins}`}>
        <OptionsButton open={openOptions} />
        {scores && <ScoresButton open={openScores} />}
      </div>
      <DialogOf close={closeOptions} visible={optionsVisible}>
        <Options exit={exit} />
      </DialogOf>
      {scores && (
        <DialogOf close={closeScores} visible={scoresVisible}>
          <div>{scores}</div>
        </DialogOf>
      )}
    </Fragment>
  );
};
