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
import { MiniCard } from "./lib/cardsViews/MiniCard";
import { DeadCenterWrapper } from "./views/common";

setup(h);

// -------------------------------

const WIP = () => {
  return <MiniCard suit={"w"} value={"h"} />;
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
