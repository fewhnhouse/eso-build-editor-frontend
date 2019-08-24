import React, { useReducer } from 'react'
import Flex from '../../components/Flex'
import { Card, Tabs, Typography } from 'antd'
import BuffMenu from '../build/consumables/BuffMenu'
import {
  OverviewContext,
  defaultOverviewState,
  overviewReducer,
} from './OverviewStateContext'
import MundusMenu from '../build/consumables/MundusMenu'
import styled from 'styled-components'
import SetMenu from '../build/Sets/SetMenu'
const { TabPane } = Tabs

const ContentCard = styled.div`
  height: 800px;
  margin: 20px;
  max-height: 85%;
  min-width: 300px;
`
export default () => {
  const [state, dispatch] = useReducer(overviewReducer, defaultOverviewState)
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
            <ContentCard>
              <BuffMenu context={OverviewContext} />
            </ContentCard>
          </TabPane>
          <TabPane tab='Mundus Stones' key='2'>
            <ContentCard>
              <MundusMenu context={OverviewContext} />
            </ContentCard>
          </TabPane>
          <TabPane tab='Sets' key='3'>
            <ContentCard>
              <SetMenu
                collapsed={false}
                setCollapsed={() => {}}
                context={OverviewContext}
              />
            </ContentCard>
          </TabPane>
          <TabPane tab='Skills' key='4'>
            <ContentCard>Skills</ContentCard>
          </TabPane>
        </Tabs>
      </Flex>
    </OverviewContext.Provider>
  )
}
