import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Menu, Button, Avatar, Popover } from 'antd'
import styled from 'styled-components'
import { StyledMenu, getSelectedKey } from './Menu'
import Flex from '../Flex'
import LoginForm from '../LoginForm'
import { LogoutOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'

const { Item, SubMenu } = Menu

const StyledSubMenu = styled(SubMenu)`
  float: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'initial' : 'right'};
`

const StyledMenuNarrow = styled(Menu)`
  line-height: 64px;
`

const StyledFlexDesktop = styled(Flex)`
  width: 100%;
  height: 100%;
`

const getStyledIcon = (Icon: any) => styled(Icon)`
  margin-left: ${(props: any) => props.theme.margins.mini};
  font-size: 10px !important;
`

const StyledAvatar = styled(Avatar)`
  margin-right: ${(props: any) => props.theme.margins.mini};
`

const StyledUserIcon = styled(UserOutlined)`
  margin-right: 8px;
`

const StyledLoginButton = styled(Button)`
  float: right;
`

const StyledLogout = getStyledIcon(LogoutOutlined)
const StyledDown = getStyledIcon(DownOutlined)

interface IDesktopMenuProps extends RouteComponentProps<any> {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
  handleLogout: () => void
  isMobile: boolean
  me?: {
    name: string
  }
}
const DesktopMenu = ({
  loggedIn,
  setLoggedIn,
  handleLogout,
  isMobile,
  me,
  location,
}: IDesktopMenuProps) => {
  return (
    <StyledFlexDesktop direction={isMobile ? 'column' : 'row'} align='center'>
      {loggedIn ? (
        <>
          <StyledMenu
            theme='light'
            mode={isMobile ? 'inline' : 'horizontal'}
            selectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
          >
            <Item key='home'>
              <Link to='/'>Home</Link>
            </Item>
            <SubMenu
              key='build'
              title={
                <span>
                  Builds
                  <StyledDown />
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
              key='raid'
              title={
                <span>
                  Raids
                  <StyledDown />
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
            <SubMenu
              key='group'
              title={
                <span>
                  Groups
                  <StyledDown />
                </span>
              }
            >
              <Item key='group:1'>
                <Link to='/groups'>Groups</Link>
              </Item>
              <Item key='group:2'>
                <Link to='/groupEditor/0'>Group Editor</Link>
              </Item>
            </SubMenu>
            <SubMenu
              key='overview'
              title={
                <span>
                  Overview
                  <StyledDown />
                </span>
              }
            >
              <Item key='overview:1'>
                <Link to='/overview/0'>Buff Food</Link>
              </Item>
              <Item key='overview:2'>
                <Link to='/overview/1'>Mundus Stones</Link>
              </Item>
              <Item key='overview:3'>
                <Link to='/overview/2'>Sets</Link>
              </Item>
              <Item key='overview:4'>
                <Link to='/overview/3'>Skills</Link>
              </Item>
            </SubMenu>
          </StyledMenu>
          <StyledMenuNarrow
            theme='light'
            mode={isMobile ? 'inline' : 'horizontal'}
            selectedKeys={[
              location.pathname.includes('/profile') ? 'profile:1' : '',
            ]}
          >
            <StyledSubMenu
              key='profile'
              isMobile={isMobile}
              title={
                <span>
                  <StyledAvatar />
                  Hello, {me && me.name}
                  <StyledDown />
                </span>
              }
            >
              <Item key='profile:1'>
                <Link to='/profile'>
                  <StyledUserIcon type='user' />
                  Profile
                </Link>
              </Item>
              <Item onClick={handleLogout}>
                <StyledLogout />
                Log out
              </Item>
            </StyledSubMenu>
          </StyledMenuNarrow>
        </>
      ) : (
        <>
          <StyledMenu
            theme='light'
            mode='horizontal'
            selectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
          >
            <Item key='1'>
              <Link to='/'>Home</Link>
            </Item>
            <SubMenu
              key='overview'
              title={
                <span>
                  Overview
                  <StyledDown />
                </span>
              }
            >
              <Item key='overview:1'>
                <Link to='/overview/0'>Buff Food</Link>
              </Item>
              <Item key='overview:2'>
                <Link to='/overview/1'>Mundus Stones</Link>
              </Item>
              <Item key='overview:3'>
                <Link to='/overview/2'>Sets</Link>
              </Item>
              <Item key='overview:4'>
                <Link to='/overview/3'>Skills</Link>
              </Item>
            </SubMenu>
          </StyledMenu>
          <Popover
            placement='bottomRight'
            title='Login'
            content={<LoginForm />}
            trigger='click'
          >
            <StyledLoginButton
              type='primary'
              icon={<UserOutlined />}
              size='large'
            >
              Login
            </StyledLoginButton>
          </Popover>
        </>
      )}
    </StyledFlexDesktop>
  )
}

export default withRouter(DesktopMenu)
