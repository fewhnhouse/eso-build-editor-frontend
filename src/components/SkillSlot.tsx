import React from "react";
import styled from "styled-components";
import { Popover } from "antd";
import { abilityFrame } from "../assets/misc";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { SkillCardContent } from "../pages/build/Skills/SkillCard";

interface ISkillSlotProps {
  droppable?: boolean;
  index: number;
  skillIndex: number;
  id: string;
  disabled?: boolean;
  skill?: ISkill;
  tooltipPos?: "top" | "bottom" | undefined;
}

export interface ISkill {
  cast_time: string;
  cost: string;
  effect_1: string;
  effect_2: string | null;
  icon: string;
  id: number;
  name: string;
  parent: number | null;
  pts: number;
  range: string | null;
  skillline: number;
  slug: string;
  target: string | null;
  type: number;
  unlocks_at: number | null;
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

export default ({
  droppable,
  index,
  skillIndex,
  id,
  skill,
  disabled,
  tooltipPos
}: ISkillSlotProps) => {
  return disabled ? (
    skill !== undefined ? (
      <SkillFrame>
        <Popover placement={tooltipPos} content={<SkillCardContent skill={skill} />}>
          <SkillImg
            src={`https://beast.pathfindermediagroup.com/storage/skills/${
              skill.icon
            }`}
          />
        </Popover>
      </SkillFrame>
    ) : (
      <SkillFrame />
    )
  ) : (
    <Droppable
      isDropDisabled={!droppable}
      droppableId={`${id}-droppable-${index}`}
    >
      {(provided, snapshot) => (
        <SkillFrame ref={provided.innerRef} {...provided.droppableProps}>
          {provided.placeholder}

          <Draggable
            isDragDisabled={skill === undefined}
            draggableId={`${id}-draggable-${index}`}
            index={index}
          >
            {(provided, snapshot) =>
              skill && skillIndex === index ? (
                <Popover
                  placement={tooltipPos}
                  content={<SkillCardContent skill={skill} />}
                >
                  <SkillImg
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    src={`https://beast.pathfindermediagroup.com/storage/skills/${
                      skill.icon
                    }`}
                  />
                </Popover>
              ) : (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                />
              )
            }
          </Draggable>
        </SkillFrame>
      )}
    </Droppable>
  );
};
