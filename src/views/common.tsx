import { styled, keyframes } from "goober";

export const DeadCenterWrapper = styled("div")`
  height: 100%;
  display: grid;
  place-content: center;
`;

export const Container = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  gap: 16px;
  margin-top: 48px;
`;

export const Fieldset = styled("fieldset")`
  display: flex;
  align-items: center;
  padding: 1.5em;
  border-radius: 1em;
  background-color: rgba(0, 0, 0, 0.15);
  border: 2px solid #999;
`;

export const EmojiButton = styled("button")`
  font-size: 2em;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
`;

const ButtonBase = styled("button")`
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;

export const Button = styled(ButtonBase)`
  padding: 12px;
  color: white;
  background-color: mediumblue;
  border-radius: 12px;
  font-size: 1.25em;
`;

export const throb = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
`;
export const Throb = styled("div")`
  animation: ${throb} 1s alternate infinite;
`;
