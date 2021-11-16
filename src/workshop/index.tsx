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

import t from "twemoji";

setup(h);

import { Appear, DeadCenterWrapper, Throb } from "../lib/components/common";
import { Badge } from "../lib/components/Badge";
import { Twemoji } from "../lib/components/Twemoji";
// -------------------------------

//tl={<Twemoji char={"1️⃣"} size={18} />}
//tr={<Twemoji char={"⏳"} size={18} />}
const WIP = () => {
  return (
    <DeadCenterWrapper>
      <Badge
        avatar="🦊"
        name="P0"
        info={"You"}
        say={{
          dir: "top",
          content: <a href="">Change name?</a>,
        }}
      />
    </DeadCenterWrapper>
  );
};
let $app = document.getElementById("app")!;
render(<WIP />, $app);
