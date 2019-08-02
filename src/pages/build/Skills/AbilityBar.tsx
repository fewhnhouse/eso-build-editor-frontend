import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Icon } from "antd";
import { BuildContext, ISkillSelection } from "../BuildStateContext";
import SkillView from "../../../components/SkillView";
import { ISkill } from "../../../components/SkillSlot";
import { useDrop } from "react-dnd";
import SkillSlot from "../../../components/SkillSlot";
import Flex from "../../../components/Flex";

export const ABILITY_BAR_ONE = "abilityBar1";
export const ABILITY_BAR_TWO = "abilityBar2";
export const ACTIVE_BAR = "activeBar";
export const ACTIVE_ULTIMATE = "activeUltimate";
export const ULTIMATE_ONE = "ultimate1";
export const ULTIMATE_TWO = "ultimate2";

const AbilityBar = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AbilityBarContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;
`;

const TrashContainer = styled.div`
  background: #fafafa;
  border: 1px dashed
    ${(props: { hasTrash: boolean }) =>
      props.hasTrash ? "#40a9ff" : "#d9d9d9"};
  border-radius: 4px;
  width: 250px;
  height: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => {
  const [state, dispatch] = useContext(BuildContext);
  const [activeBarSkills, setActiveBarSkills] = useState<ISkillSelection[]>([]);
  const [activeUltimate, setActiveUltimate] = useState<ISkill | undefined>(
    undefined
  );
  const {
    skillLine,
    selectedSkillLines,
    newBarOne,
    newBarTwo,
    ultimateOne,
    ultimateTwo
  } = state!;

  const [{ isOver }, drop] = useDrop({
    accept: ["ultimate", "skill"],
    drop: (item: any, monitor) => {
      console.log(item);
      if (item.type === "ultimate") {
        dispatch!({
          type: "REMOVE_ULTIMATE",
          payload: { barIndex: item.abilityBar }
        });
      } else {
        dispatch!({
          type: "REMOVE_ABILITY",
          payload: { barIndex: item.abilityBar, skill: item.skill }
        });
      }
      dispatch!({
        type: "SET_HAS_TRASH",
        payload: { hasTrash: false }
      });
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver()
    })
  });

  useEffect(() => {
    const selectedSkillLine = selectedSkillLines.find(
      line => line.id === skillLine
    );
    if (selectedSkillLine) {
      const { selectedSkills, selectedUltimate } = selectedSkillLine;
      setActiveBarSkills(selectedSkills);
      setActiveUltimate(selectedUltimate);
    }
  }, [selectedSkillLines, skillLine]);
  return (
    <AbilityBarContainer>
      <Flex
        direction="column"
        justify="space-around"
        align="center"
        style={{ height: "100%" }}
      >
        <Divider>Active Selection</Divider>
        <AbilityBar>
          <SkillView
            abilityBar={-1}
            id={ACTIVE_BAR}
            skillSlots={activeBarSkills}
          />
          <SkillSlot
            style={{ marginLeft: 10 }}
            abilityBar={-1}
            skill={activeUltimate || undefined}
            skillIndex={5}
          />
        </AbilityBar>
        <Divider>Ability Bar</Divider>

        <AbilityBar>
          <SkillView
            abilityBar={0}
            id={ABILITY_BAR_ONE}
            droppable
            skillSlots={newBarOne}
          />

          <SkillSlot
            style={{ marginLeft: 10 }}
            abilityBar={0}
            droppable
            skill={ultimateOne || undefined}
            skillIndex={5}
          />
        </AbilityBar>

        <AbilityBar>
          <SkillView
            abilityBar={1}
            id={ABILITY_BAR_TWO}
            droppable
            skillSlots={newBarTwo}
          />
          <SkillSlot
            abilityBar={1}
            droppable
            skill={ultimateTwo || undefined}
            skillIndex={5}
          />
        </AbilityBar>
        <TrashContainer hasTrash={isOver} ref={drop}>
          <Icon
            style={{
              fontSize: 30,
              color: isOver ? "#40a9ff" : "rgb(155,155,155)"
            }}
            type="delete"
          />
        </TrashContainer>
      </Flex>
    </AbilityBarContainer>
  );
};
