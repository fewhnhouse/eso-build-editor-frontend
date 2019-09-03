import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Card, Tabs } from 'antd'
import Flex from '../../components/Flex'
import UserHomeCard from './UserHomeCard'
import { wcdt } from '../../assets/backgrounds/index'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'

const { TabPane } = Tabs
const { Title } = Typography

const OuterWrapper = styled(Flex)`
  width: 100vw;
  height: 100%;
`
const Wrapper = styled(Flex)`
  flex-wrap: wrap;
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

const ImageContainer = styled.div`
  width: 100%;
  height: 15%;
  background-image: url(${wcdt});
  background-size: cover;
`

export default () => {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <OuterWrapper direction='row' justify='space-between' align='center' fluid>
      <Flex direction='column' style={{ width: '100%', height: '100%' }}>
        {!isMobile && <ImageContainer />}
        {isMobile ? (
          <div style={{flex: 1, height: "100%", width: "100%"}}>
            <Tabs style={{height: "100%"}}>
              <TabPane
                style={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
                tab='Builds'
                key='1'
              >
                <div style={{ flex: 1 }}>
                  <UserHomeCard isBuild />
                </div>
              </TabPane>
              <TabPane
                style={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
                tab='Raids'
                key='2'
              >
                <UserHomeCard isBuild={false} />
              </TabPane>
            </Tabs>
          </div>
        ) : (
          <Scrollbars autoHide>
            <Wrapper direction={'row'} justify='center' align='center' wrap>
              <UserHomeCard isBuild />
              <UserHomeCard isBuild={false} />
            </Wrapper>
          </Scrollbars>
        )}
      </Flex>
      {!isMobile && (
        <RightSide
          direction={'column'}
          justify={'flex-start'}
          align={'flex-end'}
        >
          <RightWrapper>
            <div style={{ height: '40%', padding: 5 }}>
              <Title level={4} style={{ paddingTop: '20px' }}>
                DISCOVERY
              </Title>
              <div style={{ overflowY: 'auto', height: '100%' }}>
                <Card title='Build Editor 1.0'>
                  Welcome to Build Editor Version 1.0! This version includes a
                  build and raid editor to create fully fledged ESO builds and
                  raids and to view and share them with your community.
                </Card>
              </div>
            </div>
            <Divider />
            <div style={{ height: '60%', padding: 5 }}>
              <Title level={4}>ACTIVITY</Title>
              {/*buildQuery.loading || raidQuery.loading ? <Spin /> : null}
            {buildQuery.data &&
              buildQuery.data.builds &&
              raidQuery.data &&
              raidQuery.data.builds && (
                <div style={{ overflowY: 'auto', height: 'calc(100% - 50px)' }}>
                  {buildQuery.data.builds.map((build: IBuild) => (
                    <Card title='You created a build'>Name: {build.name}</Card>
                  ))}
                  {raidQuery.data.raids.map((raid: any) => (
                    <Card title='You created a raid'>Name: {raid.name}</Card>
                  ))}
                </div>
                  )*/}
            </div>
          </RightWrapper>
        </RightSide>
      )}
    </OuterWrapper>
  )
}
