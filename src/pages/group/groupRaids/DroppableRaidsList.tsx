import React, { useContext } from 'react'
import { List } from 'antd'
import styled from 'styled-components'
import { useTrail } from 'react-spring'
import Scrollbars from 'react-custom-scrollbars'
import { IRaidState } from '../../raid/RaidStateContext'
import { applicationAreas } from '../../build/RaceAndClass/RaceClass'
import { useDrop } from 'react-dnd'
import { GroupContext } from '../GroupStateContext'
import DraggableRaid from './DraggableRaid'

const StyledScrollbars = styled(Scrollbars)`
  max-width: 420px;
  width: 100%;
  min-width: 370px;
`

const StyledList = styled(List)`
  height: 100%;
`

const StyledDropContainer = styled.div`
  width: 100%;
  height: 100%;
  border: ${(props: { canDrop: boolean; dropType: string }) =>
    props.canDrop
      ? `2px dashed ${props.dropType === 'addRaid' ? '#1890ff' : '#ff4d4f'}`
      : ''};
  border-radius: 4px;
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
      <StyledDropContainer canDrop={canDrop} dropType={dropType} ref={drop}>
        <StyledList
          loading={loading}
          dataSource={trail}
          renderItem={(style: any, index) => {
            const raid = raids[index]
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
                style={style}
                dragType={dropType === 'addRaid' ? 'removeRaid' : 'addRaid'}
              />
            )
          }}
        />
      </StyledDropContainer>
    </StyledScrollbars>
  )
}
