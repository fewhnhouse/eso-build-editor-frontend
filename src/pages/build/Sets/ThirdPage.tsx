import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  AutoComplete,
  Tag,
  Tabs,
  Card,
  Select,
  Empty
} from "antd";
import styled from "styled-components";
import Menu from "./Menu";
import Weapons from "./Weapons";
import Armor from "./Armor";
import Jewelry from "./Jewelry";
import GearView from "../../../components/GearView";
import RightContent from "./RightContent";
import { ISet } from "../../../components/GearSlot";

const { TabPane } = Tabs;
const { Option } = Select;

const AbilityContainer = styled.div`
  flex: 2;
  overflow: auto;
  padding: 40px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

export default () => {
  // const [skills, setSkills] = useState([]);
  const [set, setSet] = useState<ISet | null>(null);
  useEffect(() => {
    /*
    axios
      .get("/skills", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(({ data }) => {
        console.log(data);
        setSkills(data);
      });
      */
  }, []);

  const handleSetClick = (set: ISet) => () => {
    setSet(set);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Menu handleClick={handleSetClick} />
      <Content>
        {set ? (
          <>
            <AbilityContainer>
              <Divider>Set</Divider>
              <Card title={set && set.name}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <span>{set && set[`bonus_item_${i}`]}</span>
                  ))}
                </div>
              </Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Weapons" key="1">
                  <Weapons />
                </TabPane>
                <TabPane tab="Armor" key="2">
                  <Armor />
                </TabPane>
                <TabPane tab="Jewelry" key="3">
                  <Jewelry />
                </TabPane>
              </Tabs>
            </AbilityContainer>
          </>
        ) : (
          <Empty
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 2,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            Select a set to get started.
          </Empty>
        )}
        <RightContent />
      </Content>
    </div>
  );
};
