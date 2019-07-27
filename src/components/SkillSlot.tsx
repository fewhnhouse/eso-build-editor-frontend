import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { Popover } from "antd";
import { abilityFrame } from "../assets/misc";
import { drink } from "../assets/deco";
import { Droppable, Draggable } from "react-beautiful-dnd";

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
  icon: string;
  droppable?: boolean;
  index: number;
  id: string;
  skillIndex: number;
  skillId: number;
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
  tooltip,
  icon,
  droppable,
  index,
  id,
  skillIndex,
  skillId
}: ISkillSlotProps) => {
  return (
    <Popover placement={tooltip} title="Skill 1" content="Instagib2000">
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
                  <SkillImg
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    src={`https://beast.pathfindermediagroup.com/storage/skills/${icon}`}
                  />
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
    </Popover>
  );
};
