import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Icon, Button } from 'antd'
import Flex from '../../components/Flex'

const { Title, Text } = Typography;

const Wrapper = styled(Flex)`
    padding-top: 20px;
    width: 100%;
    flex-wrap: wrap;
`

const LeftSide = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  height: 300px;
  background-color: #d1d1d1;
`

const Center = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  height: 300px;
  background-color: #d1d1d1;
`

const RightSide = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #d1d1d1;
  height: 300px;
`

export default () => {
    return (
        <Wrapper direction={"row"} justify={""} align={"flex-start"}>
            <LeftSide direction={"column"} justify={"space-between"} align={""}>
                <Title level={3}>Builds</Title>
                <Text>
                    Create, share, save and edit builds
                </Text>
                <Button type="primary" ghost={true }>Create</Button>
            </LeftSide>
            <Center direction={"column"} justify={"space-between"} align={""}>
                <Title level={3}>Overview</Title>
            </Center>
            <RightSide direction={"column"} justify={"space-between"} align={""}>
                <Title level={3}>Raids</Title>
                <Text>
                    Create, share, save and edit raids
                </Text>
                <Button type="primary" ghost={true }>Create</Button>
            </RightSide>
        </Wrapper>
    )
}