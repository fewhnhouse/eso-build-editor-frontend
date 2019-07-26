import React, { useState, useContext } from "react";
import { Card, Avatar, Divider, Typography, Popover } from "antd";
import styled from "styled-components";

import { ISkill } from "./SecondPage";
import { plus } from "../../assets/misc";
import { BuildContext } from "./BuildStateContext";

const StyledCard = styled(Card)`
  margin: 5px 10px 0 10px;
  width: 450px;
`;

const { Meta } = Card;

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
}
const abilityTypes = [
  { type: 1, label: "active" },
  { type: 2, label: "passive" },
  { type: 3, label: "ultimate" }
];
export default ({ skill, morph1, morph2, passive }: ICardProps) => {
  const [firstActive, setFirstActive] = useState(false);
  const [secondActive, setSecondActive] = useState(false);
  const handleFirstClick = () => {
    if (firstActive) {
      setFirstActive(false);
    } else if (!secondActive) {
      setFirstActive(true);
    } else {
      setFirstActive(true);
      setSecondActive(false);
    }
  };

  const handleSecondClick = () => {
    if (secondActive) {
      setSecondActive(false);
    } else if (!firstActive) {
      setSecondActive(true);
    } else {
      setFirstActive(false);
      setSecondActive(true);
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
