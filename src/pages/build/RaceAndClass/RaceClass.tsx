import React, { useContext, useEffect } from 'react'
import { Divider, Input, Select, Typography, Button, Card, Radio } from 'antd'
import styled from 'styled-components'
import { EsoClassCard, RaceCard } from './Card'
import { BuildContext, AccessRights } from '../BuildStateContext'
import Flex from '../../../components/Flex'
import { races, classes } from './data'
import { RadioChangeEvent } from 'antd/lib/radio'
import {
  MinusOutlined,
  PlusOutlined,
  LockOutlined,
  EditOutlined,
  UnlockOutlined,
} from '@ant-design/icons'

const { TextArea } = Input

const ButtonGroup = Button.Group

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`
const ResourceCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
`

const StyledFlex = styled(Flex)`
  margin: ${(props) => props.theme.margins.small};
  width: ${(props) => props.theme.widths.medium};
`

const StyledWideFlex = styled(Flex)`
  flex: 1;
  margin: ${(props) => props.theme.margins.small};
`

const StyledTitle = styled(Typography.Title)`
  margin: ${(props) => props.theme.margins.mini};
`

const StyledRadioGroup = styled(Radio.Group)`
  width: ${(props) => props.theme.widths.medium};
`

const StyledRadioButton = styled(Radio.Button)`
  width: 33.3%;
`

const StyledInput = styled(Input)`
  width: ${(props) => props.theme.widths.medium};
`

const StyledTextArea = styled(TextArea)`
  width: ${(props) => props.theme.widths.medium};
`

export const applicationAreas = [
  {
    label: 'Cyrodiil - Raid',
    key: 'cyrodiil_raid',
  },
  {
    label: 'Cyrodiil - Smallscale',
    key: 'cyrodiil_smallscale',
  },
  {
    label: 'Cyrodiil - Solo',
    key: 'cyrodiil_solo',
  },
  {
    label: 'Battlegrounds',
    key: 'battlegrounds',
  },
  {
    label: 'PvE - Dungeons',
    key: 'pve_dungeons',
  },
  {
    label: 'PvE - Arena',
    key: 'pve_arena',
  },
  {
    label: 'PvE - Open World',
    key: 'pve_openworld',
  },
  {
    label: 'PvE - Raids',
    key: 'pve_raid',
  },
]

export const accessRightOptions = [
  {
    label: 'Private',
    key: AccessRights.PRIVATE,
    Icon: LockOutlined,
  },
  {
    label: 'Unlisted',
    key: AccessRights.UNLISTED,
    Icon: EditOutlined,
  },
  {
    label: 'Public',
    key: AccessRights.PUBLIC,
    Icon: UnlockOutlined,
  },
]

