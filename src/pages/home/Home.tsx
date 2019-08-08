import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Typography, Divider, Input } from 'antd'
import NotLoggedInHome from './NotLoggedInHome';
import LoggedInHome from './LoggedInHome';

const { Content } = Layout
const { Text } = Typography
const { Search } = Input;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 64px);
  color: ${props => props.theme.mainBg};
`

const StyledTitle = styled.h1`
  margin-top: 20px;
  font-size: 50px;
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

interface IHomeProps {
  loggedIn: boolean
}
const Home = ({loggedIn}: IHomeProps) => {
  return (
    <Container>
        { loggedIn ? 
          ""
        :
        <>
          <HomeHeader>
            <Search size="large" style={{maxWidth: "400px", maxHeight: "20px"}} placeholder="Search for builds and raids..." />
          </HomeHeader>
          <StyledTitle>Welcome to FIST Build Editor</StyledTitle>
            <Text style={{maxWidth: "400px"}}>
              Build Editor allows you to create and save builds and combine them to complete raid setups -
              to be shared with friends, guilds and communities, or saved privately as you choose.
            </Text>
            <Divider />
          </>
        }
    { loggedIn ? <LoggedInHome /> : <NotLoggedInHome /> }
    </Container>
  )
}

export default Home;
