import React from "react";
import styled from "styled-components";
import SkillSlot from "./SkillSlot";
import { ISkill } from "../pages/build/Sets/SecondPage";

interface ISKillViewProps {
  skillSlots: { index: number; skill: ISkill | undefined }[];
  droppable?: boolean;
  id: string;
}

const SkillView = styled.div`
  display: flex;
  flex-direction: row;
  width: 320px;
`;

export default ({ skillSlots, droppable, id }: ISKillViewProps) => {
  return (
    <SkillView>
      {skillSlots.map((skillSlot, index) => (
        <SkillSlot
          id={`${id}-${skillSlot.skill ? skillSlot.skill.id : "0"}`}
          index={index}
          droppable={droppable}
          skillIndex={skillSlot.index}
          icon={skillSlot.skill ? skillSlot.skill.icon : ""}
        />
      ))}
    </SkillView>
  );
};
