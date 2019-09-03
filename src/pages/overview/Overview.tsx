import React, { useReducer } from 'react'
import Flex from '../../components/Flex'
import { Tabs, Card } from 'antd'
import {
  OverviewContext,
  defaultOverviewState,
  overviewReducer
} from './OverviewStateContext'
import styled from 'styled-components'
import Set from './Set'
import MundusStone from './MundusStone'
import Buff from './Buff'
import Skills from './Skills'
import { useMediaQuery } from 'react-responsive'

const { TabPane } = Tabs

export const MenuCard = styled.div`
  height: calc(100vh - 150px);
  max-width: ${(props: { minWidth?: string; isMobile: boolean }) =>
    props.isMobile ? '100%' : '50%'};
  margin-right: ${(props: { minWidth?: string; isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
  max-height: 90%;
  min-width: ${(props: { minWidth?: string; isMobile: boolean }) =>
    props.minWidth || '300px'};
  flex: 1;
`

export const Description = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

export const ContentCard = styled(Card)`
  height: calc(100vh - 150px);
  margin-left: 10px;
  max-height: 90%;
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
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <OverviewContext.Provider value={[state, dispatch]}>
      <Flex
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)'
        }}
        direction='column'
        align='center'
      >
        <Tabs
          style={{ width: '100%', height: '100%' }}
          defaultActiveKey='1'
          tabPosition='top'
          size='large'
        >
          <TabPane tab='Buff Food' key='1'>
            <Buff context={OverviewContext} buff={buff} isMobile={isMobile} />
          </TabPane>
          <TabPane tab='Mundus Stones' key='2'>
            <MundusStone
              mundusStone={mundusStone}
              context={OverviewContext}
              isMobile={isMobile}
            />
          </TabPane>
          <TabPane tab='Sets' key='3'>
            <Set
              selectedSet={selectedSet}
              context={OverviewContext}
              isMobile={isMobile}
            />
          </TabPane>
          <TabPane tab='Skills' key='4'>
            <Skills
              context={OverviewContext}
              skillLine={skillLine}
              isMobile={isMobile}
            />
          </TabPane>
        </Tabs>
      </Flex>
    </OverviewContext.Provider>
  )
}
