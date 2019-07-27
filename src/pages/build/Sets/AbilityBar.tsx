import React, { useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Divider, Card } from "antd";
import { abilityFrame } from "../../../assets/misc";
import skills from "../../../skills.json";
import { BuildContext } from "../BuildStateContext";
import SkillView from "../../../components/SkillView";
import SkillSlot from "../../../components/SkillSlot";
import { ISkill } from "../Skills/ThirdPage";
import { DragDropContext } from "react-beautiful-dnd";

const AbilityBar = styled(Card)`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Ability = styled.img`
  margin: 0px 10px;
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

  const {
    selectedSkills,
    skills,
    selectedUltimate,
    abilityBarOne,
    abilityBarTwo
  } = state!;

  const getSkills = (abilityBar: { index: number; id: number }[]) => {
    return abilityBar.map((slot, index) => {
      const skill = skills.find(skill => skill.id === slot.id);
      return { skill, index };
    });
  };
  const activeBarSkills = getSkills(selectedSkills);

  const ultimate = skills.find(skill => skill.id === selectedUltimate);

  const abilityBarOneSkills = getSkills(abilityBarOne);
  const abilityBarTwoSkills = getSkills(abilityBarTwo);

  console.log(activeBarSkills, abilityBarOneSkills);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);

  const onDragStart = useCallback(start => {
    console.log("drag start / end", start);
    /*...*/
  }, []);
  const onDragUpdate = useCallback(update => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(end => {
    if (end.destination) {
      const sourceSplit = end.draggableId.split("-");
      const sourceBar = sourceSplit[0];
      const sourceSkillId = sourceSplit[1];
      const sourceIndex = sourceSplit[3];

      const destinationSplit = end.destination.droppableId.split("-");
      const destinationBar = destinationSplit[0];
      const destinationSkillId = destinationSplit[1];
      const destinationIndex = destinationSplit[3];

      console.log("drag start / end", end, sourceSkillId, destinationIndex);
      if (sourceBar === "activeBar") {
        dispatch!({
          type: "DROP_ABILITY",
          payload: { skillId: sourceSkillId, destinationIndex, barIndex: 0 }
        });
      } else {
        if (sourceBar === destinationBar) {
          dispatch!({
            type: "DROP_ABILITY",
            payload: { skillId: sourceSkillId, destinationIndex, barIndex: 0 }
          });
        } else {
        }
      }
    }
    // the only one that is required
  }, []);

  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <AbilityBarContainer>
        <Divider>Ultimate</Divider>
        {/*

        <SkillSlot
          skillIndex={6}
          id="ultimate"
          index={6}
          skillId={ultimate ? ultimate.id : 0}
          icon={ultimate ? ultimate.icon : ""}
          tooltip="top"
        />
                  */}

        <Divider>Active</Divider>
        <SkillView id="activeBar" skillSlots={activeBarSkills} tooltip="top" />
        <Divider>Ability Bar</Divider>

        <AbilityBar>
          <SkillView
            id="abilityBar1"
            droppable
            skillSlots={abilityBarOneSkills}
            tooltip="top"
          />
          {/*

          <SkillSlot
            skillIndex={6}
            id="abilityBar1-ultimate"
            droppable
            index={6}
            skillId={0}
            icon={ultimate ? ultimate.icon : ""}
            tooltip="top"
          />
                    */}
        </AbilityBar>
        <AbilityBar>
          <SkillView
            id="abilityBar2"
            droppable
            skillSlots={abilityBarTwoSkills}
            tooltip="top"
          />
          {/*
          <SkillSlot
            skillIndex={-1}
            id="abilityBar2-ultimate"
            index={6}
            droppable
            skillId={0}
            icon={ultimate ? ultimate.icon : ""}
            tooltip="top"
          />*/}
        </AbilityBar>
      </AbilityBarContainer>
    </DragDropContext>
  );
};
