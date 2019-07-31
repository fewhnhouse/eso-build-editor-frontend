import React, { useEffect, useState, useContext } from "react";
import { Divider, Tabs, Card, Empty } from "antd";
import styled from "styled-components";
import Menu from "./Menu";
import Weapons from "./Weapons";
import Armor from "./Armor";
import Jewelry from "./Jewelry";
import RightContent from "./SetBar";
import { BuildContext } from "../BuildStateContext";
import { ISet } from "../../../components/GearSlot";

const { TabPane } = Tabs;

const AbilityContainer = styled.div`
  flex: 2;
  overflow: auto;
  padding: 40px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const StyledCard = styled(Card)`
  margin: 0 auto;
  width: 450px;
  position: relative;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
`;

export default () => {
  // const [skills, setSkills] = useState([]);
  const [state, dispatch] = useContext(BuildContext);
  const [selectedSet, setSelectedSet] = useState<ISet | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem("buildState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state!.selectedSet) {
      setSelectedSet(state!.selectedSet);
    }
  }, [state!.selectedSet]);

  const { setTabKey } = state!;
  const handleTabChange = (key: string) => {
    console.log(key);
    dispatch!({ type: "SET_SET_TAB_KEY", payload: { setTabKey: key } });
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
      <Menu />
      <Content>
        {selectedSet ? (
          <>
            <AbilityContainer>
              <Divider>Set</Divider>
              <StyledCard hoverable title={selectedSet && selectedSet.name}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i}>
                      {selectedSet && selectedSet[`bonus_item_${i}`]}
                    </span>
                  ))}
                </div>
              </StyledCard>
              <Tabs
                onChange={handleTabChange}
                activeKey={setTabKey}
                defaultActiveKey="1"
              >
                <TabPane
                  disabled={!selectedSet!.has_weapons}
                  tab="Weapons"
                  key="weapons"
                >
                  <Weapons />
                </TabPane>
                <TabPane
                  disabled={
                    !selectedSet!.has_heavy_armor &&
                    !selectedSet!.has_medium_armor &&
                    !selectedSet!.has_light_armor
                  }
                  tab="Armor"
                  key="armor"
                >
                  <Armor />
                </TabPane>
                <TabPane
                  disabled={!selectedSet!.has_jewels}
                  tab="Jewelry"
                  key="jewelry"
                >
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
