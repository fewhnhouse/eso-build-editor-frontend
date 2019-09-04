import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Layout, Menu, Icon, Avatar, Popover, Button, Divider } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { LoginContext } from '../App'
import WrappedNormalLoginForm from './LoginForm'
import { useMediaQuery } from 'react-responsive'
import Flex from './Flex'
import Scrollbars from 'react-custom-scrollbars'

const { Header } = Layout
const { SubMenu, Item, ItemGroup } = Menu

interface IStyledHeaderProps {
  expanded: boolean
  isTabletOrMobile: boolean
}
const StyledHeader = styled(Header)`
  display: flex;
  width: 100vw;
  flex-direction: ${(props: IStyledHeaderProps) =>
    props.isTabletOrMobile ? 'column' : 'row'};
  background: white;
  z-index: 10;
  align-items: center;
  padding: ${(headerProps: IStyledHeaderProps) =>
    headerProps.expanded ? '0px' : ''};
  padding-right: ${(headerProps: IStyledHeaderProps) =>
    headerProps.isTabletOrMobile ? '0px' : props => props.theme.paddings.small};
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const MobileHeader = styled.div`
  height: ${(props: IStyledHeaderProps) =>
    props.expanded ? 'calc(100% - 64px)' : '0px'};
  width: 100vw;
  position: fixed;
  transition: height 1s ease-in-out;
  top: 64px;
  z-index: 100;
  background: #ededed;
`

const StyledMenu = styled(Menu)`
  line-height: 64px;
  width: 100%;
`

const StyledSubMenu = styled(SubMenu)`
  float: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'initial' : 'right'};
`

const StyledMenuNarrow = styled(Menu)`
  line-height: 64px;
`

const StyledItem = styled(Item)`
  height: 350px;
`

const StyledFlexDesktop = styled(Flex)`
  width: 100%;
  height: 100%;
`

const StyledIcon = styled(Icon)`
  margin-left: ${props => props.theme.margins.mini};
  font-size: 10;
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

const StyledMobileButton = styled(Button)`
  position: absolute;
  top: 10;
  right: 10;
`

const getSelectedKey = (pathname: string, loggedIn: boolean) => {
  if (loggedIn) {
    if (pathname.includes('/builds')) return 'build:1'
    else if (
      pathname.includes('/buildEditor') ||
      pathname.includes('/editBuild')
    )
      return 'build:2'
    else if (pathname.includes('/raids')) return 'raid:1'
    else if (pathname.includes('/raidEditor') || pathname.includes('/editRaid'))
      return 'raid:2'
  } else {
    if (pathname.includes('/builds')) return '2'
    else if (pathname.includes('/raids')) return '3'
  }
  if (pathname.includes('/overview')) return '4'
  if (pathname.includes('/profile')) return 'profile:1'
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
  const [expanded, setExpanded] = useState(false)
  const handleLogout = () => {
    setLoggedIn(false)
    setExpanded(false)
    localStorage.removeItem('token')
  }

  const handleFoldBtnClick = () => {
    setExpanded(expanded => !expanded)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const MobileMenu = () =>
    loggedIn ? (
      <Scrollbars autoHide>
        <StyledMenu
          theme='light'
          mode={isMobile ? 'inline' : 'horizontal'}
          selectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
        >
          <Item key='1'>
            <Link onClick={handleFoldBtnClick} to='/'>
              Home
            </Link>
          </Item>
          <Item key='4'>
            <Link onClick={handleFoldBtnClick} to='/overview'>
              Overview
            </Link>
          </Item>
          <Divider />
          <ItemGroup key='2' title={<span>Builds</span>}>
            <Item key='build:1'>
              <Link onClick={handleFoldBtnClick} to='/builds'>
                Builds
              </Link>
            </Item>
            <Item key='build:2'>
              <Link onClick={handleFoldBtnClick} to='/buildEditor/0'>
                Build Editor
              </Link>
            </Item>
          </ItemGroup>
          <Divider />
          <ItemGroup key='3' title={<span>Raids</span>}>
            <Item key='raid:1'>
              <Link onClick={handleFoldBtnClick} to='/raids'>
                Raids
              </Link>
            </Item>
            <Item key='raid:2'>
              <Link onClick={handleFoldBtnClick} to='/raidEditor/0'>
                Raid Editor
              </Link>
            </Item>
          </ItemGroup>
          <Divider />
          <Item key='profile:1'>
            <Link onClick={handleFoldBtnClick} to='/profile'>
              <Icon type='user' />
              Profile
            </Link>
          </Item>
          <Item onClick={handleLogout}>
            <Icon type='logout' />
            Log out
          </Item>
        </StyledMenu>
      </Scrollbars>
    ) : (
      <>
        <StyledMenu
          theme='light'
          mode='inline'
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
          <Divider />
          <StyledItem>
            <WrappedNormalLoginForm setLoggedIn={setLoggedIn} />
          </StyledItem>
        </StyledMenu>
      </>
    )
  const DesktopMenu = () => (
    <StyledFlexDesktop direction={isMobile ? 'column' : 'row'} align='center'>
      {loggedIn ? (
        <>
          <StyledMenu
            theme='light'
            mode={isMobile ? 'inline' : 'horizontal'}
            selectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
          >
            <Item key='1'>
              <Link to='/'>Home</Link>
            </Item>
            <SubMenu
              key='2'
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
              key='3'
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
            <Item key='4'>
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
              key='5'
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
            content={<WrappedNormalLoginForm setLoggedIn={setLoggedIn} />}
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

  return (
    <StyledHeader isTabletOrMobile={isMobile} expanded={expanded}>
      {isMobile && (
        <StyledMobileButton
          onClick={handleFoldBtnClick}
          size='large'
          icon={expanded ? 'menu-unfold' : 'menu-fold'}
        ></StyledMobileButton>
      )}
      {isMobile && expanded && (
        <MobileHeader isTabletOrMobile={isMobile} expanded={expanded}>
          <MobileMenu />
        </MobileHeader>
      )}
      {!isMobile && <DesktopMenu />}
    </StyledHeader>
  )
}

export default withRouter(NavMenu)
