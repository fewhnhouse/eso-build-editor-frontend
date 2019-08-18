import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Typography, Divider, Card } from 'antd'
import GearView from '../../../components/GearView'
import SkillView from '../../../components/SkillView'
import { ABILITY_BAR_ONE, ABILITY_BAR_TWO } from '../Skills/AbilityBar'
import { IBuildState } from '../BuildStateContext'
import { classes, races } from '../RaceAndClass/data'

const { Title, Text } = Typography

const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.05);
`
const ClassImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 4px;
`

const StyledTitle = styled(Title)`
  margin-bottom: 5px !important;
`
const Wrapper = styled(Flex)`
  height: 100%;
  padding: 20px;
`
const BuildInformation = styled(Card)`
  margin: 20px;
  height: calc(100% - 40px);
  min-width: 400px;
  flex: 1;
  max-width: 700px;
  overflow-y: auto;
`
const GeneralInformation = styled(Card)`
  margin: 20px;
  height: calc(100% - 40px);
  min-width: 400px;
  flex: 1;
  max-width: 700px;
  overflow-y: auto;
`
const SkillsView = styled.div`
  margin-bottom: 10px;
  width: 100%;
`
const MiscView = styled(Flex)`
  margin-bottom: 10px;
`

interface IDetailViewProps {
  loadedData: IBuildState
}

const BuildReviewDetails = ({ loadedData }: IDetailViewProps) => {
  const {
    name,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
    mundusStone,
    buff,
    esoClass,
    race,
    // mainResource,
    // applicationArea,
    // role,
    // description,
    newBarOne,
    newBarTwo,
    ultimateOne,
    ultimateTwo
  } = loadedData
  const selectedSetup = [
    {
      id: 'bigpieces',
      label: 'Big Pieces',
      data: bigPieceSelection || []
    },
    {
      id: 'smallpieces',
      label: 'Small Pieces',
      data: smallPieceSelection || []
    },
    { id: 'jewelry', label: 'Jewelry', data: jewelrySelection || [] },
    {
      id: 'frontbar',
      label: 'Frontbar',
      data: frontbarSelection || []
    },
    { id: 'backbar', label: 'Backbar', data: backbarSelection || [] }
  ]
  const raceData = races.find(rc => rc.title === race)
  const classData = classes.find(esoC => esoC.title === esoClass)
  return (
    <Wrapper
      direction='row'
      align='flex-start'
      justify='space-evenly'
      wrap
      fluid
    >
      <GeneralInformation title={<Title level={2}>General Information</Title>}>
        <Title level={3}>{name}</Title>
        <Divider>Race</Divider>
        <MiscView direction='row' justify='flex-start'>
          <MyAvatar
            src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${race}.png`}
          />
          <Text strong>{race}</Text>
        </MiscView>
        <Text>{raceData ? raceData.description : ''}</Text>
        <Divider>Class</Divider>
        <MiscView direction='row' justify='flex-start'>
          <MyAvatar
            src={`${
              process.env.REACT_APP_IMAGE_SERVICE
            }/classes/${esoClass}.png`}
          />
          <Text strong>{esoClass}</Text>
        </MiscView>
        <Text>{classData ? classData.description : ''}</Text>
        {mundusStone && (
          <>
            <Divider>Mundus Stone</Divider>
            <MiscView direction='row' justify='flex-start' align='center'>
              <ClassImg
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${
                  mundusStone.icon
                }`}
              />
              <Text strong>{mundusStone.name}</Text>
            </MiscView>
            <Text>
              {mundusStone.effect} by {mundusStone.value}.
            </Text>
          </>
        )}
        {buff && (
          <>
            <Divider>Buff</Divider>
            <MiscView direction='row' justify='flex-start' align='center'>
              <MyAvatar
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${
                  buff.icon
                }`}
              />
              <Text strong>
                {buff.name} {buff.type}
              </Text>
            </MiscView>
            <Text>{buff.buffDescription}</Text>
          </>
        )}
      </GeneralInformation>
      <BuildInformation title={<Title level={2}>Build Information</Title>}>
        <SkillsView>
          <StyledTitle level={4}>Skills</StyledTitle>
          <SkillView
            id={ABILITY_BAR_ONE}
            disabled
            skillSlots={newBarOne}
            ultimate={ultimateOne}
          />
          <SkillView
            id={ABILITY_BAR_TWO}
            disabled
            skillSlots={newBarTwo}
            ultimate={ultimateTwo}
          />
        </SkillsView>
        <Divider />
        <GearView disabled setups={selectedSetup} />
      </BuildInformation>
    </Wrapper>
  )
}

export default BuildReviewDetails
