import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { chooseRace, chooseClass } from "../../util/utils";
import { Divider, Tooltip, Popover } from "antd";
import { head, chest, legs, hands, belt, feet, shoulders, mainHand, offHand, quickslot, ring, neck } from "../../assets/gear";
import { abilityFrame } from "../../assets/misc";
import { bugloss, columbine, drink, food, namira } from "../../assets/deco";
import { leather } from "../../assets/backgrounds/";

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
  height: 100vw;
  background-image: url(${leather});
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
          <Popover placement="top" title="OP DLC set"
            content="I'm a super op set with no equivalent in the game."
          >
            <GearImg src={head} /><br />
          </Popover>
          <Popover placement="left" title="OP DLC set"
            content="Deals 15 000 obvilion damage over 2 seconds."
          >
            <GearImg src={shoulders} />
          </Popover>
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
            <img src={abilityFrame} />
            <img src={abilityFrame} />
            <img src={abilityFrame} />
            <img src={abilityFrame} />
            <img src={abilityFrame} /><br />
            <img src={abilityFrame} />
            <img src={abilityFrame} />
            <img src={abilityFrame} />
            <img src={abilityFrame} />
            <img src={abilityFrame} />
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
