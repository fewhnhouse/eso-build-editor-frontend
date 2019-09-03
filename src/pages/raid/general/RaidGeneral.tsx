import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Typography, Input, Divider, Select, Slider } from 'antd'
import Flex from '../../../components/Flex'
import { RaidContext } from '../RaidStateContext'
import { SliderValue } from 'antd/lib/slider'

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`

const StyledFlex = styled(Flex)`
  width: ${props => props.theme.widths.medium};
  margin: ${props => props.theme.margins.small};
`

const StyledWideFlex = styled(Flex)`
  width: ${props => props.theme.widths.medium};
  flex: 1;
`

const StyledInput = styled(Input)`
  width: ${props => props.theme.widths.medium};
`

const marks = {
  1: '1',
  6: '6',
  12: '12',
  18: '18',
  24: '24',
}

interface IRaidGeneralProps {
  edit: boolean
}

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
const RaidGeneral = ({ edit }: IRaidGeneralProps) => {
  const [state, dispatch] = useContext(RaidContext)

  const { name, description, applicationArea, groupSize } = state!

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('raidState', JSON.stringify(state))
    }
  }, [state, edit])

  const handleRaidNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({ type: 'SET_RAID_NAME', payload: { name: e.target.value } })
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({
      type: 'SET_RAID_DESCRIPTION',
      payload: { description: e.target.value },
    })
  }

  const handleApplicationAreaChange = (value: string) => {
    dispatch!({
      type: 'SET_RAID_APPLICATION_AREA',
      payload: { applicationArea: value },
    })
  }

  const handleGroupSizeChange = (value: SliderValue) => {
    dispatch!({
      type: 'SET_GROUP_SIZE',
      payload: { groupSize: value },
    })
  }

  return (
    <>
      <Divider>General Information</Divider>
      <GeneralContainer>
        <Flex direction='column' justify='space-around' align='center'>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Raid Name</Typography.Text>
            <StyledInput
              size='large'
              value={name}
              onChange={handleRaidNameChange}
              placeholder='Type name...'
            />
          </StyledFlex>
          <StyledWideFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Description</Typography.Text>

            <StyledInput
              size='large'
              value={description}
              onChange={handleDescriptionChange}
              placeholder='Type description...'
            />
          </StyledWideFlex>
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
              <Select.Option value='battlegrounds'>Battlegrounds</Select.Option>
              <Select.Option value='cyrodiil_raid'>
                Cyrodiil - Raid
              </Select.Option>
              <Select.Option value='cyrodiil_smallscale'>
                Cyrodiil - Small Scale
              </Select.Option>

              <Select.Option value='pve_dungeons'>PvE - Dungeons</Select.Option>
              <Select.Option value='pve_arena'>PvE - Arena</Select.Option>
              <Select.Option value='pve_raid'>PvE - Raids</Select.Option>
              <Select.Option value='pve_openworld'>
                PvE - Open World
              </Select.Option>
            </Select>
          </StyledFlex>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Group Size</Typography.Text>

            <Slider
              style={{ width: 380 }}
              min={1}
              max={24}
              marks={marks}
              step={1}
              onChange={handleGroupSizeChange}
              defaultValue={groupSize}
            />
          </StyledFlex>
        </Flex>
      </GeneralContainer>
      {/* TODO: Prospone to V2 <Divider>Access Rights</Divider>
      <GeneralContainer>
        <AccessRights />
     </GeneralContainer>*/}
    </>
  )
}

export default RaidGeneral
