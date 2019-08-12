import React from "react";
import styled from "styled-components";
import Flex from "../../components/Flex";
import { Typography, Layout, Divider } from "antd";
import { chooseClass } from "../../util/utils";
import GearView from "../../components/GearView";
import SkillView from "../../components/SkillView";
import { ABILITY_BAR_ONE, ABILITY_BAR_TWO } from "../build/Skills/AbilityBar";
import { IBuildState } from "../build/BuildStateContext";

const { Content } = Layout;
const { Title, Text } = Typography;

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
  margin-bottom: 5px !important;
`;
const Wrapper = styled(Flex)``;
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
`;
const LeftSide = styled.div`
  max-width: 500px;
`;
const SkillsView = styled.div`
  margin-bottom: 10px;
`;
const MiscView = styled.div`
  max-width: 500px;
`;
const ClassImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

interface IDetailViewProps {
    loadedData: IBuildState
}

const BuildReviewDetails = ({loadedData}: IDetailViewProps) => {

    const {
        name,
        bigPieceSelection,
        smallPieceSelection,
        frontbarSelection,
        backbarSelection,
        jewelrySelection,
        mundus,
        buff,
        esoClass,
        race,
        mainResource,
        applicationArea,
        role,
        description,
        newBarOne,
        newBarTwo
      } = loadedData;

    const selectedSetup = [
      {
        id: 'bigpieces',
        label: 'Big Pieces',
        data: bigPieceSelection || [],
      },
      {
        id: 'smallpieces',
        label: 'Small Pieces',
        data: smallPieceSelection || [],
      },
      { id: 'jewelry', label: 'Jewelry', data: jewelrySelection || [] },
      {
        id: 'frontbar',
        label: 'Frontbar',
        data: frontbarSelection || [],
      },
      { id: 'backbar', label: 'Backbar', data: backbarSelection || [] },
    ];
  
    return (
      <Container>
        <Title level={1}>
          <ClassImg
            title={esoClass ? esoClass : "Class undefined"}
            src={chooseClass(esoClass ? esoClass : "")}
          />
          {name ? name : "Name undefined"}<br />
          {esoClass ? esoClass : "Class undefined"}
        </Title>
        <Title level={4}>
          {race ? race : ""} {applicationArea? applicationArea : ""} <br />
          {mainResource ? mainResource : ""} {role ? role : ""} <br/>
          {description ? description : ""}
        </Title>
        <Wrapper
          direction="row"
          align="flex-start"
          justify="space-evenly"
          wrap
          fluid
        >
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
                skillSlots={newBarOne}
              />
              <SkillView
                id={ABILITY_BAR_TWO}
                disabled={true}
                skillSlots={newBarTwo}
              />
            </SkillsView>
            <Divider />
            <MiscView>
              <StyledTitle level={4}>Mundus</StyledTitle>
                {mundus ? 
                <>
                    <Flex direction="row" justify="center" align="center">
                    <ClassImg src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones${mundus.icon}`} />
                    <Text strong>{mundus.name}</Text>
                    <br />
                    </Flex>
                    <Text>
                    {mundus.effect} by {mundus.value}.
                    </Text>
                    <Divider />
                    <StyledTitle level={4}>Consumables</StyledTitle>
                </>
                : "Mundus undefined."} <br />
                {buff ? 
                    <>
                        <ClassImg src={`${process.env.REACT_APP_IMAGE_SERVICE}/${buff.type}s/${buff.icon}`} />
                        <Text strong>
                            {buff.name} ({buff.type})
                        </Text>
                        <br />
                        <Text>
                            {buff.buffDescription}
                        </Text>
                    </>
                : "Buff undefined." }
            </MiscView>
          </RightSide>
        </Wrapper>
      </Container>
    )
}

export default BuildReviewDetails;