import React, { useContext, useState } from 'react'
import { Menu, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { BuildContext } from '../BuildStateContext'
import castle from '../../../assets/icons/castle-ico.png'
import circle from '../../../assets/icons/circle-ico.png'
import torch from '../../../assets/icons/torch-ico.png'
import hammer from '../../../assets/icons/hammer-ico.png'
import leaf from '../../../assets/icons/leaf-ico.png'
import myt from '../../../assets/icons/myt-ico.png'
import shield from '../../../assets/icons/shield-ico.png'
import helmet from '../../../assets/icons/helmet-ico.png'

import styled from 'styled-components'
import Flex from '../../../components/Flex'
const { SubMenu } = Menu

const EsoIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 10px;
`
const classes = [
  {
    class: 'Nightblade',
    items: [
      { title: 'Assassination', id: 10 },
      { title: 'Shadow', id: 11 },
      { title: 'Siphoning', id: 12 },
    ],
  },
  {
    class: 'Sorcerer',
    items: [
      { title: 'Dark Magic', id: 7 },
      { title: 'Daedric Summoning', id: 8 },
      { title: 'Storm Calling', id: 9 },
    ],
  },
  {
    class: 'Necromancer',
    items: [
      { title: 'Grave Lord', id: 54 },
      { title: 'Bone Tyrant', id: 55 },
      { title: 'Living Death', id: 56 },
    ],
  },
  {
    class: 'Templar',
    items: [
      { title: 'Aedric Spear', id: 4 },
      { title: 'Dawn´s Wrath', id: 5 },
      { title: 'Restoring Light', id: 6 },
    ],
  },
  {
    class: 'Dragonknight',
    items: [
      { title: 'Ardent Flame', id: 1 },
      { title: 'Draconic Power', id: 2 },
      { title: 'Earthen Heart', id: 3 },
    ],
  },
  {
    class: 'Warden',
    items: [
      { title: 'Animal Companions', id: 13 },
      { title: 'Winter´s Embrace', id: 15 },
      { title: 'Green Balance', id: 14 },
    ],
  },
]

const StyledIconBtn = styled(Button)`
  margin: 10px;
  height: 40px;
  width: 40px;
`

const MenuContainer = styled.div`
  width: ${(props: { collapsed: boolean }) => (props.collapsed ? '60px' : '')};
  flex: ${(props: { collapsed: boolean }) => (props.collapsed ? '' : 1)};
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  max-width: 256px;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

export default () => {
  const [collapsed, setCollapsed] = useState(false)
  const [state, dispatch] = useContext(BuildContext)
  const handleClick = (e: ClickParam) => {
    dispatch!({
      type: 'SET_SKILLLINE',
      payload: { skillLine: parseInt(e.key, 10) },
    })
  }

  const handleIconClick = (collapse: boolean) => () => {
    setCollapsed(collapse)
  }

  const myClass = classes.find(esoClass => esoClass.class === state!.class)

  const menuStructure = [
    {
      title: 'Class',
      icon: torch,
      items: myClass ? myClass.items : [],
    },
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
      items: [{ title: 'Assault', id: 35 }, { title: 'Support', id: 36 }],
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

  return (
    <MenuContainer collapsed={collapsed}>
      <StyledIconBtn
        type='primary'
        ghost
        style={{ marginTop: 10 }}
        onClick={handleIconClick(!collapsed)}
        icon={collapsed ? 'double-right' : 'double-left'}
      />
      <Menu
        onClick={handleClick}
        style={{
          width: '100%',
          height: '100%',
          overflowX: 'hidden',
          overflowY: 'auto',
          textAlign: 'left',
          opacity: collapsed ? 0 : 1,
          pointerEvents: collapsed ? "none" : "all",
          transition: "opacity 0.2s ease-in-out"
        }}
        defaultSelectedKeys={state!.skillLine ? [state!.skillLine + ''] : []}
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
      </Menu>
    </MenuContainer>
  )
}
