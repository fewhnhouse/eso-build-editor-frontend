import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Button, Icon } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Wrapper = styled(Flex)`
    padding-top: 20px;
`

const LeftSide = styled(Flex)`
  flex: 1;
`

const Center = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
`

const RightSide = styled(Flex)`
  flex: 1;
`

const StyledButton = styled(Button)`
    width: 300px;
    margin-top: 10px;
`

const StyledIcon = styled(Icon)`
    float: left;
    line-height: 1.5 !important;
`

export default () => {
    return (
        <Wrapper direction={"row"} justify={"center"} align={"flex-start"} fluid>
            <LeftSide direction={"column"} justify={""} align={""}>
                <Title level={1}>Get started</Title>
                <StyledButton size="large">
                    <StyledIcon type="plus" />
                    <Link to={"/build/0"}>Create a build</Link>
                </StyledButton>
                <StyledButton size="large">
                    <StyledIcon type="plus-square" />
                    <Link to={"/build/0"}>Create a raid setup</Link>
                </StyledButton>
                <StyledButton size="large">
                    <StyledIcon type="search" />
                    <Link to={"/build/0"}>Browse builds and setups</Link>
                </StyledButton>
            </LeftSide>
            <Center direction={"column"} justify={""} align={""}>
                <Title level={1}>Welcome to Build Editor!</Title>
                <Text>
                    Build Editor allows you to create and save builds<br />
                    and combine them to complete raid setups -<br />
                    to be shared with friends, guilds and communities,<br />
                    or saved privately as you choose. 
                </Text>
                <Title level={4}>
                    <Icon type="arrow-left" style={{marginRight: "5px"}} /> Get building!
                </Title>
            </Center>
            <RightSide direction={"column"} justify={""} align={""}>
                <Title level={1}>Build Editor news</Title>
                <Title level={2}>Release 1.0</Title>
                <Text>Build Editor 1.0 is here!</Text>
            </RightSide>
        </Wrapper>
    )
}