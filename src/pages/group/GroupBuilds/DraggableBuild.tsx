import React, { CSSProperties } from 'react'
import { Card, Avatar } from 'antd'
import styled from 'styled-components'
import { animated } from 'react-spring'
import { useDrag } from 'react-dnd'
import { IBuild } from '../../build/BuildStateContext'

const Description = styled.p`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: break-spaces;
  margin: 0;
`

const StyledCard = styled(Card)`
  text-align: left;
  width: ${(props: { width: string }) => props.width};
  height: 100px;
`

interface IDraggableRaidProps {
  build: IBuild
  dragType: string
  customWidth?: string
  style?: CSSProperties
}

export default ({
  build,
  dragType,
  style,
  customWidth = '300px',
}: IDraggableRaidProps) => {
  const [, drag] = useDrag({
    item: {
      type: dragType,
      build,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <animated.div
      ref={drag}
      style={{
        width: customWidth,
        margin: 5,
        ...style,
      }}
    >
      <StyledCard width={customWidth} key={build.id} hoverable>
        <Card.Meta
          avatar={
            <Avatar
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
            />
          }
          title={build.name}
          description={<Description>{build.description}</Description>}
        />
      </StyledCard>
    </animated.div>
  )
}
