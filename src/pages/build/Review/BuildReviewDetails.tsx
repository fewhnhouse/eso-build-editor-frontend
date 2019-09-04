import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Typography, Divider, Card, message } from 'antd'
import { useSubscription } from 'react-apollo'
import GearView from '../../../components/GearView'
import SkillView from '../../../components/SkillView'
import { ABILITY_BAR_ONE, ABILITY_BAR_TWO } from '../Skills/AbilityBar'
import { IBuildState } from '../BuildStateContext'
import { classes, races } from '../RaceAndClass/data'
import InformationCard from '../../../components/InformationCard'
import { applicationAreas } from '../RaceAndClass/RaceClass'
import gql from 'graphql-tag'
import { useMediaQuery } from 'react-responsive'
import Scrollbars from 'react-custom-scrollbars'

const { Title, Text } = Typography

const ResourceCard = styled.div`
  display: flex;
  width: 100px;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  padding: 10px;
  flex-direction: column;
  margin: 0px 5px;
`

const Icon = styled.img`
  width: ${props => props.theme.icon.width};
  height: ${props => props.theme.icon.height};
  margin-right: 10px;
  border: ${props => props.theme.icon.border};
  border-radius: ${props => props.theme.icon.borderRadius};
`

const StyledTitle = styled(Typography.Title)`
  margin: ${props => props.theme.margins.mini};
`

const Wrapper = styled(Flex)`
  height: calc(100% - 60px);
`
const BuildInformation = styled(Card)`
  margin: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '20px'};
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '' : 'calc(100% - 40px)'};
  min-width: ${props => props.theme.widths.medium};
  flex: 2;
  overflow-y: auto;
`
const GeneralInformation = styled(Card)`
  margin: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '20px'};
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '' : 'calc(100% - 40px)'};
  min-width: ${props => props.theme.widths.medium};
  flex: 1;
  max-width: 700px;
  overflow-y: auto;
`
const SkillsView = styled.div`
  margin-bottom: ${props => props.theme.margins.small};
  width: 100%;
`
const MiscView = styled(Flex)`
  margin-bottom: ${props => props.theme.margins.small};
`

interface IDetailViewProps {
  loadedData: IBuildState
  local?: boolean
}

const BUILD_UPDATE_SUBSCRIPTION = gql`
  subscription buildUpdateSubscription($id: ID!) {
    buildUpdateSubscription(id: $id) {
      node {
        id
        owner {
          name
        }
        name
      }
      updatedFields
    }
  }
`

const BuildReviewDetails = ({ loadedData, local }: IDetailViewProps) => {
  const {
    id,
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
  const isMobile = useMediaQuery({ maxWidth: 800 })

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

  const { data } = useSubscription(BUILD_UPDATE_SUBSCRIPTION, {
    variables: { id },
  })

  if (data && data.buildUpdateSubscription) {
    message.info(
      'This build has been updated. Refresh to see the latest changes'
    )
  }

  return (
    <Scrollbars autoHide disabled={!isMobile}>
      <Flex
        style={{ padding: isMobile ? 0 : 20 }}
        fluid
        direction='column'
        align='center'
      >
        <Flex direction='column' align='center'>
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
            isMobile={isMobile}
            title={<Title level={2}>General Information</Title>}
          >
            <Divider>Attributes</Divider>
            <MiscView direction='row' justify='space-around'>
              <ResourceCard>
                <Typography.Text strong>Stamina</Typography.Text>
                <StyledTitle level={4}>{stamina}</StyledTitle>
              </ResourceCard>
              <ResourceCard>
                <Typography.Text strong>Health</Typography.Text>
                <StyledTitle level={4}>{health}</StyledTitle>
              </ResourceCard>
              <ResourceCard>
                <Typography.Text strong>Magicka</Typography.Text>
                <StyledTitle level={4}>{magicka}</StyledTitle>
              </ResourceCard>
            </MiscView>
            <Divider>Race</Divider>
            <MiscView direction='row' justify='flex-start'>
              <Icon
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${race}.png`}
              />
              <Text strong>{race}</Text>
            </MiscView>
            <Text>{raceData ? raceData.description : ''}</Text>
            <Divider>Class</Divider>
            <MiscView direction='row' justify='flex-start'>
              <Icon
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${esoClass}.png`}
              />
              <Text strong>{esoClass}</Text>
            </MiscView>
            <Text>{classData ? classData.description : ''}</Text>
            {mundusStone && (
              <>
                <Divider>Mundus Stone</Divider>
                <MiscView direction='row' justify='flex-start' align='center'>
                  <Icon
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
                  <Icon
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
          <BuildInformation
            isMobile={isMobile}
            title={<Title level={2}>Build Information</Title>}
          >
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
    </Scrollbars>
  )
}

export default BuildReviewDetails
