import React, { useContext } from 'react'
import styled from 'styled-components'
import { Layout, Menu, Icon, Dropdown, Avatar, Popover, Button } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { LoginContext } from '../App'
import WrappedNormalLoginForm from './LoginForm'

const { Header } = Layout
const { SubMenu, Item, ItemGroup } = Menu

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  background: white;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const getSelectedKey = (pathname: string, loggedIn: boolean) => {
  if (loggedIn) {
    if (pathname.includes('/builds')) return 'build:1'
    else if (pathname.includes('/buildEditor')) return 'build:2'
    else if (pathname.includes('/raids')) return 'raid:1'
    else if (pathname.includes('/raidEditor')) return 'raid:2'
  } else {
    if (pathname.includes('/builds')) return '2'
    else if (pathname.includes('/raids')) return '3'
  }
  if (pathname.includes('/overview')) return '4'
  return '1'
}
const LogoutMenu = ({ handleLogout }: { handleLogout: () => void }) => (
  <Menu>
    <Item>
      <Link to='/profile'>
        <Icon type='user' style={{ marginRight: 8 }} />
        Profile
      </Link>
    </Item>
    <Item onClick={handleLogout}>
      <Icon type='logout' />
      Log out
    </Item>
  </Menu>
)

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
      <div>
        {loggedIn ? (
          <Menu
            theme='light'
            mode='horizontal'
            defaultSelectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
            style={{ lineHeight: '64px' }}
          >
            <Item key='1'>
              <Link to='/'>Home</Link>
            </Item>

            <SubMenu
              key='2'
              title={
                <span>
                  <Icon type='setting' />
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
                  <Icon type='setting' />
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
        ) : (
          <Menu
            theme='light'
            mode='horizontal'
            defaultSelectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
            style={{ lineHeight: '64px' }}
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
        )}
      </div>
      {loggedIn ? (
        <div>
          <Avatar />
          <Dropdown overlay={<LogoutMenu handleLogout={handleLogout} />}>
            <span
              style={{
                margin: '0px 10px',
                cursor: 'pointer',
              }}
            >
              Hello, {me ? me.name : ''}
              <Icon type='down' style={{ marginLeft: 5 }} />
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
  )
}

export default withRouter(NavMenu)
