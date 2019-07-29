import React from "react";
import styled from "styled-components";
import SkillSlot, { ISkill } from "./SkillSlot";
import { ABILITY_BAR_ONE } from "../pages/build/Skills/AbilityBar";

interface ISKillViewProps {
  skillSlots: { index: number; skill: ISkill | undefined }[];
  droppable?: boolean;
  id: string;
  disabled?: boolean;
}

const SkillView = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ({ skillSlots, droppable, id, disabled }: ISKillViewProps) => {
  const pos = (id: string) => {
    if (id === ABILITY_BAR_ONE) {
      return "top";
    } else return "bottom";
  };

  return (
    <SkillView>
      {skillSlots.map((skillSlot, index) => (
        <SkillSlot
          id={`${id}-${skillSlot.skill ? skillSlot.skill.id : "0"}`}
          index={index}
          disabled={disabled}
          droppable={droppable}
          skillIndex={skillSlot.index}
          tooltipPos={pos(id)}
          skill={skillSlot ? skillSlot.skill : undefined}
        />
      ))}
    </SkillView>
  );
};
