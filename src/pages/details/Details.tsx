import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled, { withTheme, ThemeProps } from "styled-components";
import { chooseClass } from "../../util/utils";
import { Divider, Layout, Typography } from "antd";
import GearView from "../../components/GearView";
import { immoPot, triPot } from "../../assets/deco";
import Flex from "../../components/Flex";
import { ITheme } from "../../components/globalStyles";
import SkillView from "../../components/SkillView";
import {
  IBuildState,
  defaultBuildState
} from "../build/BuildStateContext";
import { ABILITY_BAR_ONE, ABILITY_BAR_TWO } from "../build/Skills/AbilityBar";

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
`
const StyledTitle = styled(Title)`
  margin-bottom: 5px !important;
`
const Wrapper = styled(Flex)`
`
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
`
const LeftSide = styled.div`
  max-width: 500px;
`
const SkillsView = styled.div`
  margin-bottom: 10px;
`
const MiscView = styled.div`
  max-width: 500px;
`
const ClassImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`

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

  const splitDesc = (desc: string) => {
    const newDesc = desc.split(".", 2).map(item => {
      return <span>{item}.<br/></span>
    })
    return (newDesc)
  }

  return (
    <Container>
      <Title level={1}>
        <ClassImg
          title={parsedBuildState.class}
          src={chooseClass(parsedBuildState.class)}
        />
        {parsedBuildState.class}
      </Title>
      <Wrapper direction="row" align="flex-start" justify="space-evenly" wrap fluid>
        <LeftSide>
          <Divider />
          <GearView disabled setups={selectedSetup} />
        </LeftSide>
        <RightSide>
        <Divider />
          <SkillsView>
            <StyledTitle level={4}>Skills</StyledTitle>
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
          </SkillsView>
          <Divider />
          <MiscView>
            <StyledTitle level={4}>Mundus</StyledTitle>
            <Flex direction="row" justify="center" align="center">
              <ClassImg src={mundus.icon} />
              <Text strong>{mundus.name}</Text><br />
            </Flex>
            <Text> {mundus.effect} by {mundus.value}.</Text>
            <Divider />
            <StyledTitle level={4}>Consumables</StyledTitle>
            <ClassImg src={buff.icon} /><Text strong>{buff.name}{buff.type ? `, `+buff.type : ""}</Text> <br />
            <Text>{splitDesc(buff.buffDescription)}</Text>
          </MiscView>
        </RightSide>
      </Wrapper>
    </Container>
  );
};

export default withTheme(withRouter(Details));

/*
const StatsView = styled.div`
  text-align: left;
`;

const StyledStatLabel = styled.span`
  float: right;
  color: ${(props: { color: string }) => props.color || ""};
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

*/