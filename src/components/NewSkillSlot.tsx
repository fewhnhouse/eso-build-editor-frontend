import React, { useContext } from "react";
import styled from "styled-components";
import { Popover } from "antd";
import { abilityFrame } from "../assets/misc";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { SkillCardContent } from "../pages/build/Skills/SkillCard";
import { BuildContext } from "../pages/build/BuildStateContext";
import { useDrag, useDrop } from "react-dnd";

interface ISkillSlotProps {
  droppable?: boolean;
  skillIndex: number;
  disabled?: boolean;
  abilityBar?: number;
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
  skillIndex,
  skill,
  disabled,
  tooltipPos,
  abilityBar
}: ISkillSlotProps) => {
  const [, dispatch] = useContext(BuildContext);

  const [{ isDragging, didDrop }, drag] = useDrag({
    item: {
      type: skillIndex === 5 ? "ultimate" : "skill",
      skill,
      index: skillIndex,
      abilityBar
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop()
    })
  });
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: skillIndex === 5 ? "ultimate" : "skill",
    drop: (item: any, monitor) => {
      if (item.type === "ultimate") {
        if (item.abilityBar === -1) {
          dispatch!({
            type: "DROP_ULTIMATE",
            payload: {
              barIndex: abilityBar,
              skill: item.skill
            }
          });
        } else {
          dispatch!({
            type: "SWAP_ULTIMATE",
            payload: {
              barIndex: item.abilityBar,
              destinationSkill: skill,
              sourceSkill: item.skill
            }
          });
        }
      } else {
        if (item.abilityBar === abilityBar) {
          dispatch!({
            type: "SWAP_ABILITY_SAME",
            payload: {
              barIndex: item.abilityBar,
              destinationIndex: item.index,
              destinationSkill: item.skill,
              sourceIndex: skillIndex,
              sourceSkill: skill
            }
          });
        } else if (item.abilityBar !== -1 && item.abilityBar !== abilityBar) {
          dispatch!({
            type: "SWAP_ABILITY_DIFFERENT",
            payload: {
              sourceBarIndex: item.abilityBar,
              destinationBarIndex: abilityBar,
              destinationIndex: skillIndex,
              destinationSkill: skill,
              sourceIndex: item.index,
              sourceSkill: item.skill
            }
          });
        } else {
          dispatch!({
            type: "DROP_ABILITY",
            payload: {
              barIndex: abilityBar,
              destinationIndex: skillIndex,
              skill: item.skill
            }
          });
        }
      }
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver()
    })
  });
  return disabled ? (
    <DisabledSkillSlot />
  ) : (
    <SkillFrame ref={drop}>
      {skill !== undefined && !isDragging ? (
        <Popover
          placement={tooltipPos}
          content={<SkillCardContent skill={skill} />}
        >
          <SkillImg
            ref={drag}
            src={`https://beast.pathfindermediagroup.com/storage/skills/${
              skill.icon
            }`}
          />
        </Popover>
      ) : skill !== undefined ? (
        <SkillImg
          ref={drag}
          src={`https://beast.pathfindermediagroup.com/storage/skills/${
            skill.icon
          }`}
        />
      ) : (
        <div />
      )}
    </SkillFrame>
  );
};

const DisabledSkillSlot = ({ skill }: { skill?: ISkill }) => {
  return skill !== undefined ? (
    <SkillFrame>
      <Popover placement={"top"} content={<SkillCardContent skill={skill} />}>
        <SkillImg
          src={`https://beast.pathfindermediagroup.com/storage/skills/${
            skill.icon
          }`}
        />
      </Popover>
    </SkillFrame>
  ) : (
    <SkillFrame />
  );
};
