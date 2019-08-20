import React, { useEffect, useState, useContext } from 'react'
import { Divider, Tabs, Empty } from 'antd'
import styled from 'styled-components'
import Menu from './Menu'
import Weapons from './Weapons'
import Armor from './Armor'
import Jewelry from './Jewelry'
import SetBar from './SetBar'
import { BuildContext, SetTab } from '../BuildStateContext'
import { ISet } from '../../../components/GearSlot'
import GearCard from '../../../components/GearCard'

const { TabPane } = Tabs

const AbilityContainer = styled.div`
  flex: 2;
  overflow-y: auto;
  padding: 40px;
`

const Content = styled.div`
  flex: 3;
  display: flex;
`

export default ({ edit }: { edit: boolean }) => {
  // const [skills, setSkills] = useState([]);
  const [state, dispatch] = useContext(BuildContext)
  const [selectedSet, setSelectedSet] = useState<ISet | undefined>(undefined)
  const [collapsed, setCollapsed] = useState(state!.selectedSet !== undefined)

  const {
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    frontbarSelection,
    backbarSelection,
  } = state!

  const setsCount = bigPieceSelection
    .concat(
      smallPieceSelection,
      jewelrySelection,
      frontbarSelection,
      backbarSelection
    )
    .map(item => {
      return item.selectedSet ? item.selectedSet.name : ''
    })
    .reduce<Map<string, number>>(
      (acc, curr) => acc.set(curr, 1 + (acc.get(curr) || 0)),
      new Map()
    )
  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state))
    }
  }, [edit, state])

  useEffect(() => {
    if (state!.selectedSet) {
      setSelectedSet(state!.selectedSet)
    }
  }, [state])

  const { setTabKey } = state!
  const handleTabChange = (key: string) => {
    dispatch!({ type: 'SET_SET_TAB_KEY', payload: { setTabKey: key } })
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content>
        {selectedSet ? (
          <>
            <AbilityContainer>
              <Divider>Set</Divider>
              <GearCard
                set={selectedSet}
                setSelectionCount={setsCount.get(selectedSet.name) || 0}
              />
              <Tabs
                onChange={handleTabChange}
                activeKey={setTabKey}
                defaultActiveKey='frontbar'
              >
                <TabPane
                  disabled={!selectedSet!.has_weapons}
                  tab='Front-Bar'
                  key={SetTab.frontbar}
                >
                  <Weapons bar='frontbar' />
                </TabPane>
                <TabPane
                  disabled={!selectedSet!.has_weapons}
                  tab='Back-Bar'
                  key={SetTab.backbar}
                >
                  <Weapons bar='backbar' />
                </TabPane>
                <TabPane
                  disabled={
                    !selectedSet!.has_heavy_armor &&
                    !selectedSet!.has_medium_armor &&
                    !selectedSet!.has_light_armor
                  }
                  tab='Armor'
                  key={SetTab.armor}
                >
                  <Armor />
                </TabPane>
                <TabPane
                  disabled={!selectedSet!.has_jewels}
                  tab='Jewelry'
                  key={SetTab.jewelry}
                >
                  <Jewelry />
                </TabPane>
              </Tabs>
            </AbilityContainer>
          </>
        ) : (
          <Empty
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 2,
              flexDirection: 'column',
              alignItems: 'center',
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
