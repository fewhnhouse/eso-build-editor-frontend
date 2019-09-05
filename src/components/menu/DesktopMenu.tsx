import React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Menu, Icon, Button, Avatar, Popover } from 'antd'
import styled from 'styled-components'
import { StyledMenu, getSelectedKey } from './Menu'
import Flex from '../Flex'
import LoginForm from '../LoginForm'

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

const StyledIcon = styled(Icon)`
  margin-left: ${props => props.theme.margins.mini};
  font-size: 10px !important;
`

const StyledAvatar = styled(Avatar)`
  margin-right: ${props => props.theme.margins.mini};
`

const StyledUserIcon = styled(Icon)`
  margin-right: 8px;
`

const StyledLoginButton = styled(Button)`
  float: right;
`

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
                  <StyledIcon type='down' />
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
                  <StyledIcon type='down' />
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
            <Item key='overview'>
              <Link to='/overview'>Overview</Link>
            </Item>
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
                  <StyledIcon type='down' />
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
                <Icon type='logout' />
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
            <Item key='2'>
              <Link to='/builds'>Builds</Link>
            </Item>
            <Item key='3'>
              <Link to='/raids'>Raids</Link>
            </Item>
            <Item key='4'>
              <Link to='/overview'>Overview</Link>
            </Item>
          </StyledMenu>
          <Popover
            placement='bottomRight'
            title='Login'
            content={<LoginForm setLoggedIn={setLoggedIn} />}
            trigger='click'
          >
            <StyledLoginButton type='primary' icon='user' size='large'>
              Login
            </StyledLoginButton>
          </Popover>
        </>
      )}
    </StyledFlexDesktop>
  )
}

export default withRouter(DesktopMenu)
