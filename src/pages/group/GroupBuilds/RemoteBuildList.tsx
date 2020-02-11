import React, { useContext } from 'react'
import { List, Empty } from 'antd'
import styled from 'styled-components'
import { useTrail } from 'react-spring'
import Scrollbars from 'react-custom-scrollbars'
import { useDrop } from 'react-dnd'
import { GroupContext } from '../GroupStateContext'
import { IBuild } from '../../build/BuildStateContext'
import DraggableBuild from './DraggableBuild'

const StyledScrollbars = styled(Scrollbars)`
  max-width: 300px;
  width: 100%;
  min-width: 300px;
`

const StyledEmpty = styled(Empty)`
  margin-top: ${props => props.theme.margins.medium};
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
  builds: IBuild[]
  loading?: boolean
  dropType: string
  dispatchType: string
}

export default ({
  builds,
  loading,
  dropType,
  dispatchType,
}: IRaidsListProps) => {
  const [, dispatch] = useContext(GroupContext)

  const trail = useTrail(builds.length, {
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
    drop: (
      dropContext: { type: 'addBuild' | 'removeBuild'; build: IBuild },
      monitor
    ) => {
      dispatch!({
        type: dispatchType,
        payload: { build: dropContext.build },
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
        {builds.length ? (
          <StyledList
            loading={loading}
            dataSource={trail}
            renderItem={(style: any, index) => {
              const build = builds[index]

              return (
                <DraggableBuild
                  customWidth='290px'
                  build={build}
                  style={style}
                  dragType={
                    dropType === 'addBuild' ? 'removeBuild' : 'addBuild'
                  }
                />
              )
            }}
          />
        ) : (
          <StyledEmpty description='No builds found.' />
        )}
      </StyledDropContainer>
    </StyledScrollbars>
  )
}
