import React, { useContext, useState } from 'react'
import { useDrag } from 'react-dnd'
import styled, { CSSProperties } from 'styled-components'
import { Card, Divider, Button, Typography, Tooltip, Popover, Tag } from 'antd'
import { useMediaQuery } from 'react-responsive'
import Flex from '../../../components/Flex'
import { IBuild, ISetSelection } from '../../build/BuildStateContext'
import { IRole, RaidContext } from '../RaidStateContext'
import { Link } from 'react-router-dom'
import { ITheme } from '../../../components/theme'
import { ISet } from '../../../components/GearSlot'
import GearCard from '../../../components/GearCard'
import ExpandedInformation from './ExpandedInformation'
import { getSetsCount } from '../../build/Sets/Sets'

const Icon = styled.img`
  width: ${props => props.theme.smallIcon.width};
  height: ${props => props.theme.smallIcon.height};
  margin-right: ${props => props.theme.margins.mini};
  border-radius: ${(props: { isMundusStone: boolean; theme: ITheme }) =>
    props.isMundusStone ? props.theme.borderRadius : ''};
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

const MoreButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`

interface IBuildCardProps {
  item: IBuild
  style?: CSSProperties
  draggable?: boolean
  additionalContent?: React.ReactNode
  role?: IRole
}
export default ({
  item,
  style,
  draggable = true,
  role,
  additionalContent,
}: IBuildCardProps) => {
  return draggable ? (
    <WithDnD item={item} style={style} />
  ) : (
    <div style={style}>
      <BuildCard
        item={item}
        role={role}
        additionalContent={additionalContent}
      />
    </div>
  )
}

const WithDnD = ({ item, style }: IBuildCardProps) => {
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
      <BuildCard item={item} />
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

interface IBuildCardProps {
  item: IBuild
  role?: IRole
  additionalContent?: React.ReactNode
}
const BuildCard = ({ item, role, additionalContent }: IBuildCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [, dispatch] = useContext(RaidContext)
  const handleExpandClick = () => {
    setIsExpanded(expanded => !expanded)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })
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

  const setsCount = getSetsCount(
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    frontbarSelection,
    backbarSelection
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
        {!isExpanded && (
          <>
            <Divider />
            {sets.map(set => (
              <Popover
                style={{ padding: 0, margin: 0 }}
                key={set.id}
                content={
                  <GearCard size='normal' set={set} setSelectionCount={0} />
                }
              >
                <StyledTag>{set.name}</StyledTag>
              </Popover>
            ))}
          </>
        )}
        {isExpanded && (
          <ExpandedInformation setsCount={setsCount} id={item.id} />
        )}
      </div>
      {!isMobile && (
        <MoreButton
          onClick={handleExpandClick}
          icon={isExpanded ? 'minus' : 'plus'}
        />
      )}
      {additionalContent}
    </StyledCard>
  )
}
