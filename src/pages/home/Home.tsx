import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Typography, Divider } from 'antd'
import Flex from '../../components/Flex'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import NotLoggedInHome from './NotLoggedInHome';
import LoggedInHome from './LoggedInHome';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const { Content } = Layout
const { Title, Text } = Typography

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 178px);
  color: ${props => props.theme.mainBg};
`

const StyledTitle = styled.h1`
  margin-top: 20px;
  font-size: 50px;
`

interface IHomeProps {
  loggedIn: boolean
}
const Home = ({loggedIn}: IHomeProps) => {
/* client.cache.writeData({ data: { loggedIn: false } }); */
/* { userLogged }:any ? */
  return (
    <Container>
      <Divider>
        <StyledTitle>FIST Build Editor</StyledTitle>
      </Divider>
    { loggedIn ? <LoggedInHome /> : <NotLoggedInHome /> }
    </Container>
  )
}

export default Home;
