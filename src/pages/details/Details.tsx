import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled, { withTheme, ThemeProps } from "styled-components";
import { chooseClass } from "../../util/utils";
import { Divider, Layout, Typography } from "antd";
import GearView from "../../components/GearView";
import { food, immoPot, triPot } from "../../assets/deco";
import Flex from "../../components/Flex";
import { ITheme } from "../../components/globalStyles";
import SkillView from "../../components/SkillView";
import {
  IBuildState,
  Slot,
  defaultBuildState
} from "../build/BuildStateContext";
import { ABILITY_BAR_ONE, ABILITY_BAR_TWO } from "../build/Skills/AbilityBar";

const { Content } = Layout;
const { Title } = Typography;

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
  const buildState = localStorage.getItem("buildState");
  const parsedBuildState: IBuildState = buildState
    ? JSON.parse(buildState)
    : defaultBuildState;

  const {
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
    mundus,
    buff
  } = parsedBuildState;

  const selectedSetup = [
    {
      id: "bigpieces",
      label: "Big Pieces",
      data: bigPieceSelection || []
    },
    {
      id: "smallpieces",
      label: "Small Pieces",
      data: smallPieceSelection || []
    },
    { id: "jewelry", label: "Jewelry", data: jewelrySelection || [] },
    {
      id: "frontbar",
      label: "Frontbar",
      data: frontbarSelection || []
    },
    { id: "backbar", label: "Backbar", data: backbarSelection || [] }
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
      <Wrapper
        direction="row"
        align="baseline"
        justify="space-around"
        wrap
        fluid
      >
        <GearView disabled setups={selectedSetup} />
        <SkillsView>
          <StyledTitle level={3}>Skills</StyledTitle>
          <Divider />
          <SkillView
            id={ABILITY_BAR_ONE}
            disabled={true}
            skillSlots={parsedBuildState.newBarOne}
          />
          <SkillView
            id={ABILITY_BAR_TWO}
            disabled={true}
            skillSlots={parsedBuildState.newBarTwo}
          />
          <Divider />
          <Title level={3}>Mundus</Title>
          <Title level={4}>{mundus.name}: {mundus.effect} by {mundus.value}.</Title>
          <Divider />
          <Title level={3}>Consumables</Title>
          <Title level={4}>{buff.name}: <br /> {buff.buffDescription} </Title> <br />
          <ClassImg src={immoPot} /> <ClassImg src={triPot} />
        </SkillsView>
        <StatsView>
          <StyledTitle level={3}>Stats</StyledTitle>
          <Divider />
          {stats.map((stat, index) => (
            <div key={index}>
              {stat.data.map((innerStats, innerIndex) => (
                <div key={innerIndex}>
                  <Title level={4}>
                    {innerStats.label}
                    <StyledStatLabel color={statColor(innerStats.label, theme)}>
                      {innerStats.value}
                    </StyledStatLabel>
                  </Title>
                </div>
              ))}
              <Divider />
            </div>
          ))}
        </StatsView>
      </Wrapper>
    </Container>
  );
};

export default withTheme(withRouter(Details));
