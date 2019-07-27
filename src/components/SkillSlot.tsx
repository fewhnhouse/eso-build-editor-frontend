import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { Popover } from "antd";
import { abilityFrame } from "../assets/misc";
import { drink } from "../assets/deco";

interface ISkillSlotProps {
  tooltip:
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom"
  | undefined;
}

const SkillFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0;
  background-image: url(${abilityFrame});
  background-repeat: no-repeat;
`;

const SkillImg = styled.img`
  width: 59px;
  height: 59px;
`;

export default ({ tooltip }: ISkillSlotProps) => {
  return (
    <Popover placement={tooltip} title="Skill 1" content="Instagib2000">
      <SkillFrame>
        <SkillImg
          src={`https://beast.pathfindermediagroup.com/storage/skills/${"ability_necromancer_010_b.png"}`}
        />
      </SkillFrame>
    </Popover>
  );
};
