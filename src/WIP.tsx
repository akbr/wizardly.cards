//@ts-nocheck
import { setup, styled, css, keyframes } from "goober";
import { h, render } from "preact";
import { useRef, Ref, useState, useLayoutEffect } from "preact/hooks";
import { rotateArray } from "./lib/array";
import { DeadCenterWrapper } from "./views/common";
import { TrumpInput } from "./views/TrumpInput";
import { ScoreTable } from "./views/ScoreTable";
import { DialogOf } from "./views/Dialog";

setup(h);
// -------------------------------

const WIP = () => {
  let [visible, setVisible] = useState(true);

  return (
    <DialogOf visible={visible} close={() => setVisible(false)}>
      {visible && (
        <div style="display: grid; place-content: center;">
          <ScoreTable
            avatars={["🐵", "🐸", "🦊"]}
            scores={[
              [1, 1, 1],
              [1, 0, 0],
              [1, 1, 1],
              [1, 0, 0],
              [2, 1, 1],
              [0, 1, 1],
            ]}
            playerIndex={0}
          />
        </div>
      )}
    </DialogOf>
  );
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
