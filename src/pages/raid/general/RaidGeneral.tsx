import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Typography, Input, Divider, Select } from 'antd'
import Flex from '../../../components/Flex'
import { RaidContext } from '../RaidStateContext'

const { TextArea } = Input

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`

const StyledFlex = styled(Flex)`
  width: ${(props) => props.theme.widths.medium};
  margin: ${(props) => props.theme.margins.small};
`

const StyledWideFlex = styled(Flex)`
  width: ${(props) => props.theme.widths.medium};
  flex: 1;
`

const StyledInput = styled(Input)`
  width: ${(props) => props.theme.widths.medium};
`

const StyledTextArea = styled(TextArea)`
  width: ${(props) => props.theme.widths.medium};
`

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

  const { name, description, applicationArea } = state!

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('raidState', JSON.stringify(state))
    }
  }, [state, edit])

  const handleRaidNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch!({ type: 'SET_RAID_NAME', payload: { name: e.target.value } })
  }
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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

  return (
    <>
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

            <StyledTextArea
              rows={4}
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
