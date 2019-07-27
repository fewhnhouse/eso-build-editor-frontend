import React, { useContext, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { Divider, Card, Icon } from "antd";
import { abilityFrame } from "../../../assets/misc";
import skills from "../../../skills.json";
import { BuildContext } from "../BuildStateContext";
import SkillView from "../../../components/SkillView";
import SkillSlot from "../../../components/SkillSlot";
import { ISkill } from "../Skills/ThirdPage";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
  const [hasTrash, setHasTrash] = useState(false);
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

  console.log(abilityBarOne);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);

  const onDragStart = useCallback(start => {
    const sourceSplit = start.draggableId.split("-");
    const sourceBar = sourceSplit[0];
    const sourceId = sourceSplit[1];
    const sourceIndex = sourceSplit[3];
    if (sourceBar === "abilityBar1" || sourceBar === "abilityBar2") {
      setHasTrash(true);
    }

    /*...*/
  }, []);
  const onDragUpdate = useCallback(update => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(end => {
    setHasTrash(false);

    const sourceSplit = end.draggableId.split("-");
    const sourceBar = sourceSplit[0];
    const sourceId = sourceSplit[1];
    const sourceIndex = sourceSplit[3];
    if (end.destination) {
      const destinationSplit = end.destination.droppableId.split("-");
      const destinationBar = destinationSplit[0];
      const destinationId = destinationSplit[1];
      const destinationIndex = destinationSplit[3];

      if (
        (sourceBar === "abilityBar1" || sourceBar === "abilityBar2") &&
        sourceId !== 0 &&
        end.destination.droppableId === "trash-droppable-1"
      ) {
        dispatch!({
          type: "REMOVE_ABILITY",
          payload: {
            skillId: sourceId,
            barIndex: sourceBar === "abilityBar1" ? 0 : 1
          }
        });
      }

      if (sourceBar === "activeBar") {
        dispatch!({
          type: "DROP_ABILITY",
          payload: {
            skillId: sourceId,
            destinationIndex,
            barIndex: destinationBar === "abilityBar1" ? 0 : 1
          }
        });
      } else {
        dispatch!({
          type: "SWAP_ABILITY",
          payload: {
            sourceIndex,
            sourceId,
            sourceBar,
            destinationIndex,
            destinationId,
            destinationBar
          }
        });
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
        </Droppable>
      </AbilityBarContainer>
    </DragDropContext>
  );
};
