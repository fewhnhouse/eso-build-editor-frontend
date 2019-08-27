import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Typography, Divider, Card } from 'antd'
import GearView from '../../../components/GearView'
import SkillView from '../../../components/SkillView'
import { ABILITY_BAR_ONE, ABILITY_BAR_TWO } from '../Skills/AbilityBar'
import { IBuildState } from '../BuildStateContext'
import { classes, races } from '../RaceAndClass/data'
import InformationCard from '../../../components/InformationCard'
import { applicationAreas } from '../RaceAndClass/RaceClass'

const { Title, Text } = Typography

const ResourceCard = styled.div`
  display: flex;
  width: 100px
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  padding: 10px;
  flex-direction: column;
  margin: 0px 5px;
`

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
  flex: 2;
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
  local?: boolean
}

const BuildReviewDetails = ({ loadedData, local }: IDetailViewProps) => {
  const {
    name,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
    mundusStone,
    buff,
    stamina,
    health,
    magicka,
    esoClass,
    race,
    newBarOne,
    published,
    newBarTwo,
    ultimateOne,
    ultimateTwo,
    description,
    applicationArea,
  } = loadedData
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
  ]
  const raceData = races.find(rc => rc.title === race)
  const classData = classes.find(esoC => esoC.title === esoClass)

  const setsCount = selectedSetup
    .map(setup => {
      return setup.data
    })
    .flat()
    .map(setSelection =>
      setSelection.selectedSet ? setSelection.selectedSet.name : ''
    )
    .reduce<Map<string, number>>(
      (acc, curr) => acc.set(curr, 1 + (acc.get(curr) || 0)),
      new Map()
    )
  const area = applicationAreas.find(area => area.key === applicationArea)

  return (
    <Flex style={{ padding: 20 }} fluid>
      <Flex>
        <Typography.Title>{name}</Typography.Title>
        {local && (
          <Flex direction='row'>
            <InformationCard
              icon='edit'
              title='Description'
              description={description}
            />
            <Divider
              type='vertical'
              style={{ height: 50, margin: '0px 20px' }}
            />
            <InformationCard
              icon='environment'
              title='Application Area'
              description={area ? area.label : ''}
            />
            <Divider
              type='vertical'
              style={{ height: 50, margin: '0px 20px' }}
            />
            <InformationCard
              icon={published ? 'unlock' : 'lock'}
              title='Access Rights'
              description={published ? 'Public' : 'Private'}
            />
          </Flex>
        )}
      </Flex>
      <Wrapper
        direction='row'
        align='flex-start'
        justify='space-evenly'
        wrap
        fluid
      >
        <GeneralInformation
          title={<Title level={2}>General Information</Title>}
        >
          <Divider>Race</Divider>
          <MiscView direction='row' justify='space-around'>
            <ResourceCard>
              <Typography.Text strong>Stamina</Typography.Text>
              <Typography.Title style={{ margin: 5 }} level={4}>
                {stamina}
              </Typography.Title>
            </ResourceCard>
            <ResourceCard>
              <Typography.Text strong>Health</Typography.Text>
              <Typography.Title style={{ margin: 5 }} level={4}>
                {health}
              </Typography.Title>
            </ResourceCard>
            <ResourceCard>
              <Typography.Text strong>Magicka</Typography.Text>
              <Typography.Title style={{ margin: 5 }} level={4}>
                {magicka}
              </Typography.Title>
            </ResourceCard>
          </MiscView>
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
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${esoClass}.png`}
            />
            <Text strong>{esoClass}</Text>
          </MiscView>
          <Text>{classData ? classData.description : ''}</Text>
          {mundusStone && (
            <>
              <Divider>Mundus Stone</Divider>
              <MiscView direction='row' justify='flex-start' align='center'>
                <ClassImg
                  src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${mundusStone.icon}`}
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
                  src={`${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${buff.icon}`}
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
              size='small'
              id={ABILITY_BAR_ONE}
              disabled
              skillSlots={newBarOne}
              ultimate={ultimateOne}
            />
            <SkillView
              size='small'
              id={ABILITY_BAR_TWO}
              disabled
              skillSlots={newBarTwo}
              ultimate={ultimateTwo}
            />
          </SkillsView>
          <Divider />
          <GearView disabled setups={selectedSetup} setsCount={setsCount} />
        </BuildInformation>
      </Wrapper>
    </Flex>
  )
}

export default BuildReviewDetails
