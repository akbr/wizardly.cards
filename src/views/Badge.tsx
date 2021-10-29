import { styled, keyframes } from "goober";

const throb = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
`;

const Avatar = styled("div")`
  font-size: 30px;
  padding: 8px;
  filter: drop-shadow(1px 2px 6px rgba(0, 0, 0, 0.75));
`;

type BadgeProps = {
  color?: string;
  avatar: string;
  name?: string;
  active?: boolean;
};

export const Badge = ({ color = "e36414", avatar, active }: BadgeProps) => {
  return (
    <Avatar
      style={{ animation: active ? `${throb} 750ms alternate infinite` : "" }}
    >
      {avatar}
    </Avatar>
  );
};
