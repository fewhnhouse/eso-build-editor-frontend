import React, { useReducer } from 'react'
import Flex from '../../components/Flex'
import { Tabs, Typography, Card, Divider } from 'antd'
import BuffMenu, { BuffTypeTag, AttributeTag, QualityTag } from '../build/consumables/BuffMenu'
import {
  OverviewContext,
  defaultOverviewState,
  overviewReducer,
} from './OverviewStateContext'
import MundusMenu from '../build/consumables/MundusMenu'
import styled from 'styled-components'
import SetMenu from '../build/Sets/SetMenu'
const { TabPane } = Tabs

const MenuCard = styled.div`
  height: calc(100vh - 200px);
  margin-right: 10px;
  max-height: 85%;
  min-width: ${(props: { minWidth?: string }) => props.minWidth || '300px'};
  flex: 1;
  max-width: 50%;
`

const ContentCard = styled(Card)`
  height: calc(100vh - 200px);
  margin-left: 10px;
  max-height: 85%;
  width: 100%;
  max-width: 70%;
  min-width: 50%;
  flex: 4;
`

const Image = styled.img`
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
`

export default () => {
  const [state, dispatch] = useReducer(overviewReducer, defaultOverviewState)
  const {buff, mundusStone} = state;
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
              <ContentCard>
                {buff && (
                <Flex direction='row' align="flex-start">
                  <Image
                    src={
                      state.buff
                        ? `${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${state.buff.icon}`
                        : ''
                    }
                  />
                  <Flex direction='column' style={{ marginLeft: 20 }}>
                    <Typography.Title>
                      {buff.name}
                    </Typography.Title>
                    <Divider style={{margin: "10px 0px"}} />
                    <Flex direction="row" wrap
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
                        isFood={buff.buffType === 'food' && buff.type !== null}
                        isDrink={
                          buff.buffType === 'drink' && buff.type !== null
                        }
                      />
                      <QualityTag quality={buff.quality} />
                    </Flex>
                  </Flex>
                </Flex>
                )}

              </ContentCard>
            </Flex>
          </TabPane>
          <TabPane tab='Mundus Stones' key='2'>
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
                <MundusMenu context={OverviewContext} />
              </MenuCard>
              <ContentCard>
                <Flex>
                  <Image
                    src={
                      state.mundusStone
                        ? `${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${state.mundusStone.icon}`
                        : ''
                    }
                  />
                  <Typography.Title>
                    {state.mundusStone && state.mundusStone.name}
                  </Typography.Title>
                </Flex>
              </ContentCard>
            </Flex>
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
