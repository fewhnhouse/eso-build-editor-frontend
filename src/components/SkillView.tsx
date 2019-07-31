import React from "react";
import styled from "styled-components";
import { ABILITY_BAR_ONE } from "../pages/build/Skills/AbilityBar";
import NewSkillSlot, { ISkill } from "./SkillSlot";

interface ISKillViewProps {
  skillSlots: { index: number; skill?: ISkill }[];
  droppable?: boolean;
  id: string;
  abilityBar?: number;
  disabled?: boolean;
}

const SkillView = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ({
  skillSlots,
  droppable,
  id,
  abilityBar,
  disabled
}: ISKillViewProps) => {
  const pos = (id: string) => {
    if (id === ABILITY_BAR_ONE) {
      return "top";
    } else return "bottom";
  };

  return (
    <SkillView>
      {skillSlots.map((skillSlot, index) => (
        <NewSkillSlot
          abilityBar={abilityBar}
          key={index + skillSlot.index}
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
