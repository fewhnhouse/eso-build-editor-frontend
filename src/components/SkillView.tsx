import React from "react";
import styled from "styled-components";
import SkillSlot from "./SkillSlot";
import { ISkill } from "../pages/build/Sets/SecondPage";

interface ISKillViewProps {
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
  skillSlots: { index: number; skill: ISkill | undefined }[];
  droppable?: boolean;
  id: string;
}

const SkillView = styled.div`
  display: flex;
  flex-direction: row;
  width: 320px;
`;

export default ({ tooltip, skillSlots, droppable, id }: ISKillViewProps) => {
  return (
    <SkillView>
      {skillSlots.map((skillSlot, index) => (
        <SkillSlot
          id={`${id}-${skillSlot.skill ? skillSlot.skill.id : "0"}`}
          index={index}
          droppable={droppable}
          tooltip={tooltip}
          skillIndex={skillSlot.index}
          skillId={skillSlot.skill ? skillSlot.skill.id : 0}
          icon={skillSlot.skill ? skillSlot.skill.icon : ""}
        />
      ))}
    </SkillView>
  );
};
