import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
import NotLoggedInHome from './NotLoggedInHome'
import LoggedInHome from './LoggedInHome'

const { Content } = Layout

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: hidden;
  height: 100%;
  color: ${props => props.theme.mainBg};
`

interface IHomeProps {
  loggedIn: boolean
}
const Home = ({ loggedIn }: IHomeProps) => {
  return (
    <Container>{loggedIn ? <LoggedInHome /> : <NotLoggedInHome />}</Container>
  )
}

export default Home
