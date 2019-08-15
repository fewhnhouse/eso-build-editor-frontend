import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Icon, Button, Input } from 'antd'
import Flex from '../../components/Flex'
import { header } from '../../assets/backgrounds/index'

const { Search } = Input

const { Title, Text } = Typography

const Wrapper = styled(Flex)`
  display: flex;
  padding-top: 20px;
  flex-wrap: wrap;
`

const LeftSide = styled(Flex)`
  flex: 1;
  border-color: rgb(232, 232, 232);
  background: 'white';
  border-width: 2px;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  height: 300px;
  background-color: white;
  max-width: 400px;
`

const Center = styled(Flex)`
  flex: 1;
  border-color: rgb(232, 232, 232);
  background: 'white';
  border-width: 2px;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  height: 300px;
  background-color: white;
  max-width: 400px;
`
const StyledTitle = styled.h1`
  margin-top: 20px;
  font-size: 50px;
`

const RightSide = styled(Flex)`
  flex: 1;
  border-color: rgb(232, 232, 232);
  background: 'white';
  border-width: 2px;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
  height: 300px;
  max-width: 400px;
`

const HomeHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  min-height: 150px;
  margin: 0;
  padding: 0;
  background-image: url(${header});
  background-position: center;
`

const Content = styled.div`
  padding: 40px;
  width: 100%;
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
          Build Editor allows you to create and save builds and combine them to<br />
          complete raid setups - to be shared with friends, guilds and
          communities,<br /> or saved privately as you choose.
        </Text>
        <Divider />

        <Wrapper direction={'row'} align={'flex-start'}>
          <LeftSide direction={'column'} justify={'space-between'}>
            <Title level={3}>Builds</Title>
            <Text>Create, share, save and edit builds</Text>
          </LeftSide>
          <Center direction={'column'} justify={'space-between'}>
            <Title level={3}>Overview</Title>
          </Center>
          <RightSide direction={'column'} justify={'space-between'}>
            <Title level={3}>Raids</Title>
            <Text>Create, share, save and edit raids</Text>
          </RightSide>
        </Wrapper>
      </Content>
    </>
  )
}
