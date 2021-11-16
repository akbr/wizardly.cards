import { styled } from "goober";

const AvatarIcon = styled("div")`
  font-size: 30px;
  padding: 8px;
  filter: drop-shadow(1px 2px 6px rgba(0, 0, 0, 0.75));
`;

type BadgeProps = {
  avatar: string;
  color?: string;
  name?: string;
  active?: boolean;
};

export const Badge = ({ color = "e36414", avatar, active }: BadgeProps) => {
  return <AvatarIcon>{avatar}</AvatarIcon>;
};
