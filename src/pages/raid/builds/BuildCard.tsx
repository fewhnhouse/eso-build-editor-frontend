import React from 'react'
import { useDrag } from 'react-dnd'
import styled, { CSSProp, CSSProperties } from 'styled-components'
import SkillView from '../../../components/SkillView'
import { ABILITY_BAR_TWO, ABILITY_BAR_ONE } from '../../build/Skills/AbilityBar'
import { DisplaySlot } from '../../../components/SkillSlot'
import { Card, Divider, Collapse, Icon } from 'antd'
import GearView from '../../../components/GearView'
import { Tabs } from 'antd'
import Flex from '../../../components/Flex'

const { Panel } = Collapse

const { TabPane } = Tabs

const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.45);
`

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`

const AbilityBar = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean }) =>
    props.active ? 'rgb(21, 136, 246)' : 'rgb(232, 232, 232)'};
  background: ${(props: { active: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  margin: 10px;
`

export default ({ item, style }: { item: any; style?: CSSProperties }) => {
  const [{ isDragging, didDrop }, drag] = useDrag({
    item: {
      type: 'build',
      build: item,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    }),
  })
  return (
    <div style={style} ref={drag}>
      <StyledCard hoverable active={item.name === 'asd'}>
        <div>
          <Title>{item.name}</Title>
          <Divider style={{ margin: '5px 0px' }} />
          <Description>
            {item.esoClass} | {item.race}
          </Description>
          <Divider style={{ margin: '5px 0px' }} />
          <Tabs defaultActiveKey='skills'>
            <TabPane tab='Skills' key='skills'>
              <Flex style={{width: "100%"}}>
                <AbilityBar>
                  <SkillView
                    id={ABILITY_BAR_ONE}
                    disabled
                    skillSlots={item.newBarOne}
                  />
                  <DisplaySlot
                    style={{ marginLeft: 10 }}
                    skill={item.ultimateOne || undefined}
                  />
                </AbilityBar>
                <AbilityBar>
                  <SkillView
                    id={ABILITY_BAR_TWO}
                    disabled
                    skillSlots={item.newBarTwo}
                  />
                  <DisplaySlot
                    style={{ marginLeft: 10 }}
                    skill={item.ultimateTwo || undefined}
                  />
                </AbilityBar>
              </Flex>
            </TabPane>
            <TabPane tab='Weapons' key='weapons'>
              <GearView
                size='small'
                setups={[
                  {
                    id: 'frontbar',
                    label: 'Frontbar',
                    data: item.frontbarSelection,
                  },
                  {
                    id: 'backbar',
                    label: 'Backbar',
                    data: item.backbarSelection,
                  },
                ]}
              />
            </TabPane>
            <TabPane tab='Armor' key='armor'>
              {' '}
              <GearView
                size='small'
                setups={[
                  {
                    id: 'bigpieces',
                    label: 'Big Pieces',
                    data: item.bigPieceSelection,
                  },
                  {
                    id: 'smallpieces',
                    label: 'Small Pieces',
                    data: item.smallPieceSelection,
                  },
                ]}
              />
            </TabPane>
            <TabPane tab='Jewelry' key='jewelry'>
              <GearView
                size='small'
                setups={[
                  {
                    id: 'jewelry',
                    label: 'Jewelry',
                    data: item.jewelrySelection,
                  },
                ]}
              />
            </TabPane>
          </Tabs>
        </div>
      </StyledCard>
    </div>
  )
}
