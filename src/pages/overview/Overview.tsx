import React, { useReducer } from 'react'
import Flex from '../../components/Flex'
import { Tabs, Typography, Card } from 'antd'
import {
  OverviewContext,
  defaultOverviewState,
  overviewReducer,
} from './OverviewStateContext'
import styled from 'styled-components'
import Set from './Set'
import MundusStone from './MundusStone'
import Buff from './Buff'
import Skills from './Skills'

const { TabPane } = Tabs

export const MenuCard = styled.div`
  height: calc(100vh - 200px);
  margin-right: 10px;
  max-height: 85%;
  min-width: ${(props: { minWidth?: string }) => props.minWidth || '300px'};
  flex: 1;
  max-width: 50%;
`

export const Description = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

export const ContentCard = styled(Card)`
  height: calc(100vh - 200px);
  margin-left: 10px;
  max-height: 85%;
  width: 100%;
  max-width: 70%;
  min-width: 50%;
  flex: 4;
`

export const Image = styled.img`
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
`

export default () => {
  const [state, dispatch] = useReducer(overviewReducer, defaultOverviewState)

  const { buff, mundusStone, selectedSet, skillLine } = state
  return (
    <OverviewContext.Provider value={[state, dispatch]}>
      <Flex
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)',
        }}
        direction='column'
      >
        <Typography.Title>Overview</Typography.Title>
        <Tabs
          style={{ width: '100%', height: '100%' }}
          defaultActiveKey='1'
          tabPosition='top'
          size='large'
        >
          <TabPane tab='Buff Food' key='1'>
            <Buff context={OverviewContext} buff={buff} />
          </TabPane>
          <TabPane tab='Mundus Stones' key='2'>
            <MundusStone mundusStone={mundusStone} context={OverviewContext} />
          </TabPane>
          <TabPane tab='Sets' key='3'>
            <Set selectedSet={selectedSet} context={OverviewContext} />
          </TabPane>
          <TabPane tab='Skills' key='4'>
            <Skills context={OverviewContext} skillLine={skillLine} />
          </TabPane>
        </Tabs>
      </Flex>
    </OverviewContext.Provider>
  )
}
