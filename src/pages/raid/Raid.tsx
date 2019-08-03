import React from "react";
import styled from "styled-components";
import { Layout, Typography, Divider, Input, InputNumber, Radio, Form } from "antd";
import Flex from "../../components/Flex";
import TextArea from "antd/lib/input/TextArea";

/*
A screen where you set name, description, group size, content (pvp/pve/bg) and access rights
*/
const { Content } = Layout;
const { Title, Text } = Typography;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: ${props => props.theme.mainBg};
`;

const Wrapper = styled(Flex)`
 width: 100%;
`
const LeftSide = styled(Flex)`
  width: 500px;
  max-width: 800px;
  text-align: left;
`
const RightSide = styled(Flex)`
  width: 500px;
  max-width: 800px;
  text-align: left;
`
const ContentFlex = styled(Flex)``

export default () => {
  return (
    <Container>
      <Title level={1}>Raid editor</Title>
      <Text>Set up the basics for your raid group</Text>
      <Wrapper direction={"row"} justify={"space-around"} align={"flex-start"}>
        <LeftSide direction={"column"} justify={"left"} align={"left"} >
          <Title level={4}>Group name</Title>
          <Input placeholder="Puffymuffins"></Input>
          <Divider/>
          <Title level={4}>Description</Title>
          <TextArea placeholder="12 little elephants marching on"></TextArea>
          <Divider/>
          <ContentFlex direction={"row"} justify={"space-around"} align={"flex-start"}>
            <div style={{flex: 1}}>
              <Title level={4}>Group size (1-24)</Title>
              <InputNumber min={1} max={24} defaultValue={4}></InputNumber>
            </div>
            <div style={{flex: 1}}>
              <Title level={4}>Content</Title>
              <Radio.Group buttonStyle={"solid"} defaultValue={"pve"}>
                <Radio.Button value={"pve"}>PvE</Radio.Button>
                <Radio.Button value={"pvp"}>PvP</Radio.Button>
              </Radio.Group>
            </div>
          </ContentFlex>
          <Divider/>
        </LeftSide>
        <RightSide direction={"column"} justify={""} align={"left"}>
          <Title level={4}>Access rights</Title>
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            <Form.Item label="Username">
              <Input placeholder=""></Input>
            </Form.Item>
            <Form.Item label="Password">
              <Input placeholder=""></Input>
            </Form.Item>
          </Form>
        </RightSide>
      </Wrapper>
    </Container>
  )
};
