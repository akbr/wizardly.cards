import { styled } from "goober";
import { ComponentChildren } from "preact";
import { Appear } from "./common";
import { Twemoji } from "./Twemoji";

import { Tooltip } from "./Tooltip";

const BadgeWrapper = styled("div")`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarWrapper = styled("div")`
  font-size: 30px;
`;

const Name = styled("div")`
  margin-top: -4px;
  font-size: 12px;
  color: white;
  background: mediumblue;
  clip-path: polygon(100% 0, 90% 50%, 100% 100%, 0% 100%, 10% 50%, 0% 0%);
  padding: 2px 6px 1px 6px;
`;

const Corner = styled("div")`
  position: absolute;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.6));
  top: 0;
`;

const TL = styled(Corner)`
  left: 0;
  transform: translate(-2px, calc(-60% - 3px));
`;

const TR = styled(Corner)`
  right: 0;
  transform: translate(2px, calc(-60% - 3px));
`;

const Info = styled("div")`
  position: absolute;
  white-space: nowrap;
  top: calc(100% + 2px);
  left: 50%;
  transform: translateX(-50%);
`;

type BadgeProps = {
  avatar: string;
  size?: number;
  name?: string;
  tr?: ComponentChildren;
  tl?: ComponentChildren;
  info?: ComponentChildren;
  say?: {
    dir: "left" | "right" | "top" | "bottom";
    content: ComponentChildren;
  } | null;
};

export const Badge = ({
  avatar,
  size = 36,
  name,
  tr,
  tl,
  info,
  say,
}: BadgeProps) => {
  return (
    <BadgeWrapper>
      {say && <Tooltip dir={say.dir}>{say.content}</Tooltip>}
      {tl && (
        <Appear>
          <TL>{tl}</TL>
        </Appear>
      )}
      {tr && (
        <Appear>
          <TR>{tr}</TR>
        </Appear>
      )}
      {info && <Info>{info}</Info>}
      <AvatarWrapper>
        <Twemoji char={avatar} size={size} />
      </AvatarWrapper>
      {name && <Name>{name}</Name>}
    </BadgeWrapper>
  );
};
