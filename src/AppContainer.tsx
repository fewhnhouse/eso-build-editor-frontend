import React, { useState, useEffect } from 'react'
import './App.css'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import Routes from './components/Routes'
import styled from 'styled-components'
import {
  Layout,
  Menu,
  Button,
  Popover,
  Avatar,
  Spin,
  Dropdown,
  Icon,
} from 'antd'
import WrappedNormalLoginForm from './components/LoginForm'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const { Header } = Layout

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`

const LoadingContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
`

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-repeat: repeat;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const getSelectedKey = (pathname: string) => {
  if (pathname.includes('build')) return '2'
  else if (pathname.includes('raid')) return '3'
  return '1'
}

const ME = gql`
  query {
    me {
      email
      name
    }
  }
`

const AppContainer = ({ location }: RouteComponentProps<any>) => {
  const { loading, error, data } = useQuery(ME)
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  const handleLogout = () => {
    setLoggedIn(false)
    localStorage.removeItem('token')
  }
  useEffect(() => {
    if (data && data.me) {
      setLoggedIn(true)
    } else {
    }
  }, [data])
  useEffect(() => {
    if (error !== undefined) {
      setLoggedIn(false)
    }
  }, [error])
  if (loading) {
    return (
      <LoadingContainer>
        <Spin size='large' />
      </LoadingContainer>
    )
  }

  const logoutMenu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        <Icon type='logout' />
        Log out
      </Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <StyledHeader>
        <div>
          <Logo />
          {loggedIn ? (
            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={[getSelectedKey(location.pathname)]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key='1'>
                <Link to='/'>Home</Link>
              </Menu.Item>
              <Menu.Item key='2' disabled={error !== undefined}>
                <Link to='/build/0'>Build Editor</Link>
              </Menu.Item>
              <Menu.Item key='3' disabled={error !== undefined}>
                <Link to='/raid/0'>Raid Editor</Link>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={[getSelectedKey(location.pathname)]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key='1'>
                <Link to='/'>Home</Link>
              </Menu.Item>
            </Menu>
          )}
        </div>
        {loggedIn ? (
          <div>
            <Avatar />
            <Dropdown overlay={logoutMenu}>
              <span
                style={{
                  color: 'white',
                  margin: '0px 10px',
                  cursor: 'pointer',
                }}
              >
                Hello, {data && data.me ? data.me.name : ''}
                <Icon type='down' />
              </span>
            </Dropdown>
          </div>
        ) : (
          <Popover
            placement='bottomRight'
            title='Login'
            content={<WrappedNormalLoginForm setLoggedIn={setLoggedIn} />}
            trigger='click'
          >
            <Button
              style={{ float: 'right' }}
              type='primary'
              icon='user'
              size='large'
            >
              Login
            </Button>
          </Popover>
        )}
      </StyledHeader>
      <Routes isLoggedIn={loggedIn} />
    </Layout>
  )
}

export default withRouter(AppContainer)
