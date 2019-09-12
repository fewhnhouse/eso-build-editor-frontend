import React from 'react'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard } from '../overview/Overview'
import { Input, Divider, Rate, Select, Typography, Slider } from 'antd'
import { applicationAreas, marks } from '../raid/general/RaidGeneral'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const { Option } = Select
const { Title } = Typography

const MenuFlex = styled(Flex)`
  height: calc(100vh - 100px);
  width: 100%;
  padding: ${props => props.theme.paddings.medium};
`

export default () => {
  const isMobile = useMediaQuery({ maxWidth: 800 })
  return (
    <MenuFlex direction='row' align='flex-start'>
      <MenuCard isMobile={isMobile}>
        <Title level={3}>Browse public raids</Title>
        <Title level={4}>Filters</Title>
        <Input placeholder='Raid name...'></Input>
        <Divider>Applicaton areas</Divider>
        <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Select application areas...'
        >
          {applicationAreas.map((area, index) => (
            <Option key={index}>{area.label}</Option>
          ))}
        </Select>
        <Divider>Has roles</Divider>
        <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Select roles...'
        >
          <Option key={1}>Public role 1</Option>
        </Select>
        <Divider>Group size</Divider>
        <Slider
          range
          defaultValue={[4, 12]}
          style={{ width: 380 }}
          min={1}
          max={24}
          marks={marks}
          step={1}
        />
        <Divider>Minimum rating</Divider>
        <Rate allowHalf defaultValue={2.5} />
      </MenuCard>
      <ContentCard
        bodyStyle={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Raids matching filters</h1>
      </ContentCard>
    </MenuFlex>
  )
}
