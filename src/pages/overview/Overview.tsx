import React, { useReducer, useContext, useEffect, useState } from 'react'
import Flex from '../../components/Flex'
import { Tabs, Card } from 'antd'
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
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../../components/theme'
import { AppContext } from '../../components/AppContainer'
import { RouteComponentProps, Redirect } from 'react-router'
import { Helmet } from 'react-helmet'

const { TabPane } = Tabs

export const MenuCard = styled.div`
  height: calc(100vh - 100px);
  max-width: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '100%' : '50%'};
  margin-right: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
  max-height: 90%;
  min-width: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? props.theme.widths.small : props.theme.widths.medium};
  flex: 1;
`

export const Description = styled.div`
  font-size: ${(props) => props.theme.fontSizes.normal};
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
  border-radius: ${(props) => props.theme.borderRadius};
`

const StyledFlex = styled(Flex)`
  width: 100%;
  height: calc(100vh - 64px);
`

const StyledTabs = styled(Tabs)`
  width: 100%;
  height: 100%;
`

export default ({ match }: RouteComponentProps<{ tab: string }>) => {
  const [state, dispatch] = useReducer(overviewReducer, defaultOverviewState)
  const [, appDispatch] = useContext(AppContext)
  const [tab, setTab] = useState(match.params.tab || '0')
  const handleTabClick = (key: string) => {
    setTab(key)
  }

  useEffect(() => {
    setTab(match.params.tab)
  }, [match.params.tab])

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Overview' },
    })
    appDispatch!({
      type: 'SET_HEADER_SUBTITLE',
      payload: { headerSubTitle: '' },
    })
  }, [appDispatch])

  const { buff, mundusStone, selectedSet, skillLine } = state
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <OverviewContext.Provider value={[state, dispatch]}>
      <Helmet>
        <title>Overview</title>
      </Helmet>

      <StyledFlex direction='column' align='center'>
        <StyledTabs
          activeKey={tab}
          tabPosition='top'
          size='large'
          onTabClick={handleTabClick}
        >
          <TabPane tab='Buff Food' key='0'>
            <Buff context={OverviewContext} buff={buff} isMobile={isMobile} />
          </TabPane>
          <TabPane tab='Mundus Stones' key='1'>
            <MundusStone
              mundusStone={mundusStone}
              context={OverviewContext}
              isMobile={isMobile}
            />
          </TabPane>
          <TabPane tab='Sets' key='2'>
            <Set
              selectedSet={selectedSet}
              context={OverviewContext}
              isMobile={isMobile}
            />
          </TabPane>
          <TabPane tab='Skills' key='3'>
            <Skills
              context={OverviewContext}
              skillLine={skillLine}
              isMobile={isMobile}
            />
          </TabPane>
        </StyledTabs>
      </StyledFlex>
      <Redirect push to={`/overview/${tab}`} />
    </OverviewContext.Provider>
  )
}
