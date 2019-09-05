import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Menu, Button, PageHeader, Icon } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { LoginContext } from '../../App'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../theme'
import { AppContext } from '../AppContainer'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

const { Header } = Layout

interface IStyledHeaderProps {
  expanded: boolean
  isTabletOrMobile: boolean
  theme: ITheme
}


const MenuButton = styled(Button)`
  margin-right: 10px;
  width: 40px;
`
const StyledPageHeader = styled(PageHeader)`
  width: 100%;
  padding: 0px 10px;
  display: flex;
`
const StyledHeader = styled(Header)`
  display: flex;
  width: 100vw;
  flex-direction: row;
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
            backIcon={<Icon type="arrow-left" />}
            onBack={expanded ? undefined : () => history.goBack()}
            title={expanded ? 'Navigation' : appState!.headerTitle}
            subTitle={!expanded && appState!.headerSubTitle}
          />
          <MenuButton
            size='large'
            icon={expanded ? 'up' : 'down'}
            onClick={handleFoldBtnClick}
          ></MenuButton>
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
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />
      )}
    </StyledHeader>
  )
}

export default withRouter(NavMenu)
