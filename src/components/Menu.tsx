import React, { useContext } from 'react'
import styled from 'styled-components'
import { Layout, Menu, Icon, Avatar, Popover, Button } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { LoginContext } from '../App'
import WrappedNormalLoginForm from './LoginForm'

const { Header } = Layout
const { SubMenu, Item } = Menu

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  background: white;
  z-index: 10;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const getSelectedKey = (pathname: string, loggedIn: boolean) => {
  if (loggedIn) {
    if (pathname.includes('/builds')) return 'build:1'
    else if (pathname.includes('/buildEditor') || pathname.includes("/editBuild")) return 'build:2'
    else if (pathname.includes('/raids')) return 'raid:1'
    else if (pathname.includes('/raidEditor') || pathname.includes("/editRaid")) return 'raid:2'
  } else {
    if (pathname.includes('/builds')) return '2'
    else if (pathname.includes('/raids')) return '3'
  }
  if (pathname.includes('/overview')) return '4'
  if (pathname.includes('/profile')) return ''
  return '1'
}

interface IMenuProps extends RouteComponentProps {
  me?: {
    name: string
    email: string
  }
}
const NavMenu = ({ me, location }: IMenuProps) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)

  const handleLogout = () => {
    setLoggedIn(false)
    localStorage.removeItem('token')
  }
  return (
    <StyledHeader>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: "center" }}>
        {loggedIn ? (
          <>
            <Menu
              theme='light'
              mode='horizontal'
              selectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
              style={{ lineHeight: '64px', width: '100%' }}
            >
              <Item key='1'>
                <Link to='/'>Home</Link>
              </Item>

              <SubMenu
                key='2'
                title={
                  <span>
                    Builds
                    <Icon type='down' style={{ marginLeft: 5, fontSize: 10 }} />
                  </span>
                }
              >
                <Item key='build:1'>
                  <Link to='/builds'>Builds</Link>
                </Item>
                <Item key='build:2'>
                  <Link to='/buildEditor/0'>Build Editor</Link>
                </Item>
              </SubMenu>
              <SubMenu
                key='3'
                title={
                  <span>
                    Raids
                    <Icon type='down' style={{ marginLeft: 5, fontSize: 10 }} />
                  </span>
                }
              >
                <Item key='raid:1'>
                  <Link to='/raids'>Raids</Link>
                </Item>
                <Item key='raid:2'>
                  <Link to='/raidEditor/0'>Raid Editor</Link>
                </Item>
              </SubMenu>

              <Item key='4'>
                <Link to='/overview'>Overview</Link>
              </Item>
            </Menu>
            <Menu
              theme='light'
              mode='horizontal'
              selectedKeys={[
                location.pathname.includes('/profile') ? 'profile:1' : '',
              ]}
              style={{ lineHeight: '64px' }}
            >
              <SubMenu
                key='5'
                style={{ float: 'right' }}
                title={
                  <span>
                    <Avatar style={{ marginRight: 5 }} />
                    Hello, {me && me.name}
                    <Icon type='down' style={{ marginLeft: 5, fontSize: 10 }} />
                  </span>
                }
              >
                <Item key='profile:1'>
                  <Link to='/profile'>
                    <Icon type='user' style={{ marginRight: 8 }} />
                    Profile
                  </Link>
                </Item>
                <Item onClick={handleLogout}>
                  <Icon type='logout' />
                  Log out
                </Item>
              </SubMenu>
            </Menu>
          </>
        ) : (
          <>
            <Menu
              theme='light'
              mode='horizontal'
              selectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
              style={{ lineHeight: '64px', width: '100%' }}
            >
              <Item key='1'>
                <Link to='/'>Home</Link>
              </Item>
              <Item key='2'>
                <Link to='/builds'>Builds</Link>
              </Item>
              <Item key='3'>
                <Link to='/raids'>Raids</Link>
              </Item>
              <Item key='4'>
                <Link to='/overview'>Overview</Link>
              </Item>
            </Menu>
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
          </>
        )}
      </div>
    </StyledHeader>
  )
}

export default withRouter(NavMenu)
