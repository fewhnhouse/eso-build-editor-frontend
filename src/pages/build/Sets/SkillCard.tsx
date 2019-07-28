import React, { useContext } from "react";
import { Card, Divider, Popover } from "antd";
import styled from "styled-components";

import { ISkill } from "./SecondPage";
import { BuildContext } from "../BuildStateContext";

const StyledCard = styled(Card)`
  margin: 5px 10px 0 10px;
  width: 450px;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: ${(props: { active: boolean }) =>
    props.active ? "2px solid #1890ff" : "none"};
  filter: ${(props: { active: boolean }) =>
    props.active ? "" : "grayscale()"};
`;

const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
`;

const AvatarContainer = styled.div`
  padding-right: 16px;
`;

const RaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? "#2ecc71" : "rgba(0, 0, 0, 0.45)"};
  text-align: left;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const CostSpan = styled.span`
  font-weight: 400;
  color: ${(props: { type: string }) =>
    props.type === "Ultimate"
      ? "#8e44ad"
      : props.type === "Magicka"
      ? "#2980b9"
      : props.type === "Stamina"
      ? "#27ae60"
      : "#4b6584"};
`;

const MorphLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  max-width: 140px;
  color: ${(props: { active: boolean; disabled: boolean }) =>
    props.active ? "#1890ff" : props.disabled ? "" : "rgba(0,0,0,0.85)"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface IClass {
  class: string;
  description: string;
  race: string;
}
interface ICardProps {
  skill: ISkill;
  morph1: ISkill;
  morph2: ISkill;
  passive?: boolean;
  ultimate?: boolean;
}

export default ({ skill, morph1, morph2, passive, ultimate }: ICardProps) => {
  const [state, dispatch] = useContext(BuildContext);
  const { selectedSkills, selectedUltimate } = state!;
  const firstActive = ultimate
    ? selectedUltimate === morph1.id
    : selectedSkills.find(slot => slot.id === morph1.id) !== undefined;
  const secondActive = ultimate
    ? selectedUltimate === morph2.id
    : selectedSkills.find(slot => slot.id === morph2.id) !== undefined;
  const handleFirstClick = () => {
    if (ultimate) {
      dispatch!({
        type: "SET_SELECTED_ULTIMATE",
        payload: firstActive ? skill.id : morph1.id
      });
    } else {
      if (firstActive) {
        dispatch!({
          type: "UNSELECT_MORPH",
          payload: { baseId: skill.id, morphId: morph1.id }
        });
      } else if (!secondActive) {
        dispatch!({
          type: "SELECT_MORPH",
          payload: { baseId: skill.id, morphId: morph1.id }
        });
      } else {
        dispatch!({
          type: "SWAP_MORPH",
          payload: { oldMorphId: morph2.id, newMorphId: morph1.id }
        });
      }
    }
  };

  const handleSecondClick = () => {
    if (ultimate) {
      dispatch!({
        type: "SET_SELECTED_ULTIMATE",
        payload: secondActive ? skill.id : morph2.id
      });
    } else {
      if (secondActive) {
        dispatch!({
          type: "UNSELECT_MORPH",
          payload: { baseId: skill.id, morphId: morph2.id }
        });
      } else if (!firstActive) {
        dispatch!({
          type: "SELECT_MORPH",
          payload: { baseId: skill.id, morphId: morph2.id }
        });
      } else {
        dispatch!({
          type: "SWAP_MORPH",
          payload: { oldMorphId: morph1.id, newMorphId: morph2.id }
        });
      }
    }
  };
  return (
    <StyledCard
      style={{ position: "relative" }}
      hoverable
      actions={
        passive
          ? []
          : [
              <Popover content={<CardContent skill={morph1} />}>
                <RaceContainer onClick={handleFirstClick}>
                  <MorphLabel active={firstActive} disabled={secondActive}>
                    {morph1.name}
                  </MorphLabel>
                  <Image
                    active={firstActive}
                    title={morph1.name}
                    src={`https://beast.pathfindermediagroup.com/storage/skills/${
                      morph1.icon
                    }`}
                  />
                </RaceContainer>
              </Popover>,
              <Popover content={<CardContent skill={morph2} />}>
                <RaceContainer onClick={handleSecondClick}>
                  <MorphLabel active={secondActive} disabled={firstActive}>
                    {morph2.name}
                  </MorphLabel>
                  <Image
                    active={secondActive}
                    title={morph2.name}
                    src={`https://beast.pathfindermediagroup.com/storage/skills/${
                      morph2.icon
                    }`}
                  />
                </RaceContainer>
              </Popover>
            ]
      }
    >
      <CardContent skill={skill} />
    </StyledCard>
  );
};

const CardContent = ({ skill }: { skill: ISkill }) => {
  const isMagicka = skill.cost.includes("Magicka");
  const isStamina = skill.cost.includes("Magicka");
  const isFree = skill.cost.includes("Nothing");
  return (
    <div style={{ display: "flex", maxWidth: 400 }}>
      <AvatarContainer>
        <MyAvatar
          title={skill.name}
          src={`https://beast.pathfindermediagroup.com/storage/skills/${
            skill.icon
          }`}
        />
      </AvatarContainer>
      <div>
        <Title>{skill.name}</Title>
        {skill.type !== 2 && (
          <Description>
            <CostSpan
              type={
                skill.type === 3
                  ? "Ultimate"
                  : isMagicka
                  ? "Magicka"
                  : isStamina
                  ? "Stamina"
                  : "Free"
              }
            >
              {isFree ? "Free" : skill.cost}
            </CostSpan>
            {` | ${skill.range ? skill.range : skill.target}`}
          </Description>
        )}
        <Divider style={{ margin: "5px 0px" }} />
        <Description>{skill.effect_1}</Description>
        {skill.effect_2 && (
          <>
            <Divider style={{ margin: "5px 0px" }} />
            <Description newEffect>New Effect: {skill.effect_2}</Description>
          </>
        )}
      </div>
    </div>
  );
};
