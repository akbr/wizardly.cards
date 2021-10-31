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

type Err = { msg: string };

const TimedError = ({
  err,
  remove,
}: {
  err: Err;
  remove: (err: Err) => void;
}) => {
  useEffect(() => {
    let timeout = setTimeout(() => {
      remove(err);
    }, 2500);
    return () => clearTimeout(timeout);
  }, [err]);

  return <Error>{err.msg}</Error>;
};

const ErrorReciever = ({ err }: { err?: Err }) => {
  const [errors, setErrors] = useState<Err[]>([]);

  useEffect(() => {
    if (!err) return;
    setErrors((errs) => [...errs, err]);
  }, [err]);

  const remove = useCallback(
    (err: Err) => setErrors((errs) => errs.filter((x) => x !== err)),
    [setErrors]
  );

  return (
    <Container>
      {errors.map((err) => (
        <TimedError key={err} err={err} remove={remove} />
      ))}
    </Container>
  );
};

const WIP = () => {
  const [error, setErrors] = useState<Err>(null);

  return (
    <>
      <div>
        <button onClick={() => setErrors({ msg: String(Math.random()) })}>
          Add error
        </button>
      </div>
      <ErrorReciever err={error} />
    </>
  );
};

// -------------------------------
console.clear();

let $app = document.getElementById("app")!;
render(<WIP />, $app);
