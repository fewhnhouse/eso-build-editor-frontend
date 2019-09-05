import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
import NotLoggedInHome from './NotLoggedInHome'
import LoggedInHome from './LoggedInHome'
import { AppContext } from '../../components/AppContainer'

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
  const [, appDispatch] = useContext(AppContext)
  useEffect(() => {
    appDispatch!({ type: 'SET_HEADER_TITLE', payload: { headerTitle: 'Home' } })
  }, [appDispatch])
  return (
    <Container>{loggedIn ? <LoggedInHome /> : <NotLoggedInHome />}</Container>
  )
}

export default Home
