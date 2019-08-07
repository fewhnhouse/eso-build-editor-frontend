import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Button } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Wrapper = styled(Flex)``

const LeftSide = styled(Flex)`
  flex: 1;
  height: 70%;
`

const Center = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 5px;
  height: 70%;
`

const RightSide = styled(Flex)`
  flex: 1;
  height: 70%;
`

export default () => {
    return (
        <Wrapper direction={"row"} justify={"center"} align={"flex-start"} fluid>
            <LeftSide direction={"column"} justify={""} align={""}>
                <Title level={1}>Get started</Title>
                <Button type="primary" size="large">
                    <Link to={"/build/0"}>Create a build</Link>
                </Button>
                <Button size="large" icon="search">
                    <Link to={"/raid/0"}>Browse raid setups </Link>
                </Button>
                <Button size="large" icon="search">
                    <Link to={"/build/0"}>Browse builds</Link>
                </Button>
            </LeftSide>
            <Center direction={"column"} justify={""} align={""}>
                <Title level={1}>Welcome to Build Editor!</Title>
                <p>
                    Build Editor allows you to create and save builds<br />
                    and combine them to complete raid setups -<br />
                    to be shared with friends, guilds and communities,<br />
                    or saved privately as you choose. 
                </p>
            </Center>
            <RightSide direction={"column"} justify={""} align={""}>
                <Title level={1}>Build Editor news</Title>
                <Title level={2}>Latest in Build Editor</Title><br />
            </RightSide>
        </Wrapper>
    )
}