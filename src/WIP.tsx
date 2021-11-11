import { setup, styled, css, keyframes } from "goober";
import { ComponentChildren, h, render } from "preact";
import {
  useRef,
  Ref,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "preact/hooks";
import { EmojiOne } from "./views/Players";
import { DeadCenterWrapper } from "./views/common";

setup(h);

// -------------------------------

const WIP = () => {
  return (
    <>
      <div>1️⃣</div>
      <EmojiOne />
    </>
  );
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
