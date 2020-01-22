import React, { useContext, useState } from 'react'
import { Menu, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import castle from '../../../assets/icons/castle-ico.png'
import circle from '../../../assets/icons/circle-ico.png'
import hammer from '../../../assets/icons/hammer-ico.png'
import leaf from '../../../assets/icons/leaf-ico.png'
import myt from '../../../assets/icons/myt-ico.png'
import shield from '../../../assets/icons/shield-ico.png'
import helmet from '../../../assets/icons/helmet-ico.png'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import Scrollbars from 'react-custom-scrollbars'
import { Redirect } from 'react-router'
import { IBuildState, IBuildAction } from '../BuildStateContext'
const { SubMenu } = Menu

const EsoIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 10px;
`
export const classSkillLines = [
  {
    esoClass: 'Nightblade',
    items: [
      { title: 'Assassination', id: 10 },
      { title: 'Shadow', id: 11 },
      { title: 'Siphoning', id: 12 },
    ],
  },
  {
    esoClass: 'Sorcerer',
    items: [
      { title: 'Dark Magic', id: 7 },
      { title: 'Daedric Summoning', id: 8 },
      { title: 'Storm Calling', id: 9 },
    ],
  },
  {
    esoClass: 'Necromancer',
    items: [
      { title: 'Grave Lord', id: 54 },
      { title: 'Bone Tyrant', id: 55 },
      { title: 'Living Death', id: 56 },
    ],
  },
  {
    esoClass: 'Templar',
    items: [
      { title: 'Aedric Spear', id: 4 },
      { title: 'Dawn´s Wrath', id: 5 },
      { title: 'Restoring Light', id: 6 },
    ],
  },
  {
    esoClass: 'Dragonknight',
    items: [
      { title: 'Ardent Flame', id: 1 },
      { title: 'Draconic Power', id: 2 },
      { title: 'Earthen Heart', id: 3 },
    ],
  },
  {
    esoClass: 'Warden',
    items: [
      { title: 'Animal Companions', id: 13 },
      { title: 'Winter´s Embrace', id: 15 },
      { title: 'Green Balance', id: 14 },
    ],
  },
]

export const skillLines = [
  {
    title: 'Weapon',
    icon: shield,
    items: [
      { title: 'Two Handed', id: 16 },
      { title: 'One Hand and Shield', id: 17 },
      { title: 'Dual Wield', id: 18 },
      { title: 'Bow', id: 19 },
      { title: 'Destruction Staff', id: 20 },
      { title: 'Restoration Staff', id: 21 },
    ],
  },
  {
    title: 'Armor',
    icon: helmet,
    items: [
      { title: 'Light Armor', id: 22 },
      { title: 'Medium Armor', id: 23 },
      { title: 'Heavy Armor', id: 24 },
    ],
  },
  {
    title: 'World',
    icon: circle,
    items: [
      { title: 'Soul Magic', id: 25 },
      { title: 'Legerdemain', id: 28 },
      { title: 'Vampirism', id: 26 },
      { title: 'Werewolf', id: 27 },
    ],
  },
  {
    title: 'Guild',
    icon: myt,
    items: [
      { title: 'Mages Guild', id: 30 },
      { title: 'Fighters Guild', id: 29 },
      { title: 'Psijic Order', id: 34 },
      { title: 'Undaunted', id: 31 },
      { title: 'Thieves Guild', id: 32 },
      { title: 'Dark Brotherhood', id: 33 },
    ],
  },
  {
    title: 'Alliance War',
    icon: castle,
    items: [
      { title: 'Assault', id: 35 },
      { title: 'Support', id: 36 },
    ],
  },
  {
    title: 'Racial',
    icon: leaf,
    items: [
      { title: 'Breton', id: 44 },
      { title: 'Redguard', id: 45 },
      { title: 'Orc', id: 46 },
      { title: 'Nord', id: 47 },
      { title: 'Dunmer', id: 48 },
      { title: 'Argonian', id: 49 },
      { title: 'Altmer', id: 50 },
      { title: 'Bosmer', id: 51 },
      { title: 'Khajiit', id: 52 },
      { title: 'Imperial', id: 53 },
    ],
  },
  {
    title: 'Craft',
    icon: hammer,
    items: [
      { title: 'Alchemy', id: 37 },
      { title: 'Blacksmithing', id: 1 },
      { title: 'Clothing', id: 1 },
      { title: 'Enchanting', id: 1 },
      { title: 'Jewelry Crafting', id: 1 },
      { title: 'Provisioning', id: 1 },
      { title: 'Woodworking', id: 1 },
    ],
  },
]

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
