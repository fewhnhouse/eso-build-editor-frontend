import React, { useEffect, useState } from "react";
import { Divider, List, AutoComplete, Tag, Tabs, Card, Select } from "antd";
import styled from "styled-components";
import sets from "../../../sets.json";

const { Item } = List;
const { CheckableTag } = Tag;
const { TabPane } = Tabs;
const { Option } = Select;

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const AbilityContainer = styled.div`
  flex: 2;
  overflow: auto;
  padding: 40px;
`;

const StyledListItem = styled(Item)`
  display: flex;
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
`;
const AbilityBarContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px;

  background: white;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const ListContainer = styled.div`
  width: 500px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
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

interface ISet {
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
      <ListContainer>
        <AutoComplete
          size="large"
          style={{ margin: "10px" }}
          placeholder="input here"
          optionLabelProp="value"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CheckableTag checked={true}>Arena</CheckableTag>
          <CheckableTag checked={true}>Monster</CheckableTag>
          <CheckableTag checked={true}>PvP</CheckableTag>
          <CheckableTag checked={true}>Overland</CheckableTag>
          <CheckableTag checked={true}>Trial</CheckableTag>
          <CheckableTag checked={true}>Dungeon</CheckableTag>
        </div>
        <Divider style={{ margin: "10px 0px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CheckableTag checked={true}>Light</CheckableTag>
          <CheckableTag checked={true}>Medium</CheckableTag>
          <CheckableTag checked={true}>Heavy</CheckableTag>
          <CheckableTag checked={true}>Crafted</CheckableTag>
        </div>
        <Divider style={{ margin: "5px 0px" }} />

        <List
          style={{ height: "100%", overflow: "auto" }}
          dataSource={sets}
          renderItem={item => (
            <StyledListItem onClick={handleSetClick(item)}>
              <div style={{ width: 140, display: "flex" }}>
                <ArmorTypeTag
                  hasHeavyArmor={item.has_heavy_armor === 1}
                  hasMediumArmor={item.has_medium_armor === 1}
                  hasLightArmor={item.has_light_armor === 1}
                  traitsNeeded={item.traits_needed !== null}
                />
                <StyledTag color="geekblue">{item.type}</StyledTag>
              </div>
              <div style={{ textAlign: "left", flex: 2 }}>{item.name}</div>
            </StyledListItem>
          )}
        />
      </ListContainer>
      <Content>
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
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </TabPane>
            <TabPane tab="Armor" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Jewelry" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          <Divider>Enchants</Divider>
          <Divider>Traits</Divider>
        </AbilityContainer>
        <AbilityBarContainer>
          <Divider>Ultimate</Divider>
        </AbilityBarContainer>
      </Content>
    </div>
  );
};

interface ISetTagProps {
  hasHeavyArmor: boolean;
  hasMediumArmor: boolean;
  hasLightArmor: boolean;
  traitsNeeded: boolean;
}

const ArmorTypeTag = ({
  hasHeavyArmor,
  hasMediumArmor,
  hasLightArmor,
  traitsNeeded
}: ISetTagProps) => {
  if (traitsNeeded) {
    return null;
  } else {
    if (hasHeavyArmor && hasMediumArmor && hasLightArmor) {
      return <StyledTag color="purple">All</StyledTag>;
    } else if (hasHeavyArmor) {
      return <StyledTag color="red">Heavy</StyledTag>;
    } else if (hasMediumArmor) {
      return <StyledTag color="green">Medium</StyledTag>;
    } else {
      return <StyledTag color="blue">Light</StyledTag>;
    }
  }
};
