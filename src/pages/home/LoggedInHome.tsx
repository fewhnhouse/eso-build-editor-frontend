import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Input, Card, Spin } from 'antd'
import Flex from '../../components/Flex'
import UserHomeCard from './UserHomeCard'
import { wcdt } from '../../assets/backgrounds/index'
import gql from 'graphql-tag'
import { build, raid } from '../../util/fragments'
import { useQuery } from 'react-apollo'
import { IBuild } from '../build/BuildStateContext'

const { Search } = Input
const { Title } = Typography

const OuterWrapper = styled(Flex)`
  width: 100%;
`
const Wrapper = styled(Flex)`
  padding: 40px;
  flex-wrap: wrap;
  width: 100%;
  z-index: 20;
  min-height: 100%;
  background: white;
  box-shadow: 0px -5px 5px 0px rgba(0, 0, 0, 0.35);
`

const InputContainer = styled(Flex)`
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 100px;
  min-height: 150px;
  padding: 20px;
`

const RightSide = styled(Flex)`
  height: 100%;
  z-index: 30;
  box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.35);
  flex: 1;
`

const RightWrapper = styled.div`
  height: 100%;
  box-shadow: -5px 0px 2px -2px rgba(0, 0, 0, 0.2);
  min-width: 300px;
`

const InnerContainer = styled(Flex)`
  width: 100%;
  padding-top: 50px;
  height: 100%;
  overflow: auto;
  background-image: url(${wcdt});
  background-size: cover;
`
const StyledSearch = styled(Search)`
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.35);
`
const ACTIVITY_BUILDS = gql`
  query builds($where: BuildWhereInput!) {
    builds(where: $where) {
      ...Build
    }
  }
  ${build}
`

const ACTIVITY_RAIDS = gql`
  query raids($where: RaidWhereInput!) {
    raids(where: $where) {
      ...Raid
    }
  }
  ${raid}
`
export default () => {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  const buildQuery = useQuery(ACTIVITY_BUILDS, {
    variables: {
      where: {
        OR: [
          { createdAt_gt: now.toISOString() },
          { updatedAt_gt: now.toISOString() },
        ],
      },
    },
  })
  const raidQuery = useQuery(ACTIVITY_RAIDS, {
    variables: {
      where: {
        OR: [
          { createdAt_gt: now.toISOString() },
          { updatedAt_gt: now.toISOString() },
        ],
      },
    },
  })
  console.log(buildQuery, raidQuery)

  return (
    <OuterWrapper
      direction='row'
      justify='space-between'
      align='center'
      wrap
      fluid
    >
      <InnerContainer
        direction='column'
        justify='center'
        align='center'
        wrap
        fluid
      >
        <Wrapper direction={'row'} justify='center' align='center' wrap>
          <UserHomeCard isBuild />
          <UserHomeCard isBuild={false} />
        </Wrapper>
      </InnerContainer>
      <RightSide direction={'column'} justify={'flex-start'} align={'flex-end'}>
        <RightWrapper>
          <div style={{ height: '40%', padding: 5 }}>
            <Title level={4} style={{ paddingTop: '20px' }}>
              DISCOVERY
            </Title>
            <div style={{ overflowY: 'auto', height: 'calc(100% - 50px)' }}>
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
            {buildQuery.loading || raidQuery.loading ? <Spin /> : null}
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
              )}
          </div>
        </RightWrapper>
      </RightSide>
    </OuterWrapper>
  )
}
