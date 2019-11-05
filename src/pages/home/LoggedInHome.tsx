import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Card, Tabs } from 'antd'
import Flex from '../../components/Flex'
import UserHomeCard from './UserHomeCard'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'
import UserGroupBar from './UserGroupBar'

const { TabPane } = Tabs
const { Title } = Typography

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

const RightSide = styled(Flex)`
  height: 100%;
  flex: 1;
`

const RightWrapper = styled.div`
  height: 100%;
  min-width: 300px;
`

const StyledDivDiscovery = styled.div`
  padding: ${props => props.theme.paddings.mini};
  height: 40%;
`
const StyledDivActivity = styled.div`
  padding: ${props => props.theme.paddings.mini};
  height: 60%;
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

const DiscoveryContent = styled.div`
  overflow-y: auto;
  height: 100%;
`

const StyledTitle = styled(Title)`
  padding: ${props => props.theme.paddings.medium};
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
            <MobileTabs>
              <StyledTabPane tab='Groups' key='1'>
                <UserGroupBar />
              </StyledTabPane>
              <StyledTabPane tab='Builds' key='2'>
                <UserCardWrapper>
                  <UserHomeCard isBuild />
                </UserCardWrapper>
              </StyledTabPane>
              <StyledTabPane tab='Raids' key='3'>
                <UserHomeCard isBuild={false} />
              </StyledTabPane>
            </MobileTabs>
          </MobileWrapper>
        ) : (
          <Scrollbars autoHide>
            <Wrapper justify='center' align='center' wrap>
              <UserGroupBar />
              <UserHomeCard isBuild />
              <UserHomeCard isBuild={false} />
            </Wrapper>
          </Scrollbars>
        )}
      </InnerWrapper>
      {!isMobile && (
        <RightSide direction='column' justify='flex-start' align='flex-end'>
          <RightWrapper>
            <StyledDivDiscovery>
              <StyledTitle level={4}>DISCOVERY</StyledTitle>
              <DiscoveryContent>
                <Card title='Build Editor 1.0'>
                  Welcome to Build Editor Version 1.0! This version includes a
                  build and raid editor to create fully fledged ESO builds and
                  raids and to view and share them with your community.
                </Card>
              </DiscoveryContent>
            </StyledDivDiscovery>
            <Divider />
            <StyledDivActivity>
              <StyledTitle level={4}>ACTIVITY</StyledTitle>
            </StyledDivActivity>
          </RightWrapper>
        </RightSide>
      )}
    </OuterWrapper>
  )
}
