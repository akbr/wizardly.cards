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

type LobbyProps = {
  players: {
    avatar: string;
    active: boolean;
  }[];
  roomCode: string;
  isAdmin: boolean;
  start: () => void;
  addBot?: () => void;
};

const fadeIn = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Fader = styled("div")`
  animation: ${fadeIn} 0.5s both;
`;

export const Lobby = ({
  players,
  roomCode,
  isAdmin,
  start,
  addBot,
}: LobbyProps) => {
  const url = window.location.host + "/#" + roomCode;

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
      {isAdmin && (
        <>
          {addBot && <Button onClick={addBot}>Add bot</Button>}
          <Button onClick={start}>Start</Button>
        </>
      )}
      {!isAdmin && <div>Waiting for game start ...</div>}
    </Container>
  );
};
