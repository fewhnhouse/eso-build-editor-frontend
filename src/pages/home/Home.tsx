import React from 'react'
import styled from 'styled-components'
import { Layout, Typography, Divider } from 'antd'
import Flex from '../../components/Flex'

const { Content } = Layout
const { Title } = Typography

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: ${props => props.theme.mainBg};
`

const Wrapper = styled(Flex)``

const LeftSide = styled(Flex)`
  flex: 1;
`

const RightSide = styled(Flex)`
  flex: 1;
`

const StyledTitle = styled.h1`
  margin-top: 20px;
  font-size: 50px;
`

export default () => {
  return (
    <Container>
      <Divider>
        <StyledTitle>FIST Build Editor</StyledTitle>
      </Divider>
      <Wrapper direction={"row"} justify={"center"} align={"flex-start"} fluid>
        <LeftSide direction={"row"} justify={""} align={"flex-start"}>
          <Title level={1}>Welcome to Build Editor!</Title>
        </LeftSide>
        <RightSide direction={"row"} justify={""} align={"flex-start"}>
          <Title level={1}>Get started</Title>
        </RightSide>
      </Wrapper>
    </Container>
  )
}
