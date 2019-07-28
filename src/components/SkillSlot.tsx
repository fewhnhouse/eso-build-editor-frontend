import React from "react";
import styled from "styled-components";
import { Popover } from "antd";
import { abilityFrame } from "../assets/misc";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface ISkillSlotProps {
  icon: string;
  droppable?: boolean;
  index: number;
  id: string;
  skillIndex: number;
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
  icon,
  droppable,
  index,
  id,
  skillIndex
}: ISkillSlotProps) => {
  return (
    <Droppable
      isDropDisabled={!droppable}
      droppableId={`${id}-droppable-${index}`}
    >
      {(provided, snapshot) => (
        <SkillFrame ref={provided.innerRef} {...provided.droppableProps}>
          {provided.placeholder}

          <Draggable
            isDragDisabled={icon === ""}
            draggableId={`${id}-draggable-${index}`}
            index={index}
          >
            {(provided, snapshot) =>
              icon && skillIndex === index ? (
                <Popover
                  placement={"top"}
                  title="Skill 1"
                  content="Instagib2000"
                >
                  <SkillImg
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    src={`https://beast.pathfindermediagroup.com/storage/skills/${icon}`}
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
