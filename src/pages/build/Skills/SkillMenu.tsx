import React, { useContext, useState } from 'react'
import { Menu, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import Scrollbars from 'react-custom-scrollbars'
import { Redirect } from 'react-router'
import { IBuildState, IBuildAction } from '../BuildStateContext'
import { classSkillLines, skillLines } from './skillLines'
const { SubMenu } = Menu

const EsoIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 10px;
`

const StyledIconBtn = styled(Button)`
  margin: ${props => props.theme.margins.small};
  height: 40px;
  width: 40px;
  margin-top: ${props => props.theme.margins.small};
`

const MenuContainer = styled.div`
  width: ${(props: { collapsed: boolean }) => (props.collapsed ? '60px' : '')};
  min-width: ${(props: { collapsed: boolean }) =>
    props.collapsed ? '' : '220px'};
  flex: ${(props: { collapsed: boolean }) => (props.collapsed ? '' : 1)};
  border: 1px solid rgb(217, 217, 217);
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledMenu = styled(Menu)`
  width: 100%;
  height: 100%;
  text-align: left;
  transition: opacity 0.2s ease-in-out;
  opacity: ${(props: { collapsed: boolean }) => (props.collapsed ? 0 : 1)};
  pointer-events: ${(props: { collapsed: boolean }) =>
    props.collapsed ? 'none' : 'all'};
`

interface ISkillMenuProps {
  context: React.Context<
    [(IBuildState | undefined)?, (React.Dispatch<IBuildAction> | undefined)?]
  >

  collapsable?: boolean
  singleClass?: boolean
  style?: React.CSSProperties
}

const SkillMenu = ({
  context,
  collapsable,
  singleClass,
  style,
}: ISkillMenuProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [state, dispatch] = useContext(context)
  const { skillLine, esoClass } = state!
  const [redirect, setRedirect] = useState('')
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const handleClick = (e: ClickParam) => {
    if (isMobile) {
      setRedirect(e.key || '')
    } else {
      dispatch!({
        type: 'SET_SKILLLINE',
        payload: { skillLine: parseInt(e.key, 10) },
      })
    }
  }

  const handleIconClick = (collapse: boolean) => () => {
    setCollapsed(collapse)
  }

  const myClass = classSkillLines.find(
    existingClass => existingClass.esoClass === esoClass
  )

  const shownClasses = singleClass
    ? [
        {
          title: myClass ? myClass.esoClass : 'Class',
          icon: `${process.env.REACT_APP_IMAGE_SERVICE}/classes/${
            myClass ? myClass.esoClass : ''
          }.png`,
          items: singleClass && myClass ? myClass.items : [],
        },
      ]
    : classSkillLines.map(esoClass => ({
        title: esoClass.esoClass,
        icon: `${process.env.REACT_APP_IMAGE_SERVICE}/classes/${
          esoClass ? esoClass.esoClass : ''
        }.png`,
        items: esoClass.items,
      }))
  const menuStructure = [...shownClasses, ...skillLines]

  return (
    <MenuContainer
      style={style}
      collapsed={collapsable !== undefined && collapsed}
    >
      {redirect && <Redirect to={`/overview/skillLines/${redirect}`} push />}
      {collapsable && (
        <StyledIconBtn
          type='primary'
          ghost
          onClick={handleIconClick(!collapsed)}
          icon={collapsed ? 'double-right' : 'double-left'}
        />
      )}
      <Scrollbars autoHide>
        <StyledMenu
          onClick={handleClick}
          collapsed={collapsed}
          defaultSelectedKeys={skillLine ? [skillLine + ''] : []}
          defaultOpenKeys={[]}
          mode='inline'
        >
          {menuStructure.map((menu, index) => (
            <SubMenu
              key={`sub${index}`}
              title={
                <Flex direction='row' justify='flex-start' align='center'>
                  <EsoIcon src={menu.icon} />
                  <span>{menu.title}</span>
                </Flex>
              }
            >
              {menu.items.map(
                (item: { id: number; title: string }, itemIndex: number) => (
                  <Menu.Item key={item.id}>{item.title}</Menu.Item>
                )
              )}
            </SubMenu>
          ))}
        </StyledMenu>
      </Scrollbars>
    </MenuContainer>
  )
}

export default SkillMenu
