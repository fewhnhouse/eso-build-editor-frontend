import React, { useReducer } from 'react'
import Flex from '../../components/Flex'
import { Card } from 'antd'
import BuffMenu from '../build/consumables/BuffMenu'
import {
  OverviewContext,
  defaultOverviewState,
  overviewReducer,
} from './OverviewStateContext'
import MundusMenu from '../build/consumables/MundusMenu'
import styled from 'styled-components'
import SetMenu from '../build/Sets/SetMenu'

const ContentCard = styled.div`
  height: 500px;
  margin: 20px;
  min-width: 300px;
`
export default () => {
  const [state, dispatch] = useReducer(overviewReducer, defaultOverviewState)
  return (
    <OverviewContext.Provider value={[state, dispatch]}>
      <Flex
        style={{
          width: '100%',
          overflow: 'auto',
          minHeight: 'calc(100vh - 64px)',
        }}
        direction='column'
      >
        <Flex style={{ height: '500px', margin: 20 }} direction='row'>
          <ContentCard>
            <BuffMenu context={OverviewContext} />
          </ContentCard>
          <ContentCard>
            <MundusMenu context={OverviewContext} />
          </ContentCard>
        </Flex>
        <Flex style={{ height: '500px', margin: 20 }} direction='row'>
          <ContentCard>
            <BuffMenu context={OverviewContext} />
          </ContentCard>
          <ContentCard>
            <SetMenu
              collapsed={false}
              setCollapsed={() => {}}
              context={OverviewContext}
            />
          </ContentCard>
        </Flex>
      </Flex>
    </OverviewContext.Provider>
  )
}
