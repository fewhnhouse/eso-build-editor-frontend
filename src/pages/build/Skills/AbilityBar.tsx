import React, { useContext, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Card, Icon } from "antd";
import { BuildContext, ISkillSelection } from "../BuildStateContext";
import SkillView from "../../../components/SkillView";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SkillSlot, { ISkill } from "../../../components/SkillSlot";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import NewSkillSlot from "../../../components/NewSkillSlot";

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
  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;
`;

export default () => {
  const [state, dispatch] = useContext(BuildContext);
  const [hasTrash, setHasTrash] = useState(false);
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
    <DndProvider backend={HTML5Backend}>
      <AbilityBarContainer>
        <Divider>Active Selection</Divider>
        <AbilityBar>
          <SkillView
            abilityBar={-1}
            id={ACTIVE_BAR}
            skillSlots={activeBarSkills}
          />
          <NewSkillSlot
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

          <NewSkillSlot
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
          <NewSkillSlot
            abilityBar={1}
            droppable
            skill={ultimateTwo || undefined}
            skillIndex={5}
          />
        </AbilityBar>
        {/*
        <Droppable isDropDisabled={!hasTrash} droppableId={`trash-droppable-1`}>
          {(provided, snapshot) => (
            <div
              style={{ height: 50, width: 50, margin: 50 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {provided.placeholder}
              {hasTrash && <Icon style={{ fontSize: 30 }} type="delete" />}
            </div>
          )}
        </Droppable>*/}
      </AbilityBarContainer>
    </DndProvider>
  );
};
