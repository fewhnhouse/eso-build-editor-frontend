import React, { useEffect, useState, useContext } from 'react'
import { Divider, Tabs, Empty } from 'antd'
import styled from 'styled-components'
import Weapons from './Weapons'
import Armor from './Armor'
import Jewelry from './Jewelry'
import SetBar from './SetBar'
import {
  BuildContext,
  SetTab,
  WeaponType,
  ISetSelection,
} from '../BuildStateContext'
import { ISet } from '../../../components/GearSlot'
import GearCard from '../../../components/GearCard'
import SetMenu from './SetMenu'
import Scrollbars from 'react-custom-scrollbars'

const { TabPane } = Tabs

const AbilityContainer = styled.div`
  flex: 2;
  padding: 40px;
`

const Content = styled.div`
  flex: 3;
  display: flex;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const StyledEmpty = styled(Empty)`
  display: flex;
  justify-content: center;
  flex: 2;
  flex-direction: column;
  align-items: center;
`

export const getSetsCount = (
  bigPieceSelection: ISetSelection[] = [],
  smallPieceSelection: ISetSelection[] = [],
  jewelrySelection: ISetSelection[] = [],
  frontbarSelection: ISetSelection[] = [],
  backbarSelection: ISetSelection[] = []
) => {
  const isTwoHandedFrontbar = frontbarSelection[0].type === WeaponType.twohanded
  const isTwoHandedBackbar = backbarSelection[0].type === WeaponType.twohanded

  const setsCount = bigPieceSelection
    .concat(smallPieceSelection, jewelrySelection)
    .map(item => {
      return item.selectedSet ? item.selectedSet.name : ''
    })
    .reduce<Map<string, number>>(
      (prev, curr) => prev.set(curr, 1 + (prev.get(curr) || 0)),
      new Map()
    )
  if (isTwoHandedFrontbar) {
    const setName = frontbarSelection[0].selectedSet!.name
    setsCount.set(setName, 2 + (setsCount.get(setName) || 0))
  } else {
    frontbarSelection.forEach(selection => {
      if (selection.selectedSet) {
        const setName = selection.selectedSet!.name

        setsCount.set(setName, 1 + (setsCount.get(setName) || 0))
      }
    })
  }

  if (isTwoHandedBackbar) {
    const setName = backbarSelection[0].selectedSet!.name
    setsCount.set(setName, 2 + (setsCount.get(setName) || 0))
  } else {
    backbarSelection.forEach(selection => {
      if (selection.selectedSet) {
        const setName = selection.selectedSet!.name

        setsCount.set(setName, 1 + (setsCount.get(setName) || 0))
      }
    })
  }
  return setsCount
}

export default ({ edit }: { edit: boolean }) => {
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

  const setsCount = getSetsCount(
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    frontbarSelection,
    backbarSelection
  )
  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state))
    }
  }, [edit, state])

  useEffect(() => {
    if (selectedSet) {
      setSet(selectedSet)
    }
  }, [selectedSet])

  const { setTabKey } = state!
  const handleTabChange = (key: string) => {
    dispatch!({ type: 'SET_SET_TAB_KEY', payload: { setTabKey: key } })
  }
  return (
    <StyledDiv>
      {console.log(state)}
      <SetMenu
        collapsable
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        context={BuildContext}
      />
      <Content>
        <Scrollbars autoHide>
          <AbilityContainer>
            <Divider>Set</Divider>
            {set ? (
              <GearCard
                set={set}
                setSelectionCount={setsCount.get(set.name) || 0}
              />
            ) : (
              <StyledEmpty>Select a set to get started.</StyledEmpty>
            )}
            <Tabs
              onChange={handleTabChange}
              activeKey={setTabKey}
              defaultActiveKey='frontbar'
            >
              <TabPane
                disabled={set && !set.has_weapons}
                tab='Front-Bar'
                key={SetTab.frontbar}
              >
                <Weapons bar='frontbar' />
              </TabPane>
              <TabPane
                disabled={set && !set.has_weapons}
                tab='Back-Bar'
                key={SetTab.backbar}
              >
                <Weapons bar='backbar' />
              </TabPane>
              <TabPane
                disabled={
                  set &&
                  !set.has_heavy_armor &&
                  !set.has_medium_armor &&
                  !set.has_light_armor
                }
                tab='Armor'
                key={SetTab.armor}
              >
                <Armor />
              </TabPane>
              <TabPane
                disabled={set && !set.has_jewels}
                tab='Jewelry'
                key={SetTab.jewelry}
              >
                <Jewelry />
              </TabPane>
            </Tabs>
          </AbilityContainer>
        </Scrollbars>
        <SetBar hasSelectedSet={set !== undefined} />
      </Content>
    </StyledDiv>
  )
}
