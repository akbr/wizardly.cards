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
import { DialogOf } from "./views/Dialog2";

setup(h);

// -------------------------------

const WIP = () => {
  const [child, setChild] = useState<ComponentChildren>(null);
  const close = () => setChild(null);

  return (
    <div>
      <DialogOf close={close}>{child}</DialogOf>
      <button onClick={() => setChild(<div>{Math.random()}</div>)}>Set</button>
      <button onClick={() => setChild(null)}>Clear</button>
    </div>
  );
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
