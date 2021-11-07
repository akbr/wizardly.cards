import { Player } from "./types";

import { styled, keyframes } from "goober";
import { Fieldset, Container, Button } from "./common";
import { Badge } from "./Badge";

const PlayerBox = styled(Fieldset)`
  display: inline-flex;
  justify-content: center;
  gap: 0.5em;
  padding: 0.5em;
`;

const Link = styled("div")`
  cursor: pointer;
  padding: 0.3em;
  &:hover {
    border-radius: 0.2em;
    background-color: yellow;
    color: black;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Fader = styled("div")`
  animation: ${fadeIn} 0.5s both;
`;

type LobbyProps = {
  players: Player[];
  roomId: string;
  isAdmin: boolean;
  start: () => void;
  addBot?: () => void;
};

export const Lobby = ({
  players,
  isAdmin,
  roomId,
  start,
  addBot,
}: LobbyProps) => {
  const url = window.location.host + "/#" + roomId;

  return (
    <Container>
      <h1>Lobby</h1>
      <PlayerBox>
        <legend>Invite your friends:</legend>
        <Link onclick={() => navigator.clipboard.writeText(url)}>
          <span role="img" aria-label="clipboard">
            📋
          </span>{" "}
          {url}
        </Link>
      </PlayerBox>
      <PlayerBox>
        <legend>Players in room:</legend>
        {players.map((player) => (
          <Fader>
            <Badge {...player} />
          </Fader>
        ))}
      </PlayerBox>
      {isAdmin ? (
        <>
          {addBot && <Button onClick={addBot}>Add bot</Button>}
          <Button onClick={start}>Start</Button>
        </>
      ) : (
        <div>Waiting for game start ...</div>
      )}
    </Container>
  );
};
