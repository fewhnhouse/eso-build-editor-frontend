import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import styled, { CSSProperties } from 'styled-components'
import SkillView from '../../../components/SkillView'
import { ABILITY_BAR_TWO, ABILITY_BAR_ONE } from '../../build/Skills/AbilityBar'
import { Card, Divider, Button, Typography, Tooltip } from 'antd'
import GearView from '../../../components/GearView'
import { Tabs } from 'antd'
import Flex from '../../../components/Flex'
import { IBuild } from '../../build/BuildStateContext'
import { IRole, RaidContext } from '../RaidStateContext'
import { Link } from 'react-router-dom'

const { TabPane } = Tabs

const MyAvatar = styled.img`
  width: ${props => props.theme.smallAvatar.width};
  height: ${props => props.theme.smallAvatar.height};
  margin-right: ${props => props.theme.margins.mini};
`

const ScrollContainer = styled.div`
  overflow-y: auto;
  height: 250px;
`

const RaceClassContainer = styled.div`
  margin-right: 10px;
`

const Description = styled(Flex)`
  font-size: 14px;
  line-height: 1.5;
  color: 'rgba(0, 0, 0, 0.45)';
`

const AbilityBar = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active?: boolean }) =>
    props.active ? 'rgb(21, 136, 246)' : 'rgb(232, 232, 232)'};
  background: ${(props: { active?: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  max-width: ${props => props.theme.widths.medium};
  min-height: 80px;
  margin: ${props => props.theme.margins.small};
`
interface IBuildCardProps {
  item: IBuild
  style?: CSSProperties
  draggable?: boolean
  expand: boolean
  role?: IRole
}
export default ({
  item,
  style,
  draggable = true,
  role,
  expand
}: IBuildCardProps) => {
  return draggable ? (
    <WithDnD expand={expand} item={item} style={style} />
  ) : (
    <div style={style}>
      <BuildCard expand={expand} item={item} role={role} />
    </div>
  )
}

const WithDnD = ({ item, style, expand }: IBuildCardProps) => {
  const [, drag] = useDrag({
    item: {
      type: 'build',
      build: item
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop()
    })
  })
  return (
    <div style={style} ref={drag}>
      <BuildCard expand={expand} item={item} />
    </div>
  )
}

const BuildCard = ({
  item,
  role,
  expand
}: {
  item: IBuild
  role?: IRole
  expand: boolean
}) => {
  const [, dispatch] = useContext(RaidContext)
  const handleDeleteClick = () => {
    dispatch!({
      type: 'REMOVE_BUILD',
      payload: { buildId: item.id, name: role ? role.name : '' }
    })
  }
  const {
    frontbarSelection,
    backbarSelection,
    smallPieceSelection,
    bigPieceSelection,
    jewelrySelection
  } = item
  const concat = frontbarSelection.concat(
    backbarSelection,
    smallPieceSelection,
    bigPieceSelection,
    jewelrySelection
  )
  const setsCount = concat
    .map(setSelection =>
      setSelection.selectedSet ? setSelection.selectedSet.name : ''
    )
    .reduce<Map<string, number>>(
      (acc, curr) => acc.set(curr, 1 + (acc.get(curr) || 0)),
      new Map()
    )

  return (
    <StyledCard hoverable>
      <div>
        <Flex direction='row' justify='space-between'>
          <Typography.Title
            level={3}
            style={{
              maxWidth: 350,
              width: '80%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {item.name}
          </Typography.Title>
          {role ? (
            <Button
              type='danger'
              ghost
              icon='delete'
              onClick={handleDeleteClick}
            />
          ) : (
            <Tooltip title='Go to build'>
              <Link
                style={{ top: 10, right: 10, position: 'absolute' }}
                to={`/builds/${item.id}`}
              >
                <Button ghost icon='select' type='primary' />
              </Link>
            </Tooltip>
          )}
        </Flex>
        <Description direction='row' justify='flex-start'>
          <RaceClassContainer>
            <MyAvatar
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${item.race}.png`}
            />
            {item.race}
          </RaceClassContainer>
          <RaceClassContainer>
            <MyAvatar
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${item.esoClass}.png`}
            />
            {item.esoClass}
          </RaceClassContainer>
        </Description>
        {expand && (
          <>
            <Divider style={{ margin: '5px 0px' }} />
            <Tabs defaultActiveKey={'skills'}>
              <TabPane tab='Skills' key='skills'>
                <Flex direction='column' style={{ width: '100%' }}>
                  <AbilityBar>
                    <SkillView
                      id={ABILITY_BAR_ONE}
                      disabled
                      size='small'
                      ultimate={item.ultimateOne}
                      skillSlots={item.newBarOne}
                    />
                  </AbilityBar>
                  <AbilityBar>
                    <SkillView
                      size='small'
                      id={ABILITY_BAR_TWO}
                      disabled
                      skillSlots={item.newBarTwo}
                      ultimate={item.ultimateTwo}
                    />
                  </AbilityBar>
                </Flex>
              </TabPane>
              <TabPane tab='Weapons' key='weapons'>
                <ScrollContainer>
                  <GearView
                    setsCount={setsCount}
                    disabled
                    size='small'
                    setups={[
                      {
                        id: 'frontbar',
                        label: 'Frontbar',
                        data: item.frontbarSelection
                      },
                      {
                        id: 'backbar',
                        label: 'Backbar',
                        data: item.backbarSelection
                      }
                    ]}
                  />
                </ScrollContainer>
              </TabPane>
              <TabPane tab='Armor' key='armor'>
                <ScrollContainer>
                  <GearView
                    setsCount={setsCount}
                    disabled
                    size='small'
                    setups={[
                      {
                        id: 'bigpieces',
                        label: 'Big Pieces',
                        data: item.bigPieceSelection
                      },
                      {
                        id: 'smallpieces',
                        label: 'Small Pieces',
                        data: item.smallPieceSelection
                      }
                    ]}
                  />
                </ScrollContainer>
              </TabPane>
              <TabPane tab='Jewelry' key='jewelry'>
                <ScrollContainer>
                  <GearView
                    setsCount={setsCount}
                    disabled
                    size='small'
                    setups={[
                      {
                        id: 'jewelry',
                        label: 'Jewelry',
                        data: item.jewelrySelection
                      }
                    ]}
                  />
                </ScrollContainer>
              </TabPane>
            </Tabs>
          </>
        )}
      </div>
    </StyledCard>
  )
}
