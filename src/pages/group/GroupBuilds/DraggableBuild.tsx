import React, { CSSProperties } from 'react'
import { Card, Avatar } from 'antd'
import styled from 'styled-components'
import { animated } from 'react-spring'
import { useDrag } from 'react-dnd'
import { IBuild } from '../../build/BuildStateContext'
import Flex from '../../../components/Flex'

const Description = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  width: 100%;
  color: #a7a1a1;
`

const Title = styled.h4`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`

const StyledCard = styled(Card)`
  text-align: left;
  width: ${(props: { width: string }) => props.width};
  min-width: 200px;
  height: 75px;
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
      <StyledCard
        bodyStyle={{
          padding: 12,
          display: 'flex',
          alignItems: 'center',
        }}
        width={customWidth}
        key={build.id}
        hoverable
      >
        <Avatar
          style={{ marginRight: 8 }}
          size='small'
          src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
        />
        <Flex direction='column' style={{ width: 'calc(100% - 40px)' }}>
          <Title title={build.name}>{build.name}</Title>
          <Description title={build.description}>
            {build.description || 'No Description'}
          </Description>
        </Flex>
      </StyledCard>
    </animated.div>
  )
}
