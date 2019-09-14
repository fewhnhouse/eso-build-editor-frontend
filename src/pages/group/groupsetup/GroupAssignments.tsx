import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Select, Divider } from 'antd'

const { Option } = Select

const Container = styled(Flex)`
  flex: 1;
`

const RaidCardsContainer = styled(Flex)`
  width: 100%;
`

const RaidCard = styled(Card)`
  width: 254px;
`

export default () => {
  return (
    <Container direction='column' justify='center' align='center'>
      <RaidCardsContainer
        direction='row'
        align='space-around'
        justify='space-around'
      >
        <RaidCard title='DD'>
          <Divider>Primary</Divider>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Primary'
          >
            <Option value='Member 1'>Member 1</Option>
            <Option value='Member 2'>Member 2</Option>
            <Option value='Member 3'>Member 3</Option>
          </Select>
          <Divider>Secondary</Divider>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Secondary'
          >
            <Option value='Member 1'>Member 1</Option>
            <Option value='Member 2'>Member 2</Option>
            <Option value='Member 3'>Member 3</Option>
          </Select>
        </RaidCard>
      </RaidCardsContainer>
    </Container>
  )
}
