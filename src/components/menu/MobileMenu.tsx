import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Menu, Divider, Icon } from 'antd'
import styled from 'styled-components'
import { StyledMenu, getSelectedKey } from './Menu'
import LoginForm from '../LoginForm'

const { Item, ItemGroup } = Menu

const StyledItem = styled(Item)`
  height: 350px !important;
`

interface IMobileMenuProps extends RouteComponentProps<any> {
  loggedIn: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
  handleLogout: () => void
  isMobile: boolean
}
const MobileMenu = ({
  loggedIn,
  setLoggedIn,
  setExpanded,
  handleLogout,
  isMobile,
  location,
}: IMobileMenuProps) => {
  const handleFoldBtnClick = () => {
    setExpanded(expanded => !expanded)
  }

  return loggedIn ? (
    <Scrollbars autoHide>
      <StyledMenu
        theme='light'
        mode={isMobile ? 'inline' : 'horizontal'}
        selectedKeys={[getSelectedKey(location.pathname, loggedIn)]}
      >
        <Item key='home'>
          <Link onClick={handleFoldBtnClick} to='/'>
            Home
          </Link>
        </Item>
        <Item key='overview'>
          <Link onClick={handleFoldBtnClick} to='/overview'>
            Overview
          </Link>
        </Item>
        <Divider />
        <ItemGroup key='build' title={<span>Builds</span>}>
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
        <ItemGroup key='raid' title={<span>Raids</span>}>
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
        <Item key='profile'>
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
        <StyledItem key='5'>
          <LoginForm setLoggedIn={setLoggedIn} />
        </StyledItem>
      </StyledMenu>
    </>
  )
}

export default withRouter(MobileMenu)