import React, { useContext, useEffect } from 'react'
import { Divider, Input, Select, Typography, Radio } from 'antd'
import styled from 'styled-components'
import { EsoClassCard, RaceCard } from './Card'
import { BuildContext } from '../BuildStateContext'
import { RadioChangeEvent } from 'antd/lib/radio'
import Flex from '../../../components/Flex'
import { races, classes } from './data'

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
export default ({ edit }: { edit: boolean }) => {
  const [state, dispatch] = useContext(BuildContext)
  const { name, applicationArea, mainResource, role, description } = state!
  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state))
    }
  }, [state])

  const handleBuildNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({ type: 'SET_BUILD_NAME', payload: { name: e.target.value } })
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleResourceChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: 'SET_MAIN_RESOURCE',
      payload: { mainResource: e.target.value },
    })
  }
  return (
    <div>
      <Divider>General Information</Divider>
      <GeneralContainer>
        <Flex direction='column' justify='space-around' align='center'>
          <Flex
            style={{ margin: 10, width: 400 }}
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Build Name</Typography.Text>
            <Input
              style={{ width: 400 }}
              size='large'
              value={name}
              onChange={handleBuildNameChange}
              placeholder='Type name...'
            />
          </Flex>
          <Flex
            style={{ margin: 10, width: 400 }}
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Description</Typography.Text>

            <Input
              size='large'
              style={{ width: 400 }}
              value={description}
              onChange={handleDescriptionChange}
              placeholder='Type description...'
            />
          </Flex>

          <Flex
            style={{ margin: 10, width: 400 }}
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
              {applicationAreas.map(area => (
                <Select.Option value={area.key}>{area.label}</Select.Option>
              ))}
            </Select>
          </Flex>

          <Flex
            style={{ margin: 10, width: 400 }}
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Role</Typography.Text>

            <Select
              size='large'
              style={{ width: 400 }}
              value={role}
              onChange={handleRoleChange}
              placeholder='Select application area...'
            >
              <Select.Option value='battlegrounds'>Healer</Select.Option>
              <Select.Option value='cyrodiil_raid'>Damage Dealer</Select.Option>
              <Select.Option value='pve_arena'>Support</Select.Option>
              <Select.Option value='pve_raid'>Tank</Select.Option>
            </Select>
          </Flex>
        </Flex>
        <Flex
          style={{ flex: 1, margin: 10 }}
          direction='column'
          justify='flex-start'
          align='center'
        >
          <Typography.Text style={{marginBottom: 5}} strong>Main Resource</Typography.Text>
          <Radio.Group
            value={mainResource}
            onChange={handleResourceChange}
            defaultValue='hybrid'
            buttonStyle='solid'
          >
            <Radio.Button value='magicka'>Magicka</Radio.Button>
            <Radio.Button value='hybrid'>Hybrid</Radio.Button>
            <Radio.Button value='stamina'>Stamina</Radio.Button>
          </Radio.Group>
        </Flex>
      </GeneralContainer>

      <Divider>Race</Divider>
      <CardContainer>
        {races.map(race => (
          <RaceCard
            title={race.title}
            imageSource={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${
              race.title
            }.png`}
            description={race.description}
          />
        ))}
      </CardContainer>
      <Divider>Class</Divider>
      <CardContainer>
        {classes.map(esoClass => (
          <EsoClassCard
            description={esoClass.description}
            title={esoClass.title}
            imageSource={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${
              esoClass.title
            }.png`}
          />
        ))}
      </CardContainer>
    </div>
  )
}
