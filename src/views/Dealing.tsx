import { styled, keyframes } from "goober";

const throb = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
    transform: scale(1.25);
  }

  100% {
    opacity: 0;
  }
`;

const Wrapper = styled("div")`
  animation: ${throb} 2s both;
  text-align: center;
`;

type DealProps = {
  turn: number;
};

export const Dealing = ({ turn }: DealProps) => (
  <Wrapper>
    <h2>Round {turn}</h2>
    <div>Dealing ...</div>
  </Wrapper>
);
