import { Player } from "./types";

import { styled, keyframes } from "goober";
import { Fieldset, Container, Button, Throb } from "../lib/components/common";
import { PreGameWrapper } from "./Title";
import { Badge } from "../lib/components/Badge";

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
      <Container style={{ gap: "1.5em", marginTop: "1.5em" }}>
        <Throb style={{ color: "yellow" }}>Waiting for players...</Throb>
        <RoomInfoContainer>
          <PlayerBox>
            <legend>✏️ Code:</legend>
            <div style={{ textAlign: "center" }}>
              <Link
                readonly
                size={roomId.length - 2}
                type={"text"}
                value={roomId}
                onclick={(e: any) => {
                  navigator.clipboard.writeText(e.target.value);
                }}
              />
            </div>
          </PlayerBox>
          <PlayerBox>
            <legend>⚡ Direct link:</legend>
            <div style={{ textAlign: "center" }}>
              <span></span>
              <Link
                readonly
                size={url.length - 2}
                type={"text"}
                value={url}
                onclick={(e: any) => {
                  navigator.clipboard.writeText(e.target.value);
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
