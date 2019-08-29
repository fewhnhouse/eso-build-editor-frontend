import React, { useReducer, useState } from 'react'
import Flex from '../../components/Flex'
import { Tabs, Typography, Card, Divider, Modal } from 'antd'
import BuffMenu, {
  BuffTypeTag,
  AttributeTag,
  QualityTag,
} from '../build/consumables/BuffMenu'
import {
  OverviewContext,
  defaultOverviewState,
  overviewReducer,
} from './OverviewStateContext'
import MundusMenu from '../build/consumables/MundusMenu'
import styled from 'styled-components'
import SetMenu from '../build/Sets/SetMenu'
import MundusStone from './MundusStone'
const { TabPane } = Tabs

export const MenuCard = styled.div`
  height: calc(100vh - 200px);
  margin-right: 10px;
  max-height: 85%;
  min-width: ${(props: { minWidth?: string }) => props.minWidth || '300px'};
  flex: 1;
  max-width: 50%;
`

export const Description = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

export const ContentCard = styled(Card)`
  height: calc(100vh - 200px);
  margin-left: 10px;
  max-height: 85%;
  width: 100%;
  max-width: 70%;
  min-width: 50%;
  flex: 4;
`

export const Image = styled.img`
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
`



export default () => {
  const [state, dispatch] = useReducer(overviewReducer, defaultOverviewState)

  const { buff, mundusStone } = state
  return (
    <OverviewContext.Provider value={[state, dispatch]}>
      <Flex
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)',
        }}
        direction='column'
      >
        <Typography.Title>Overview</Typography.Title>
        <Tabs
          style={{ width: '100%', height: '100%' }}
          defaultActiveKey='1'
          tabPosition='top'
          size='large'
        >
          <TabPane tab='Buff Food' key='1'>
            <Flex
              direction='row'
              align='flex-start'
              style={{
                height: 'calc(100vh - 100px)',
                width: '100%',
                padding: 20,
              }}
            >
              <MenuCard minWidth='400px'>
                <BuffMenu context={OverviewContext} />
              </MenuCard>
              <ContentCard
                bodyStyle={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {buff && (
                  <Flex direction='row' align='flex-start' justify='center'>
                    <Image
                      src={
                        state.buff
                          ? `${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${state.buff.icon}`
                          : ''
                      }
                    />
                    <Flex
                      direction='column'
                      style={{ marginLeft: 20, maxWidth: 600 }}
                    >
                      <Typography.Title style={{ margin: 0 }}>
                        {buff.name}
                      </Typography.Title>
                      <Divider style={{ margin: '10px 0px' }} />
                      <Flex
                        direction='row'
                        wrap
                        style={{
                          width: '100%',
                          margin: '10px 0px',
                        }}
                      >
                        <AttributeTag
                          hasHealth={buff.buffDescription.includes('Health')}
                          hasMagicka={buff.buffDescription.includes('Magicka')}
                          hasStamina={buff.buffDescription.includes('Stamina')}
                        />
                        <BuffTypeTag
                          isSpecialDrink={
                            buff.buffType === 'drink' && buff.type === null
                          }
                          isSpecialFood={
                            buff.buffType === 'food' && buff.type === null
                          }
                          isFood={
                            buff.buffType === 'food' && buff.type !== null
                          }
                          isDrink={
                            buff.buffType === 'drink' && buff.type !== null
                          }
                        />
                        <QualityTag quality={buff.quality} />
                      </Flex>
                      <Description>{buff.buffDescription}</Description>
                      {buff.description && (
                        <>
                          <Divider style={{ margin: '5px 0px' }} />
                          <Description
                            style={{ fontStyle: 'italic' }}
                            newEffect
                          >
                            {buff.description}
                          </Description>
                        </>
                      )}
                    </Flex>
                  </Flex>
                )}
              </ContentCard>
            </Flex>
          </TabPane>
          <TabPane tab='Mundus Stones' key='2'>
            
            <MundusStone mundusStone={mundusStone} context={OverviewContext} />
          </TabPane>
          <TabPane tab='Sets' key='3'>
            <Flex
              direction='row'
              align='flex-start'
              style={{
                height: 'calc(100vh - 100px)',
                width: '100%',
                padding: 20,
              }}
            >
              <MenuCard>
                <SetMenu
                  collapsed={false}
                  setCollapsed={() => {}}
                  context={OverviewContext}
                />
              </MenuCard>
              <ContentCard>asd</ContentCard>
            </Flex>
          </TabPane>
          <TabPane tab='Skills' key='4'>
            <MenuCard>Skills</MenuCard>
          </TabPane>
        </Tabs>
      </Flex>
    </OverviewContext.Provider>
  )
}
