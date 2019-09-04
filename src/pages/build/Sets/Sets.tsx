import React, { useEffect, useState, useContext } from "react"
import { Divider, Tabs, Empty } from "antd"
import styled from "styled-components"
import Weapons from "./Weapons"
import Armor from "./Armor"
import Jewelry from "./Jewelry"
import SetBar from "./SetBar"
import { BuildContext, SetTab } from "../BuildStateContext"
import { ISet } from "../../../components/GearSlot"
import GearCard from "../../../components/GearCard"
import SetMenu from "./SetMenu"
import Scrollbars from "react-custom-scrollbars"

const { TabPane } = Tabs

const AbilityContainer = styled.div`
  flex: 2;
  padding: 40px;
`

const Content = styled.div`
  flex: 3;
  display: flex;
`

export default ({ edit }: { edit: boolean }) => {
  // const [skills, setSkills] = useState([]);
  const [state, dispatch] = useContext(BuildContext)
  const [set, setSet] = useState<ISet | undefined>(undefined)
  const [collapsed, setCollapsed] = useState(state!.selectedSet !== undefined)

  const {
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    frontbarSelection,
    backbarSelection,
    selectedSet,
  } = state!

  const setsCount = bigPieceSelection
    .concat(
      smallPieceSelection,
      jewelrySelection,
      frontbarSelection,
      backbarSelection
    )
    .map(item => {
      return item.selectedSet ? item.selectedSet.name : ""
    })
    .reduce<Map<string, number>>(
      (acc, curr) => acc.set(curr, 1 + (acc.get(curr) || 0)),
      new Map()
    )
  useEffect(() => {
    if (!edit) {
      localStorage.setItem("buildState", JSON.stringify(state))
    }
  }, [edit, state])

  useEffect(() => {
    if (selectedSet) {
      setSet(selectedSet)
    }
  }, [selectedSet])

  const { setTabKey } = state!
  const handleTabChange = (key: string) => {
    dispatch!({ type: "SET_SET_TAB_KEY", payload: { setTabKey: key } })
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <SetMenu
        collapsable
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        context={BuildContext}
      />
      <Content>
        {set ? (
          <Scrollbars autoHide>
            <AbilityContainer>
              <Divider>Set</Divider>
              <GearCard
                set={set}
                setSelectionCount={setsCount.get(set.name) || 0}
              />
              <Tabs
                onChange={handleTabChange}
                activeKey={setTabKey}
                defaultActiveKey="frontbar"
              >
                <TabPane
                  disabled={!set!.has_weapons}
                  tab="Front-Bar"
                  key={SetTab.frontbar}
                >
                  <Weapons bar="frontbar" />
                </TabPane>
                <TabPane
                  disabled={!set!.has_weapons}
                  tab="Back-Bar"
                  key={SetTab.backbar}
                >
                  <Weapons bar="backbar" />
                </TabPane>
                <TabPane
                  disabled={
                    !set!.has_heavy_armor &&
                    !set!.has_medium_armor &&
                    !set!.has_light_armor
                  }
                  tab="Armor"
                  key={SetTab.armor}
                >
                  <Armor />
                </TabPane>
                <TabPane
                  disabled={!set!.has_jewels}
                  tab="Jewelry"
                  key={SetTab.jewelry}
                >
                  <Jewelry />
                </TabPane>
              </Tabs>
            </AbilityContainer>
          </Scrollbars>
        ) : (
          <Empty
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 2,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Select a set to get started.
          </Empty>
        )}
        {collapsed && <SetBar />}
      </Content>
    </div>
  )
}
