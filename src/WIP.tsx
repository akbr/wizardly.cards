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
import { Badge } from "./views/Badge";
import { DeadCenterWrapper } from "./views/common";
import { Tooltip } from "./views/Tooltip";

setup(h);

// -------------------------------

const WIP = () => {
  return (
    <DeadCenterWrapper>
      <div style={{ position: "relative", backgroundColor: "purple" }}>
        <Badge avatar={"A"} />
        <Tooltip dir={"left"}>
          <div>Bid: 4</div>
        </Tooltip>
        <Tooltip dir={"right"}>
          <div>Bid: 4</div>
        </Tooltip>
        <Tooltip dir={"top"}>
          <div>Bid: 4</div>
        </Tooltip>
        <Tooltip dir={"bottom"}>
          <div>Bid: 4</div>
        </Tooltip>
      </div>
    </DeadCenterWrapper>
  );
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
