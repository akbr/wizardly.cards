import { css } from "goober";
import { a, topMargins } from "./commonCss";
import { EmojiButton, Button } from "./common";

import { ScoreTable } from "./ScoreTable";
import { ViewFrame } from "./App";
import { useCallback } from "preact/hooks";

let flex = css`
  display: flex;
  gap: 0.2em;
`;

const TopButton = ({
  open,
  emoji,
  label,
}: {
  open: () => void;
  emoji: string;
  label: string;
}) => {
  return (
    <EmojiButton onClick={open}>
      <span role="img" aria-label={label}>
        {emoji}
      </span>
    </EmojiButton>
  );
};

export const UiButtons = ({ state, actions, room, dialog }: ViewFrame) => {
  const openOptions = () =>
    dialog.set(
      <Button
        onClick={() => {
          actions.exit();
          dialog.close();
        }}
      >
        Exit
      </Button>
    );
  const openScores = () =>
    dialog.set(
      state && room && (
        <div style={{ display: "grid", placeContent: "center" }}>
          <ScoreTable
            scores={state.scores}
            avatars={room.seats}
            playerIndex={room.seatIndex}
          />
        </div>
      )
    );

  return (
    <div class={`${a} ${flex} ${topMargins}`} style={{ zIndex: "500" }}>
      <TopButton emoji={"⚙️"} label={"Settings"} open={openOptions} />
      {state && <TopButton emoji={"🗒️"} label={"Scorepad"} open={openScores} />}
    </div>
  );
};
