import { setup, styled, css, keyframes } from "goober";
import { h, render } from "preact";
import {
  useRef,
  Ref,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "preact/hooks";
import { rotateArray } from "./lib/array";
import { DeadCenterWrapper } from "./views/common";
import { TrumpInput } from "./views/TrumpInput";
import { ScoreTable } from "./views/ScoreTable";
import { DialogOf } from "./views/Dialog";

setup(h);

const Container = styled("div")`
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Error = styled("div")`
  display: inline-block;
  background-color: red;
  padding: 6px;
  border-radius: 4px;
`;

// -------------------------------

const WIP = () => {};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
