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
import { DeadCenterWrapper } from "./views/common";

setup(h);

export const scoreAppear = keyframes`
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(2) rotate(32deg);
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    transform: translateY(-25px);
    opacity: 0;
  }
`;

const Score = styled("div")`
  text-shadow: 0 0 7px var(--glow-color), 0 0 10px var(--glow-color),
    0 0 21px var(--glow-color);
  animation: ${scoreAppear} 2s both;
`;

const ScorePop = ({ score }: { score: number }) => {
  let isPositive = score > 0;
  let strScore = isPositive ? `+${score}` : `${score}`;
  let color = isPositive ? "blue" : "red";
  return <Score style={{ "--glow-color": color }}>{strScore}</Score>;
};

// -------------------------------

const WIP = () => {
  return (
    <DeadCenterWrapper>
      <ScorePop score={40} />
    </DeadCenterWrapper>
  );
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
