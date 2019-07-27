import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { chooseRace, chooseClass } from "../../util/utils";
import { Divider, Layout, Typography } from "antd";
import SkillView from "../../components/SkillView";
import GearView from "../../components/GearView";
import { bugloss, columbine, namira, drink, food } from "../../assets/deco";
import Flex from "../../components/Flex";

const { Footer, Content } = Layout;

const { Title, Text } = Typography;

const StyledTitle = styled(Title)`
  margin-top: 30px;
  text-align: center;
`;

const Wrapper = styled(Flex)`
  flex-wrap: wrap;
  text-align: center;
`;

const StatsView = styled.div`
  text-align: left;
`;

const SkillsView = styled.div``;
const GearsView = styled.div``;

const ClassImg = styled.img`
  width: 35px;
  height: 35px;
`;

const GearImg = styled.img`
  width: 50px;
  height: 50px;
`;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: rgb(155, 155, 155);
`;

export default ({ match }: RouteComponentProps<any>) => {
  const stats = [
    {
      name: "Resources",
      data: [
        { label: "Health", value: 0 },
        { label: "Stamina", value: 0 },
        { label: "Magicka", value: 0 }
      ]
    },
    {
      name: "Revocery",
      data: [
        { label: "Health recovery", value: 0 },
        { label: "Stamina recovery", value: 0 },
        { label: "Magicka recovery", value: 0 }
      ]
    },
    {
      name: "Damage",
      data: [
        { label: "Weapon damage", value: 0 },
        { label: "Weapon critical", value: 0 },
        { label: "Spell damage", value: 0 },
        { label: "Spell critical", value: 0 }
      ]
    },
    {
      name: "Resistance",
      data: [
        { label: "Physical resistance", value: 0 },
        { label: "Spell resistance", value: 0 },
        { label: "Critical resistance", value: 0 }
      ]
    }
  ];

  return (
    <Container>
      <Title level={3}>
        <ClassImg
          title={match.params.name}
          src={chooseClass(match.params.name)}
        />
        {match.params.name}
      </Title>
      <Wrapper direction="row" align="baseline" justify="space-around" fluid>
        <GearsView>
          <StyledTitle level={3}>Gear</StyledTitle>
          <Divider />
          <GearView />
        </GearsView>
        <SkillsView>
          <StyledTitle level={3}>Skills</StyledTitle>
          <Divider />
{/*
          <SkillView id="1" skillSlots={} tooltip="top" />
          <SkillView id="2" skillSlots={} tooltip="bottom" />
*/}
          <Divider />
          <Title level={3}>Mundus</Title>
          <Title level={4}>Atronach</Title>
          <Divider />
          <Title level={3}>Consumables</Title>
          <Title level={4}>Foodbuff</Title>
          <ClassImg src={food} /> <ClassImg src={drink} />
          <Title level={4}>Potions</Title>
          <ClassImg src={columbine} /> <ClassImg src={bugloss} />{" "}
          <ClassImg src={namira} />
        </SkillsView>
        <StatsView>
          <StyledTitle level={3}>Stats</StyledTitle>
          <Divider />
          {stats.map(stat => (
            <>
              {stat.data.map(stat => (
                <Title level={4}>{stat.label}</Title>
              ))}
              <Divider />
            </>
          ))}
        </StatsView>
      </Wrapper>
    </Container>
  );
};
