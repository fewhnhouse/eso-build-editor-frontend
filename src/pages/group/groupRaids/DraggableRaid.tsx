import React, { CSSProperties } from 'react'
import { Divider, Card, Icon, Typography } from 'antd'
import styled from 'styled-components'
import { animated } from 'react-spring'
import Flex from '../../../components/Flex'
import { IRaidState } from '../../raid/RaidStateContext'
import { useDrag } from 'react-dnd'
const { Text } = Typography

const Description = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.normal};
  line-height: 1.5;
  font-weight: 500;
  color: ${props => props.theme.colors.grey.dark};
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`

const StyledCard = styled(Card)`
  border-color: ${props => props.theme.mainBorderColor};
  background: 'white';
  border-width: 2px;
  margin: ${props => props.theme.margins.small};
  width: 90%;
  max-width: ${props => props.theme.widths.medium};
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.paddings.small} 0px;
`

interface IDraggableRaidProps {
  raid: IRaidState
  size: number
  dragType: string
  applicationArea: string
  style?: CSSProperties
}

export default ({
  raid,
  size,
  dragType,
  applicationArea,
  style,
}: IDraggableRaidProps) => {
  const [, drag] = useDrag({
    item: {
      type: dragType,
      id: raid.id,
      name: raid.name,
      applicationArea: raid.applicationArea,
      roles: raid.roles,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <animated.div
      ref={drag}
      style={{
        ...style,
        display: 'inline-flex',
        minWidth: 300,
        maxWidth: 500,
        width: '100%',
      }}
    >
      <StyledCard key={raid.id} hoverable>
        <Title>
          <Flex direction='row' justify='space-between'>
            {raid.name ? raid.name : 'Unnamed raid'}
            <Text>
              <Icon type='team' />
              {size}
            </Text>
          </Flex>
        </Title>
        <StyledDivider />
        <Description>{applicationArea}</Description>
      </StyledCard>
    </animated.div>
  )
}
