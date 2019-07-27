import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { chooseRace, chooseClass } from "../../util/utils";
import { Divider } from "antd";
import SkillView from "../../components/SkillView";
import GearView from "../../components/GearView";
import { bugloss, columbine, namira, drink, food } from "../../assets/deco";

const RoleTitle = styled.h2`
  font-size: 3em;
`;

const SubTitle = styled.h3`
  font-size: 2em;
`;

const MiniTitle = styled.h4`
  font-size: 1em;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const StatsView = styled.div`
  text-align: left;
`;

const SkillsView = styled.div`
`

const ClassImg = styled.img`
  width: 35px;
  height: 35px;
`;

const GearImg = styled.img`
  width: 50px;
  height: 50px;
`;

export default ({ match }: RouteComponentProps<any>) => {
  return (
    <>
      <RoleTitle>
        <ClassImg
          title={match.params.name}
          src={chooseClass(match.params.name)}
        />
        {match.params.name}
      </RoleTitle>
      <Wrapper>
          <SubTitle>Gear</SubTitle>
          <GearView />
        <SkillsView>
          <SubTitle>Skills</SubTitle>
            <SkillView tooltip="top"/>
            <SkillView tooltip="bottom"/>
          <Divider />
          <SubTitle>Consumables</SubTitle>
          <MiniTitle>Foodbuff</MiniTitle>
          <ClassImg src={food} /> <ClassImg src={drink} /> 
          <MiniTitle>Potions</MiniTitle>
          <ClassImg src={columbine} /> <ClassImg src={bugloss} /> <ClassImg src={namira} /> 
        </SkillsView>
        <StatsView>
          <SubTitle>Stats</SubTitle>
          <MiniTitle>Health</MiniTitle>
          <MiniTitle>Stamina</MiniTitle>
          <MiniTitle>Magicka</MiniTitle>
          <Divider />
          <MiniTitle>Health recovery</MiniTitle>
          <MiniTitle>Stamina recovery</MiniTitle>
          <MiniTitle>Magicka recovery</MiniTitle>
          <Divider />
          <MiniTitle>Weapon damage</MiniTitle>
          <MiniTitle>Weapon critical</MiniTitle>
          <MiniTitle>Spell damage</MiniTitle>
          <MiniTitle>Spell critical</MiniTitle>
          <Divider />
          <MiniTitle>Physical resistance</MiniTitle>
          <MiniTitle>Spell resistance</MiniTitle>
          <MiniTitle>Critical resistance</MiniTitle>
          <MiniTitle>Toggle CP</MiniTitle>
        </StatsView>
      </Wrapper>
    </>
  );
};
