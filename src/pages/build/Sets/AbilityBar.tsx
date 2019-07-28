import React, { useContext, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Card, Icon } from "antd";
import { BuildContext } from "../BuildStateContext";
import SkillView from "../../../components/SkillView";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SkillSlot from "../../../components/SkillSlot";

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
  const [activeBarSkills, setActiveBarSkills] = useState<any>([]);
  const [activeUltimate, setActiveUltimate] = useState<number>(0);
  const {
    skillLine,
    selectedSkillLines,
    skills,
    abilityBarOne,
    abilityBarTwo,
    ultimateOne,
    ultimateTwo
  } = state!;

  const getSkills = (abilityBar: { index: number; id: number }[]) => {
    return abilityBar.map((slot, index) => {
      const skill = skills.find(skill => skill.id === slot.id);
      return { skill, index };
    });
  };

  useEffect(() => {
    const selectedSkillLine = selectedSkillLines.find(
      line => line.id === skillLine
    );
    if (selectedSkillLine) {
      const { selectedSkills, selectedUltimate } = selectedSkillLine;
      const activeSkills = getSkills(selectedSkills);
      setActiveBarSkills(activeSkills);
      setActiveUltimate(selectedUltimate);
    }
  }, [selectedSkillLines]);

  const ultimate = skills.find(skill => skill.id === activeUltimate);
  const ultimateSkillOne = skills.find(skill => skill.id === ultimateOne.id);
  const ultimateSkillTwo = skills.find(skill => skill.id === ultimateTwo.id);

  const abilityBarOneSkills = getSkills(abilityBarOne);
  const abilityBarTwoSkills = getSkills(abilityBarTwo);

  const onBeforeDragStart = useCallback(() => {}, []);

  const onDragStart = useCallback(start => {
    const sourceSplit = start.draggableId.split("-");
    const sourceBar = sourceSplit[0];
    const sourceId = sourceSplit[1];
    const sourceIndex = sourceSplit[3];
    if (
      sourceBar === ABILITY_BAR_ONE ||
      sourceBar === ABILITY_BAR_TWO ||
      sourceBar === ULTIMATE_ONE ||
      sourceBar === ULTIMATE_TWO
    ) {
      setHasTrash(true);
    }
  }, []);
  const onDragUpdate = useCallback(update => {}, []);
  const onDragEnd = useCallback(
    end => {
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
          sourceId !== 0 &&
          end.destination.droppableId === "trash-droppable-1"
        ) {
          if (sourceBar === ABILITY_BAR_ONE || sourceBar === ABILITY_BAR_TWO) {
            dispatch!({
              type: "REMOVE_ABILITY",
              payload: {
                skillId: sourceId,
                barIndex: sourceBar === ABILITY_BAR_ONE ? 0 : 1
              }
            });
          } else if (sourceBar === ULTIMATE_ONE || sourceBar === ULTIMATE_TWO) {
            dispatch!({
              type: "REMOVE_ULTIMATE",
              payload: {
                barIndex: sourceBar === ULTIMATE_ONE ? 0 : 1
              }
            });
          }
        }

        if (sourceBar === "activeBar") {
          dispatch!({
            type: "DROP_ABILITY",
            payload: {
              skillId: sourceId,
              destinationIndex,
              barIndex: destinationBar === ABILITY_BAR_ONE ? 0 : 1
            }
          });
        } else if (sourceBar === ACTIVE_ULTIMATE) {
          dispatch!({
            type: "DROP_ULTIMATE",
            payload: {
              skillId: sourceId,
              barIndex: destinationBar === ULTIMATE_ONE ? 0 : 1
            }
          });
        } else if (
          sourceBar === ABILITY_BAR_ONE ||
          sourceBar === "abilityBar2"
        ) {
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
        } else if (
          (sourceBar === ULTIMATE_ONE || sourceBar === ULTIMATE_TWO) &&
          (destinationBar === ULTIMATE_ONE || destinationBar === ULTIMATE_TWO)
        ) {
          dispatch!({
            type: "SWAP_ULTIMATE",
            payload: {
              sourceId,
              barIndex: destinationBar === ULTIMATE_ONE ? 0 : 1,
              destinationId
            }
          });
        }
      }
    },
    [dispatch]
  );

  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <AbilityBarContainer>
        <Divider>Ultimate</Divider>
        <SkillSlot
          skillIndex={5}
          id={`${ACTIVE_ULTIMATE}-${ultimate ? ultimate.id : "0"}`}
          index={5}
          icon={ultimate ? ultimate.icon : ""}
        />

        <Divider>Active</Divider>
        <SkillView id={ACTIVE_BAR} skillSlots={activeBarSkills} />
        <Divider>Ability Bar</Divider>

        <AbilityBar>
          <SkillView
            id={ABILITY_BAR_ONE}
            droppable
            skillSlots={abilityBarOneSkills}
          />

          <SkillSlot
            skillIndex={5}
            id={`${ULTIMATE_ONE}-${
              ultimateSkillOne ? ultimateSkillOne.id : "0"
            }`}
            droppable
            index={5}
            icon={ultimateSkillOne ? ultimateSkillOne.icon : ""}
          />
        </AbilityBar>

        <AbilityBar>
          <SkillView
            id={ABILITY_BAR_TWO}
            droppable
            skillSlots={abilityBarTwoSkills}
          />
          <SkillSlot
            skillIndex={5}
            id={`${ULTIMATE_TWO}-${
              ultimateSkillTwo ? ultimateSkillTwo.id : "0"
            }`}
            index={5}
            droppable
            icon={ultimateSkillTwo ? ultimateSkillTwo.icon : ""}
          />
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
