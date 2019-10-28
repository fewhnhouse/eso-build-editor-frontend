import React, { useContext } from 'react'
import { Card, Icon, Typography } from 'antd'
import styled from 'styled-components'
import { useTrail } from 'react-spring'
import Scrollbars from 'react-custom-scrollbars'
import { IRaidState } from '../../raid/RaidStateContext'
import { applicationAreas } from '../../build/RaceAndClass/RaceClass'
import { useDrop } from 'react-dnd'
import { GroupContext } from '../GroupStateContext'
import DraggableRaid from './DraggableRaid'
import Flex from '../../../components/Flex'

const StyledScrollbars = styled(Scrollbars)``

const DropContainer = styled(Card)`
  width: 100%;
  height: calc(100% - 150px);
`

const RoleDropContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${(props: { canDrop: boolean }) =>
    `2px dashed ${props.canDrop ? '#1890ff' : '#d9d9d9'}`};
`
const StyledIcon = styled(Icon)`
  width: 100px;
  height: 100px;
  font-size: 50px;
`

const StyledRaidFlex = styled(Flex)`
  width: 100%;
  height: 150px;
  overflow-x: auto;
  overflow-y: hidden;
`

const StyledTitle = styled(Typography.Title)`
  color: #d9d9d9;
`

interface IRaidsListProps {
  raids: IRaidState[]
  loading?: boolean
  dropType: string
  dispatchType: string
}

export default ({
  raids,
  loading,
  dropType,
  dispatchType,
}: IRaidsListProps) => {
  const [, dispatch] = useContext(GroupContext)

  const trail = useTrail(raids.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 2000, friction: 300 },
  })

  const [{ canDrop }, drop] = useDrop({
    accept: dropType,
    drop: (raid: any, monitor) => {
      dispatch!({
        type: dispatchType,
        payload: { raid },
      })
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <StyledScrollbars autoHide>
      <StyledRaidFlex direction='row' align='center'>
        {raids.map(raid => {
          const size = raid.roles.reduce((prev, curr) => {
            return prev + curr.builds.length
          }, 0)
          const applicationArea = applicationAreas.find(
            area => area.key === raid.applicationArea
          )

          return (
            <DraggableRaid
              size={size}
              applicationArea={applicationArea ? applicationArea.label : ''}
              raid={raid}
              dragType={dropType === 'addRaid' ? 'removeRaid' : 'addRaid'}
            />
          )
        })}
      </StyledRaidFlex>
      <DropContainer bodyStyle={{ height: '100%' }}>
        <RoleDropContainer ref={drop} canDrop={canDrop}>
          <StyledIcon type='inbox' />
          <StyledTitle level={3}>Drag a raid here</StyledTitle>
        </RoleDropContainer>
      </DropContainer>
    </StyledScrollbars>
  )
}
