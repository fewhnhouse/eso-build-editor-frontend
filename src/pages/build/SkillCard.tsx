import React, { useState } from "react";
import { Card, Avatar, Divider, Typography } from "antd";
import styled from "styled-components";

import { Redirect } from "react-router";
import { chooseRace, chooseClass } from "../../util/utils";
import { ISkill } from "./SecondPage";

const StyledCard = styled(Card)`
  margin: 5px 10px 0 10px;
  width: 450px;
`;

const { Meta } = Card;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;

const RaceImage = styled.img`
  height: 18px;
  width: 18px;
`;

const MyAvatar = styled.img`
  width: 26px;
  height: 26px;
`;

const RaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
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

export default ({ skill, morph1, morph2, passive }: ICardProps) => {
  return (
    <StyledCard
      style={{ position: "relative" }}
      hoverable
      actions={
        passive
          ? []
          : [
              <RaceContainer>
                {morph1.name}
                <Image
                  title={morph1.name}
                  src={`https://beast.pathfindermediagroup.com/storage/skills/${
                    morph1.icon
                  }`}
                />
              </RaceContainer>,
              <RaceContainer>
                {morph2.name}
                <Image
                  title={morph2.name}
                  src={`https://beast.pathfindermediagroup.com/storage/skills/${
                    morph2.icon
                  }`}
                />
              </RaceContainer>
            ]
      }
    >
      <Meta
        avatar={
          <MyAvatar
            title={skill.name}
            src={`https://beast.pathfindermediagroup.com/storage/skills/${
              skill.icon
            }`}
          />
        }
        style={{ textAlign: "left" }}
        title={skill.name}
        description={skill.effect_1}
      />
    </StyledCard>
  );
};
