import React from 'react'
import styled from 'styled-components'
import { Tabs } from 'antd'
import Flex from '../../components/Flex'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'
import UserGroupBar from './HorizontalGroupCards'
import HorizontalBuildCards from './HorizontalBuildCards'
import HorizontalRaidCards from './HorizontalRaidCards'
import BuildList from './BuildList'
import RaidList from './RaidList'
import gql from 'graphql-tag'
import GroupList from './GroupList'

export const ME = gql`
  query {
    me {
      id
      name
      builds {
        id
        owner {
          id
          name
        }
        name
        esoClass
        race
        applicationArea
      }
      raids {
        id
        owner {
          id
          name
        }
        name
        applicationArea
        roles {
          id
          builds {
            id
          }
        }
      }
    }
  }
`

const { TabPane } = Tabs

const OuterWrapper = styled(Flex)`
  width: 100vw;
  height: 100%;
`
const Wrapper = styled(Flex)`
  width: 100%;
  z-index: 20;
  min-height: 100%;
  background: white;
  box-shadow: 0px -5px 0px 0px rgba(0, 0, 0, 0.35);
`

const InnerWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
`

const MobileWrapper = styled(Flex)`
  flex: 1;
  height: 100%;
  width: 100%;
`

const MobileTabs = styled(Tabs)`
  height: 100%;
  width: 100%;
`

const StyledTabPane = styled(TabPane)`
  display: flex;
  height: 100%;
  flex-direction: 'row';
  justify-content: 'center';
  align-items: 'flex-start';
`

const UserCardWrapper = styled(Flex)`
  flex: 1;
`

export default () => {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <OuterWrapper direction='row' justify='space-between' align='center' fluid>
      <InnerWrapper direction='column'>
        {isMobile ? (
          <MobileWrapper>
            <MobileTabs tabBarStyle={{ margin: '0 auto' }}>
              <StyledTabPane tab='Groups' key='1'>
                <GroupList />
              </StyledTabPane>
              <StyledTabPane tab='Builds' key='2'>
                <UserCardWrapper>
                  <BuildList />
                </UserCardWrapper>
              </StyledTabPane>
              <StyledTabPane tab='Raids' key='3'>
                <RaidList />
              </StyledTabPane>
            </MobileTabs>
          </MobileWrapper>
        ) : (
          <Scrollbars autoHide>
            <Wrapper justify='center' align='center' wrap>
              <UserGroupBar />
              <HorizontalBuildCards />
              <HorizontalRaidCards />
            </Wrapper>
          </Scrollbars>
        )}
      </InnerWrapper>
    </OuterWrapper>
  )
}
