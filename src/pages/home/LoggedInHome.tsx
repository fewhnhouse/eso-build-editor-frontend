import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Select } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom';

const { Option } = Select;

const { Title } = Typography;

const Wrapper = styled(Flex)``

const LeftSide = styled(Flex)`
  flex: 1;
`

const Center = styled(Flex)`
  flex: 1;
  justify-content: normal;
`

const RightSide = styled(Flex)`
  flex: 1;
`

export default () => {
    return (
        <Wrapper direction={"row"} justify={"center"} align={"flex-start"} fluid>
            <LeftSide direction={"column"} justify={""} align={""}>
                <Title level={2}>
                    <Link to={"/build/0"}>Create a build</Link>
                </Title>
                <Title level={2}>
                    <Link to={"/raid/0"}>Create a raid setup</Link>
                </Title>
            </LeftSide>
            <Center direction={"column"} justify={""} align={""}>
                <Title level={1}>Your profile</Title>
                <Divider>Saved builds</Divider>
                <Select defaultValue={"Op build 1"} style={{width: "200px"}}>
                    <Option value={"Op build 1"}>Op build 1</Option>
                    <Option value={"Garbage build"}>Garbage build</Option>
                    <Option value={"Mediocre build"}>Mediocre build</Option>
                </Select>
                <Divider>Saved raid setups</Divider>
                <Select defaultValue={"Black Rose Prison"} style={{width: "200px"}}>
                    <Option value={"24man solozerg"}>24man solozerg</Option>
                    <Option value={"Black Rose Prison"}>Garbage build</Option>
                    <Option value={"Craglorn trials 12man"}>Craglorn trials 12man</Option>
                </Select>
            </Center>
            <RightSide direction={"column"} justify={""} align={""}>
                <Title level={1}>Build Editor news</Title>
                <Title level={2}>Latest in Build Editor</Title><br /> 
            </RightSide>
        </Wrapper>
    )
}