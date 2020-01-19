import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card } from 'antd'

const Container = styled(Flex)`
  padding: ${props => props.theme.paddings.medium};
`
export default () => {
  return (
    <Container fluid>
      <Card title='Test'>Test</Card>
      <Card title='Test'>Test</Card>
    </Container>
  )
}
