import React from 'react'
import styled from 'styled-components'
import { Divider, Typography, Select, Input, Icon } from 'antd'
import Flex from '../../../components/Flex'

const { Option } = Select

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

const SelectDivider = styled(Divider)`
  margin: 0;
`

const StyledSelectDiv = styled.div`
  padding: ${props => props.theme.paddings.mini};
  cursor: pointer;
`

interface IGroupGeneralProps {
  edit?: boolean
}

export default ({ edit }: IGroupGeneralProps) => {
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
            <Typography.Text strong>Group name</Typography.Text>
            <StyledInput size='large' placeholder='Type name...' />
          </StyledFlex>
          <StyledWideFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Description</Typography.Text>

            <StyledInput size='large' placeholder='Type description...' />
          </StyledWideFlex>
          <StyledFlex
            direction='column'
            justify='flex-start'
            align='flex-start'
          >
            <Typography.Text strong>Application Area</Typography.Text>
            <Select
              style={{ width: 400 }}
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
            <Typography.Text strong>Group Members</Typography.Text>
            <Select
              mode='multiple'
              placeholder='Select members for group'
              style={{ width: 400 }}
              dropdownRender={menu => (
                <div>
                  {menu}
                  <SelectDivider />
                  <StyledSelectDiv>
                    <Icon type='plus' /> Add custom member
                  </StyledSelectDiv>
                </div>
              )}
            >
              <Option value='old mcdonald'>Old McDonald</Option>
              <Option value='Potato'>Potato</Option>
            </Select>
          </StyledFlex>
        </Flex>
      </GeneralContainer>
    </>
  )
}
