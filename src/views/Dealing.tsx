import { styled } from "goober";
import { Throb } from "./common";

const Wrapper = styled("div")`
  text-align: center;
`;

type DealProps = {
  turn: number;
};

export const Dealing = ({ turn }: DealProps) => (
  <Wrapper>
    <h2>Round {turn}</h2>
    <Throb>Dealing ...</Throb>
  </Wrapper>
);
