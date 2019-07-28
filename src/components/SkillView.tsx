import React from "react";
import styled from "styled-components";
import SkillSlot, { ISkill } from "./SkillSlot";

interface ISKillViewProps {
  skillSlots: { index: number; skill: ISkill| undefined }[];
  droppable?: boolean;
  id: string;
}

const SkillView = styled.div`
  display: flex;
  flex-direction: row;
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
          skill={skillSlot ? skillSlot.skill : undefined}
        />
      ))}
    </SkillView>
  );
};
