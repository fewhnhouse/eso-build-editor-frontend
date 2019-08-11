import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Icon, Button, Input } from 'antd'
import Flex from '../../components/Flex'

const { Search } = Input

const { Title, Text } = Typography

const Wrapper = styled(Flex)`
  padding-top: 20px;
  width: 100%;
  flex-wrap: wrap;
`

const LeftSide = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  height: 300px;
  background-color: #d1d1d1;
`

const Center = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  height: 300px;
  background-color: #d1d1d1;
`
const StyledTitle = styled.h1`
  margin-top: 20px;
  font-size: 50px;
`

const RightSide = styled(Flex)`
  flex: 1;
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #d1d1d1;
  height: 300px;
`

const HomeHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  min-height: 100px;
  margin: 0;
  padding: 0;
  background-color: sandybrown;
`

const Content = styled.div`
  padding: 40px;
`

export default () => {
  return (
    <>
      <HomeHeader>
        <Search
          size='large'
          style={{ maxWidth: '400px' }}
          placeholder='Search for builds and raids...'
        />
      </HomeHeader>
      <Content>
        <StyledTitle>Welcome to FIST Build Editor</StyledTitle>
        <Text style={{ maxWidth: '400px' }}>
          Build Editor allows you to create and save builds and combine them to
          complete raid setups - to be shared with friends, guilds and
          communities, or saved privately as you choose.
        </Text>
        <Divider />

        <Wrapper direction={'row'} justify={''} align={'flex-start'}>
          <LeftSide direction={'column'} justify={'space-between'} align={''}>
            <Title level={3}>Builds</Title>
            <Text>Create, share, save and edit builds</Text>
            <Button type='primary' ghost={true}>
              Create
            </Button>
          </LeftSide>
          <Center direction={'column'} justify={'space-between'} align={''}>
            <Title level={3}>Overview</Title>
          </Center>
          <RightSide direction={'column'} justify={'space-between'} align={''}>
            <Title level={3}>Raids</Title>
            <Text>Create, share, save and edit raids</Text>
            <Button type='primary' ghost={true}>
              Create
            </Button>
          </RightSide>
        </Wrapper>
      </Content>
    </>
  )
}
