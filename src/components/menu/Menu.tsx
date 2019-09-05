import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Popover,
  Button,
  Divider,
  Typography,
  PageHeader,
} from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { LoginContext } from '../../App'
import WrappedNormalLoginForm from '../LoginForm'
import { useMediaQuery } from 'react-responsive'
import Flex from '../Flex'
import Scrollbars from 'react-custom-scrollbars'
import { ITheme } from '../theme'
import { AppContext } from '../AppContainer'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

const { Header } = Layout
const { SubMenu, Item, ItemGroup } = Menu

interface IStyledHeaderProps {
  expanded: boolean
  isTabletOrMobile: boolean
  theme: ITheme
}

const StyledPageHeader = styled(PageHeader)`
  width: 100%;
`
const StyledHeader = styled(Header)`
  display: flex;
  width: 100vw;
  flex-direction: ${(props: IStyledHeaderProps) =>
    props.isTabletOrMobile ? 'column' : 'row'};
  background: white;
  z-index: 10;
  align-items: center;
  justify-content: center;
  padding: ${(headerProps: IStyledHeaderProps) =>
    headerProps.expanded ? '0px' : ''};
  padding-right: ${(headerProps: IStyledHeaderProps) =>
    headerProps.isTabletOrMobile ? '0px' : headerProps.theme.paddings.small};
  padding-left: ${(headerProps: IStyledHeaderProps) =>
    headerProps.isTabletOrMobile ? '0px' : headerProps.theme.paddings.small};

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

export const StyledMenu = styled(Menu)`
  line-height: 64px;
  width: 100%;
`

const StyledMobileButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`

export const getSelectedKey = (pathname: string, loggedIn: boolean) => {
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
const NavMenu = ({ me, history }: IMenuProps) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const [expanded, setExpanded] = useState(false)
  const [appState] = useContext(AppContext)

  const handleLogout = () => {
    setLoggedIn(false)
    setExpanded(false)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (loggedIn) {
      setExpanded(false)
    }
  }, [loggedIn])

  const handleFoldBtnClick = () => {
    setExpanded(expanded => !expanded)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })
  return (
    <StyledHeader isTabletOrMobile={isMobile} expanded={expanded}>
      {isMobile && (
        <>
          <StyledPageHeader
            onBack={() => history.goBack()}
            title={appState!.headerTitle}
            subTitle={appState!.headerSubTitle}
          />
          <StyledMobileButton
            onClick={handleFoldBtnClick}
            size='large'
            icon={expanded ? 'menu-unfold' : 'menu-fold'}
          ></StyledMobileButton>
        </>
      )}
      {isMobile && expanded && (
        <MobileHeader isTabletOrMobile={isMobile} expanded={expanded}>
          <MobileMenu
            handleLogout={handleLogout}
            isMobile={isMobile}
            setExpanded={setExpanded}
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
          />
        </MobileHeader>
      )}
      {!isMobile && (
        <DesktopMenu
          handleLogout={handleLogout}
          isMobile={isMobile}
          setExpanded={setExpanded}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />
      )}
    </StyledHeader>
  )
}

export default withRouter(NavMenu)
