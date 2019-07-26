import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { chooseRace, chooseClass } from "../../util/utils";
import { Divider, Tooltip } from "antd";
import { head, chest, legs, hands, belt, feet, shoulders, mainHand, offHand, quickslot, ring, neck } from "../../assets/gear";

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

const GearView = styled.div`
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
        <GearView>
          <SubTitle>Gear</SubTitle>
          <MiniTitle>Apparel</MiniTitle>
          <Tooltip title=
            "Super OP DLC monster set helmet"
          >
            <GearImg src={head} /><br />
          </Tooltip>
          <Tooltip title=
            "Super OP DLC monster set shoulder"
          placement="left">
            <GearImg src={shoulders} />
          </Tooltip>
          <GearImg src={chest} /><br />
          <GearImg src={belt} />
          <GearImg src={hands} /><br />
          <GearImg src={legs} />
          <GearImg src={feet} />
          <MiniTitle>Accessories</MiniTitle>
          <GearImg src={neck} />
          <GearImg src={ring} />
          <GearImg src={ring} />
          <MiniTitle>Weapons</MiniTitle>
          <GearImg src={mainHand} />
          <GearImg src={offHand} /><br />
          <GearImg src={mainHand} />
          <GearImg src={offHand} />
        </GearView>
        <SkillsView>
          <SubTitle>Skills</SubTitle>
          1 2 3 4 5
          <Divider />
          <SubTitle>Consumables</SubTitle>
          <MiniTitle>Foodbuff</MiniTitle>
          <MiniTitle>Potions</MiniTitle>
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
