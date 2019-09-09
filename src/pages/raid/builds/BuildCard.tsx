import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import styled, { CSSProperties } from 'styled-components'
import SkillView from '../../../components/SkillView'
import { ABILITY_BAR_TWO, ABILITY_BAR_ONE } from '../../build/Skills/AbilityBar'
import { Card, Divider, Button, Typography, Tooltip, Popover, Tag } from 'antd'
import GearView from '../../../components/GearView'
import { Tabs } from 'antd'
import Flex from '../../../components/Flex'
import { IBuild, ISetSelection } from '../../build/BuildStateContext'
import { IRole, RaidContext } from '../RaidStateContext'
import { Link } from 'react-router-dom'
import { ITheme } from '../../../components/theme'
import { ISet } from '../../../components/GearSlot'
import GearCard from '../../../components/GearCard'

const { TabPane } = Tabs

const Icon = styled.img`
  width: ${props => props.theme.smallIcon.width};
  height: ${props => props.theme.smallIcon.height};
  margin-right: ${props => props.theme.margins.mini};
  border-radius: ${(props: { isMundusStone: boolean; theme: ITheme }) =>
    props.isMundusStone ? props.theme.borderRadius : ''};
`

const ScrollContainer = styled.div`
  overflow-y: auto;
  height: 250px;
`

const InfoContainer = styled(Flex)`
  margin-right: 10px;
  flex: 1;
  max-width: 25%;
`

const InfoLabel = styled.label`
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const StyledTag = styled(Tag)`
  margin-bottom: 5px;
`

const StyledTitle = styled(Typography.Title)`
  max-width: 350px;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const ShortInfo = ({
  icon,
  label,
  type,
}: {
  icon: string
  label: string
  type: string
}) => (
  <Tooltip title={label} trigger='hover'>
    <InfoContainer direction='column' align='center'>
      <Icon
        isMundusStone={type === 'mundusStones'}
        src={`${process.env.REACT_APP_IMAGE_SERVICE}/${type}/${icon}`}
      />
      <InfoLabel>{label}</InfoLabel>
    </InfoContainer>
  </Tooltip>
)

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

  const sets = concat.reduce(
    (prev: ISet[], curr: ISetSelection) => {
      const isExisting = prev.find(
        set => set && curr.selectedSet && set.name === curr.selectedSet.name
      )
      if (!isExisting) {
        return curr.selectedSet ? [...prev, curr.selectedSet] : prev
      } else {
        return prev
      }
    },
    [] as ISet[]
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
        <Description direction='row' justify='space-between'>
          <ShortInfo type='races' icon={`${item.race}.png`} label={item.race} />
          <ShortInfo
            type='classes'
            icon={`${item.esoClass}.png`}
            label={item.esoClass}
          />
          <ShortInfo
            type='mundusStones'
            icon={item.mundusStone.icon}
            label={item.mundusStone.name}
          />
          <ShortInfo
            type='buffs'
            icon={item.buff.icon}
            label={item.buff.name}
          />
        </Description>
        {!expand && (
          <>
            <Divider />
            {sets.map(set => (
              <Popover
                content={
                  <GearCard size='normal' set={set} setSelectionCount={0} />
                }
              >
                <StyledTag>{set.name}</StyledTag>
              </Popover>
            ))}
          </>
        )}
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
            </Tabs>
          </>
        )}
      </div>
    </StyledCard>
  )
}
