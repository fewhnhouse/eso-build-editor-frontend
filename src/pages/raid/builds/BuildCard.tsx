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
import { ITheme } from '../../../components/theme'

const { TabPane } = Tabs

const Icon = styled.img`
  width: ${props => props.theme.smallIcon.width};
  height: ${props => props.theme.smallIcon.height};
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
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 1.5;
  color: ${props => props.theme.colors.grey.medium};
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

const AbilityBarContainer = styled(Flex)`
  width: 100%;
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active?: boolean; theme: ITheme }) =>
    props.active ? 'rgb(21, 136, 246)' : props.theme.mainBorderColor};
  background: ${(props: { active?: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  max-width: ${props => props.theme.widths.medium};
  min-height: 80px;
  margin: ${props => props.theme.margins.small};
`

const StyledLink = styled(Link)`
  top: 10px;
  right: 10px;
  position: absolute;
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.mini} 0px;
`

const StyledTitle = styled(Typography.Title)`
  max-width: 350px;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const BuffTitle = styled.span`
  margin-bottom: ${props => props.theme.margins.mini};
  font-weight: bold;
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
  expand,
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
      build: item,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
    }),
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
  expand,
}: {
  item: IBuild
  role?: IRole
  expand: boolean
}) => {
  const [, dispatch] = useContext(RaidContext)
  const handleDeleteClick = () => {
    dispatch!({
      type: 'REMOVE_BUILD',
      payload: { buildId: item.id, name: role ? role.name : '' },
    })
  }
  const {
    frontbarSelection,
    backbarSelection,
    smallPieceSelection,
    bigPieceSelection,
    jewelrySelection,
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
          <StyledTitle level={3}>{item.name}</StyledTitle>
          {role ? (
            <Button
              type='danger'
              ghost
              icon='delete'
              onClick={handleDeleteClick}
            />
          ) : (
            <Tooltip title='Go to build'>
              <StyledLink to={`/builds/${item.id}`}>
                <Button ghost icon='select' type='primary' />
              </StyledLink>
            </Tooltip>
          )}
        </Flex>
        <Description direction='row' justify='flex-start'>
          <RaceClassContainer>
            <Icon
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${item.race}.png`}
            />
            {item.race}
          </RaceClassContainer>
          <RaceClassContainer>
            <Icon
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${item.esoClass}.png`}
            />
            {item.esoClass}
          </RaceClassContainer>
        </Description>
        {expand && (
          <>
            <StyledDivider />
            <Tabs defaultActiveKey={'skills'}>
              <TabPane tab='Skills' key='skills'>
                <AbilityBarContainer direction='column' align='center'>
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
                </AbilityBarContainer>
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
                        data: item.frontbarSelection,
                      },
                      {
                        id: 'backbar',
                        label: 'Backbar',
                        data: item.backbarSelection,
                      },
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
                        data: item.bigPieceSelection,
                      },
                      {
                        id: 'smallpieces',
                        label: 'Small Pieces',
                        data: item.smallPieceSelection,
                      },
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
                        data: item.jewelrySelection,
                      },
                    ]}
                  />
                </ScrollContainer>
              </TabPane>
              <TabPane tab='Mundus' key='mundus'>
                <Icon
                  src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${item.mundusStone.icon}`}
                />
                <BuffTitle>{item.mundusStone.name}</BuffTitle>
                <br />
                {item.mundusStone.effect} by {item.mundusStone.value}.
              </TabPane>
              <TabPane tab='Foodbuff' key='buff'>
                <Icon
                  src={`${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${item.buff.icon}`}
                />
                <BuffTitle>{item.buff.name}</BuffTitle>
                <br />
                {item.buff.buffDescription}
              </TabPane>
            </Tabs>
          </>
        )}
      </div>
    </StyledCard>
  )
}
