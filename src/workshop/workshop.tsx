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

import { DeadCenterWrapper } from "lib/components/common";

// -------------------------------

const WIP = () => {
  return <DeadCenterWrapper>Hello, world!@</DeadCenterWrapper>;
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);

export default "W";
