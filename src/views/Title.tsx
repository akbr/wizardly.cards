import { useState } from "preact/hooks";
import { styled } from "goober";
import { Fieldset, Container, Button } from "./common";

const Banner = styled("div")`
  font-size: 5em;
  font-weight: bold;
  margin-bottom: 48px;
`;

const GameInput = styled("input")`
  margin-right: 1em;
  text-transform: uppercase;
  border-radius: 15px;
  border: none;
  font-size: 1.5em;
  text-align: center;
  height: 1.75em;
`;

export const Title = ({ join }: { join: (id?: string) => void }) => {
  const [code, setCode] = useState("");

  return (
    <Container>
      <Banner>Wizard</Banner>
      <Button onClick={() => join()}>New Game</Button>
      <h2> OR </h2>
      <Fieldset>
        <legend>Enter a room code:</legend>
        <GameInput
          onInput={
            //@ts-ignore
            (e: Event) => setCode(e.target.value.toUpperCase())
          }
          type="text"
          size={4}
          maxLength={4}
        ></GameInput>
        <Button
          onClick={() => {
            join(code);
          }}
        >
          Join Game
        </Button>
      </Fieldset>
    </Container>
  );
};
