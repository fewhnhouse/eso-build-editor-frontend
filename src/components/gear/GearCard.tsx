import React from 'react'
import { Card, Divider, Tag, Typography } from 'antd'
import styled from 'styled-components'
import { ISet } from './GearSlot'
import Flex from '../Flex'
import { totalBonus } from './util'

const StyledCard = styled(Card)`
  display: 'flex';
  margin: 0 auto;
  padding: 0;
  min-width: ${props => props.theme.widths.small};
  max-width: ${props => props.theme.widths.large};
  width: 100%;
  position: relative;
`

const Description = styled.div`
  font-size: ${(props: { big?: boolean }) => (props.big ? '16px' : '14px')};
  line-height: 1.5;
  margin-top: ${props => props.theme.margins.mini};
`

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`

const StyledSpan = styled.span`
  text-align: left;
  width: 100%;
  font-weight: ${(props: { bold: boolean }) =>
    props.bold ? 'bold' : 'normal'};
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.mini} 0px;
`

interface IGearCard {
  set: ISet
  size?: 'big' | 'normal'
  setSelectionCount: number
}

interface ISetTagProps {
  hasHeavyArmor: boolean
  hasMediumArmor: boolean
  hasLightArmor: boolean
  traitsNeeded: boolean
}

const ArmorTypeTag = ({
  hasHeavyArmor,
  hasMediumArmor,
  hasLightArmor,
  traitsNeeded,
}: ISetTagProps) => {
  if (traitsNeeded) {
    return null
  } else {
    if (hasHeavyArmor && hasMediumArmor && hasLightArmor) {
      return <StyledTag color='purple'>All</StyledTag>
    } else if (hasHeavyArmor) {
      return <StyledTag color='red'>Heavy</StyledTag>
    } else if (hasMediumArmor) {
      return <StyledTag color='green'>Medium</StyledTag>
    } else {
      return <StyledTag color='blue'>Light</StyledTag>
    }
  }
}

export default ({ set, setSelectionCount, size }: IGearCard) => {
  return (
    <StyledCard
      bordered={false}
      hoverable
      title={
        <Flex justify='space-between' align='center'>
          {size === 'big' ? (
            <Typography.Title level={3}>{set.name}</Typography.Title>
          ) : (
            set.name
          )}
          <Flex align='center' justify='flex-end'>
            <ArmorTypeTag
              hasHeavyArmor={set.has_heavy_armor === 1}
              hasMediumArmor={set.has_medium_armor === 1}
              hasLightArmor={set.has_light_armor === 1}
              traitsNeeded={set.traits_needed !== null}
            />
            <StyledTag color='#1890ff'>{set.type}</StyledTag>
          </Flex>
        </Flex>
      }
    >
      <Description big={size === 'big'}>
        <Flex direction='column' justify='flex-start'>
          {totalBonus(set).map(count => (
            <StyledSpan key={count} bold={count <= setSelectionCount}>
              <Flex align='center'>
                <Tag>{count} pcs</Tag>{' '}
                <span>{set && set[`bonus_item_${count}`]}</span>
              </Flex>
              <StyledDivider />
            </StyledSpan>
          ))}
        </Flex>
      </Description>
    </StyledCard>
  )
}
