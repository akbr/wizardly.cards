import { Player } from "./types";

import { styled, keyframes } from "goober";
import { Fieldset, Container, Button, Throb } from "./common";
import { PreGameWrapper } from "./Title";
import { Badge } from "./Badge";

const RoomInfoContainer = styled("div")`
  display: inline-flex;
  gap: 1em;
`;

const PlayerBox = styled(Fieldset)`
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 8px;
`;

const Link = styled("input")`
  border: none;
  font-size: 1em;
  cursor: pointer;
  color: white;
  text-align: center;
  padding: 2px;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
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
  exit: () => void;
  addBot?: () => void;
};

export const Lobby = ({
  players,
  isAdmin,
  roomId,
  start,
  addBot,
  exit,
}: LobbyProps) => {
  const url = window.location.host + "/#" + roomId;

  return (
    <PreGameWrapper>
      <Container style={{ gap: "1em" }}>
        <div style={{ marginTop: "2.5em" }}>
          <Throb>Waiting for players...</Throb>
        </div>
        <RoomInfoContainer>
          <PlayerBox>
            <legend>✏️ Room code:</legend>
            <div>{roomId}</div>
          </PlayerBox>
          <PlayerBox>
            <legend>⚡ Live link:</legend>
            <div style={{ textAlign: "center" }}>
              <Link
                type={"text"}
                value={url}
                onclick={(el) => {
                  el.target.select();
                  el.target.setSelectionRange(0, 99999);
                  navigator.clipboard.writeText(el.target.value);
                }}
              />
            </div>
          </PlayerBox>
        </RoomInfoContainer>
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
            {players.length > 1 && <Button onClick={start}>Start</Button>}
          </>
        ) : (
          <div>The game creator will start the game. Hang tight!</div>
        )}
        <Button onclick={exit}>Exit</Button>
      </Container>
    </PreGameWrapper>
  );
};
