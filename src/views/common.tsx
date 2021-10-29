import { styled } from "goober";

export const DeadCenterWrapper = styled("div")`
  height: 100%;
  display: grid;
  place-content: center;
`;

export const Container = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
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
  padding: 1em;
  color: white;
  background-color: mediumblue;
  border-radius: 1em;
`;
