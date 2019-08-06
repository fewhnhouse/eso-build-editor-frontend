import React from "react";
import styled from "styled-components";
import { Typography, Input, Divider, InputNumber, Radio, Form, Select, Checkbox } from "antd";
import { RouteComponentProps, withRouter } from "react-router";
import Flex from "../../../components/Flex";
import TextArea from "antd/lib/input/TextArea";

const { Title, Text } = Typography;


const Wrapper = styled(Flex)`
 width: 100%;
`
const LeftSide = styled(Flex)`
  width: 500px;
  max-width: 800px;
`
const RightSide = styled(Flex)`
  width: 500px;
  max-width: 800px;
`
const ContentFlex = styled(Flex)``

const RaidGeneral = ({ match }: RouteComponentProps<{ id: string }>) => {

  return (
    <>
      <Title level={1}>Raid editor</Title>
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
        <Checkbox>Private?</Checkbox>
          <Title level={4}>Access rights</Title>
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            <Form.Item label="Can edit">
              <Select>
                <Select.Option key="user1">User 1</Select.Option>
                <Select.Option key="user2">User 1</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Can view">
              <Select>
                <Select.Option key="user4">User 1</Select.Option>
                <Select.Option key="user5">User 1</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </RightSide>
      </Wrapper>
    </>
  );
};

export default withRouter(RaidGeneral)