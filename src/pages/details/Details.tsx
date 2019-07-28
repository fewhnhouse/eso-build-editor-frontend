import React from "react";
import { RouteComponentProps } from "react-router";
import styled, { withTheme, ThemeProps } from "styled-components";
import { chooseClass } from "../../util/utils";
import { Divider, Layout, Typography } from "antd";
import GearView from "../../components/GearView";
import { bugloss, columbine, namira, drink, food } from "../../assets/deco";
import Flex from "../../components/Flex";
import { ITheme } from "../../components/globalStyles";
import SkillView from "../../components/SkillView";

const { Content } = Layout;
const { Title, Text } = Typography;

interface IDetails extends ThemeProps<ITheme>, RouteComponentProps<any> {}

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: ${props => props.theme.mainBg};
`;

const StyledTitle = styled(Title)`
  margin-top: 30px;
  text-align: center;
`;

const StyledStatLabel = styled.span`
  float: right;
  color: ${(props: { color: string }) => props.color || ""};
`;

const Wrapper = styled(Flex)`
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

const stats = [
  {
    name: "Resources",
    data: [
      { label: "Health", value: 25670 },
      { label: "Stamina", value: 21500 },
      { label: "Magicka", value: 25999 }
    ]
  },
  {
    name: "Revocery",
    data: [
      { label: "Health recovery", value: 555 },
      { label: "Stamina recovery", value: 1455 },
      { label: "Magicka recovery", value: 1000 }
    ]
  },
  {
    name: "Damage",
    data: [
      { label: "Weapon damage", value: 1234 },
      { label: "Weapon critical", value: 1234 },
      { label: "Spell damage", value: 234 },
      { label: "Spell critical", value: 2342 }
    ]
  },
  {
    name: "Resistance",
    data: [
      { label: "Physical resistance", value: 15899 },
      { label: "Spell resistance", value: 12400 },
      { label: "Critical resistance", value: 1750 }
    ]
  }
];

const statColor = (label: string, theme: ITheme) => {
  if (label.includes("Health")) {
    return theme.baseStatColors.healthRed;
  } else if (label.includes("Magicka") || label.includes("Spell")) {
    return theme.baseStatColors.magBlue;
  } else if (
    label.includes("Stamina") ||
    label.includes("Weapon") ||
    label.includes("Physical")
  ) {
    return theme.baseStatColors.stamGreen;
  } else if (label.includes("resistance")) {
    return theme.statsRes;
  } else return "";
};

const Details = ({ match, theme }: IDetails) => {
  return (
    <Container>
      <Title level={3}>
        <ClassImg
          title={match.params.name}
          src={chooseClass(match.params.name)}
        />
        {match.params.name}
      </Title>
      <Wrapper
        direction="row"
        align="baseline"
        justify="space-around"
        wrap
        fluid
      >
        <GearsView>
          <StyledTitle level={3}>Gear</StyledTitle>
          <Divider />
          <GearView setups={[]} id={0} />
        </GearsView>
        <SkillsView>
          <StyledTitle level={3}>Skills</StyledTitle>
          <Divider />
          {/*
          <SkillView skillSlots={[{index: 0, skill: undefined}, {index: 1, skill: undefined}]} id="0" />
          <SkillView skillSlots={[{index: 0, skill: undefined}, {index: 1, skill: undefined}]} id="1" />
          */}
          <Divider />
          <Title level={3}>Mundus</Title>
          <Title level={4}>Atronach</Title>
          <Divider />
          <Title level={3}>Consumables</Title>
          <Title level={4}>Foodbuff</Title>
          <ClassImg src={food} /> <ClassImg src={drink} />
          <Title level={4}>Potions</Title>
          <ClassImg src={columbine} /> <ClassImg src={bugloss} />
          <ClassImg src={namira} />
        </SkillsView>
        <StatsView>
          <StyledTitle level={3}>Stats</StyledTitle>
          <Divider />
          {stats.map(stat => (
            <>
              {stat.data.map(stat => (
                <>
                  <Title level={4}>
                    {stat.label}
                    <StyledStatLabel color={statColor(stat.label, theme)}>
                      {stat.value}
                    </StyledStatLabel>
                  </Title>
                </>
              ))}
              <Divider />
            </>
          ))}
        </StatsView>
      </Wrapper>
    </Container>
  );
};

export default withTheme(Details);
