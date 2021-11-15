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

setup(h);

// -------------------------------

const WIP = () => {
  return <div></div>;
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
