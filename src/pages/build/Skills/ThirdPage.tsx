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

export interface ISkill {
  cast_time: string;
  cost: string;
  effect_1: string;
  effect_2: string | null;
  icon: string;
  id: number;
  name: string;
  parent: number | null;
  pts: number;
  range: string | null;
  skillline: number;
  slug: string;
  target: string;
  type: number;
  unlocks_at: number;
}

export interface ISet {
  id: number;
  name: string;
  location: string;
  type: string;
  slug: string;
  bonus_item_1: string | null;
  bonus_item_2: string | null;
  bonus_item_3: string | null;
  bonus_item_4: string | null;
  bonus_item_5: string | null;
  has_jewels: number;
  has_weapons: number;
  has_heavy_armor: number;
  has_light_armor: number;
  has_medium_armor: number;
  traits_needed: number | null;
  pts: number;
  eso_id: null | number;
  [key: string]: string | null | number;
}

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