const TOTAL_ATTRIBUTES = 64
export default ({ edit }: { edit: boolean }) => {
  const [state, dispatch] = useContext(BuildContext)
  const {
    name,
    applicationArea,
    health,
    magicka,
    stamina,
    role,
    description,
    accessRights,
  } = state!
  const totalAttributes = health + stamina + magicka

  const handleAttributeChange = (
    type: 'health' | 'magicka' | 'stamina',
    operation: 'plus' | 'minus'
  ) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const modifier = e.shiftKey ? 10 : 1
    const tooManyAttributes = totalAttributes + modifier > TOTAL_ATTRIBUTES
    const tooLittleAttributes = state![type] - modifier < 0
    if (type === 'health') {
      if (tooManyAttributes && operation === 'plus') {
        const difference = TOTAL_ATTRIBUTES - magicka - stamina
        dispatch!({ type: 'SET_HEALTH', payload: { health: difference } })
      } else if (tooLittleAttributes && operation === 'minus') {
        dispatch!({ type: 'SET_HEALTH', payload: { health: 0 } })
      } else {
        dispatch!({
          type: 'SET_HEALTH',
          payload: {
            health:
              operation === 'plus' ? health + modifier : health - modifier,
          },
        })
      }
    } else if (type === 'magicka') {
      if (tooManyAttributes && operation === 'plus') {
        const difference = TOTAL_ATTRIBUTES - health - stamina
        dispatch!({ type: 'SET_MAGICKA', payload: { magicka: difference } })
      } else if (tooLittleAttributes && operation === 'minus') {
        dispatch!({ type: 'SET_MAGICKA', payload: { magicka: 0 } })
      } else {
        dispatch!({
          type: 'SET_MAGICKA',
          payload: {
            magicka:
              operation === 'plus' ? magicka + modifier : magicka - modifier,
          },
        })
      }
    } else {
      if (tooManyAttributes && operation === 'plus') {
        const difference = TOTAL_ATTRIBUTES - magicka - health
        dispatch!({ type: 'SET_STAMINA', payload: { stamina: difference } })
      } else if (tooLittleAttributes && operation === 'minus') {
        dispatch!({ type: 'SET_STAMINA', payload: { stamina: 0 } })
      } else {
        dispatch!({
          type: 'SET_STAMINA',
          payload: {
            stamina:
              operation === 'plus' ? stamina + modifier : stamina - modifier,
          },
        })
      }
    }
  }
  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state))
    }
  }, [state, edit])

  const handleBuildNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({ type: 'SET_BUILD_NAME', payload: { name: e.target.value } })
  }
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch!({
      type: 'SET_DESCRIPTION',
      payload: { description: e.target.value },
    })
  }

  const handleApplicationAreaChange = (value: string) => {
    dispatch!({
      type: 'SET_APPLICATION_AREA',
      payload: { applicationArea: value },
    })
  }

  const handleRoleChange = (value: string) => {
    dispatch!({
      type: 'SET_ROLE',
      payload: { role: value },
    })
  }

  const handleAccessRightsChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: 'SET_ACCESS_RIGHTS',
      payload: { accessRights: e.target.value },
    })
  }

  return (
    <div>
      <Divider>General Information</Divider>

      <GeneralContainer>
        <Flex direction='column' justify='space-around' align='center'>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Build Name</Typography.Text>
            <StyledInput
              size='large'
              value={name}
              onChange={handleBuildNameChange}
              placeholder='Type name...'
            />
          </StyledFlex>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Description</Typography.Text>
            <StyledTextArea
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              placeholder='Type description...'
            />
          </StyledFlex>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Application Area</Typography.Text>
            <Select
              style={{ width: 400 }}
              value={applicationArea}
              onChange={handleApplicationAreaChange}
              size='large'
              placeholder='Select application area...'
            >
              {applicationAreas.map((area, index) => (
                <Select.Option key={`appArea-${index}`} value={area.key}>
                  {area.label}
                </Select.Option>
              ))}
            </Select>
          </StyledFlex>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Role</Typography.Text>
            <Select
              style={{ width: 400 }}
              size='large'
              value={role}
              onChange={handleRoleChange}
              placeholder='Select application area...'
            >
              <Select.Option value='battlegrounds'>Healer</Select.Option>
              <Select.Option value='cyrodiil_raid'>Damage Dealer</Select.Option>
              <Select.Option value='pve_arena'>Support</Select.Option>
              <Select.Option value='pve_raid'>Tank</Select.Option>
            </Select>
          </StyledFlex>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Access Rights</Typography.Text>

            <StyledRadioGroup
              size='large'
              onChange={handleAccessRightsChange}
              defaultValue={accessRights}
              buttonStyle='solid'
            >
              {accessRightOptions.map(({ key, Icon, label }) => (
                <StyledRadioButton key={key} value={key}>
                  <Icon style={{ marginRight: 5 }} />
                  {label}
                </StyledRadioButton>
              ))}
            </StyledRadioGroup>
          </StyledFlex>
        </Flex>
      </GeneralContainer>

      <Divider>Attributes</Divider>
      <StyledWideFlex direction='column' justify='flex-start' align='center'>
        <Flex direction='row' justify='space-between'>
          <ResourceCard>
            <Typography.Text strong>Stamina</Typography.Text>
            <StyledTitle level={4}>{stamina}</StyledTitle>
            <ButtonGroup>
              <Button
                disabled={stamina === 0}
                onClick={handleAttributeChange('stamina', 'minus')}
                type='default'
              >
                <MinusOutlined />
              </Button>
              <Button
                disabled={totalAttributes >= 64}
                onClick={handleAttributeChange('stamina', 'plus')}
                type='primary'
              >
                <PlusOutlined />
              </Button>
            </ButtonGroup>
          </ResourceCard>
          <ResourceCard>
            <Typography.Text strong>Health</Typography.Text>
            <StyledTitle level={4}>{health}</StyledTitle>
            <ButtonGroup>
              <Button
                disabled={health === 0}
                onClick={handleAttributeChange('health', 'minus')}
                type='default'
              >
                <MinusOutlined />
              </Button>
              <Button
                disabled={totalAttributes >= 64}
                onClick={handleAttributeChange('health', 'plus')}
                type='primary'
              >
                <PlusOutlined />
              </Button>
            </ButtonGroup>
          </ResourceCard>

          <ResourceCard>
            <Typography.Text strong>Magicka</Typography.Text>
            <StyledTitle level={4}>{magicka}</StyledTitle>
            <ButtonGroup>
              <Button
                disabled={magicka === 0}
                onClick={handleAttributeChange('magicka', 'minus')}
                type='default'
              >
                <MinusOutlined />
              </Button>
              <Button
                disabled={totalAttributes >= 64}
                onClick={handleAttributeChange('magicka', 'plus')}
                type='primary'
              >
                <PlusOutlined />
              </Button>
            </ButtonGroup>
          </ResourceCard>
        </Flex>
      </StyledWideFlex>

      <Divider>Race</Divider>
      <CardContainer>
        {races.map((race, index) => (
          <RaceCard
            key={`race-${index}`}
            title={race.title}
            imageSource={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${race.title}.png`}
            description={race.description}
          />
        ))}
      </CardContainer>
      <Divider>Class</Divider>
      <CardContainer>
        {classes.map((esoClass, index) => (
          <EsoClassCard
            key={`esoclass-${index}`}
            description={esoClass.description}
            title={esoClass.title}
            imageSource={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${esoClass.title}.png`}
          />
        ))}
      </CardContainer>
    </div>
  )
}
