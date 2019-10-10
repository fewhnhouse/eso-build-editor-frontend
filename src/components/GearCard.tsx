import React from 'react'
import { Card, Divider, Tag, Typography } from 'antd'
import styled from 'styled-components'
import { ISet, getItemType, getWeaponType } from './GearSlot'
import { ISetSelection } from '../pages/build/BuildStateContext'
import Flex from './Flex'

const StyledCard = styled(Card)`
  display: 'flex';
  margin: 0 auto;
  min-width: ${props => props.theme.widths.small}
  max-width: ${props => props.theme.widths.large}
  width: 100%;
  position: relative;
`

const Container = styled.div`
  width: 350px;
`

const Description = styled.div`
  font-size: ${(props: { big?: boolean }) => (props.big ? '16px' : '14px')};
  line-height: 1.5;
  margin-top: ${props => props.theme.margins.mini};
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

const SmallTitle = styled.div`
  color: ${props => props.theme.colors.grey.medium};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
  display: inline;
`

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`

const IconImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: ${props => props.theme.margins.mini};
`

const GlyphIconImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: ${props => props.theme.margins.mini};
`

const StyledSpan = styled.span`
  text-align: left;
  width: 100%;
  font-weight: ${(props: { bold: boolean }) =>
    props.bold ? 'bold' : 'normal'};
`

const StyledSpanColor = styled.span`
  color: ${props => props.theme.colors.grey.medium};
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.mini} 0px;
`

const StyledSetTitle = styled(Title)`
  display: flex;
  justify-content: space-between;
`

const StyledDescription = styled(Description)`
  display: flex;
  flex-direction: column;
  flex: 1;
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

const totalBonus = (set: ISet) => {
  if (set.bonus_item_5 !== null && set.bonus_item_4 !== null) {
    // 5 Piece Set
    return [2, 3, 4, 5]
  } else if (set.bonus_item_3 !== null) {
    // 3 Piece Set
    return [2, 3]
  } else if (set.bonus_item_1 !== null && set.bonus_item_2 !== null) {
    // Monster Set
    return [1, 2]
  } else {
    // Arena Weapon
    return [2]
  }
}

export default ({ set, setSelectionCount, size }: IGearCard) => {
  return (
    <StyledCard
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
              <Tag>{count} pcs</Tag> {set && set[`bonus_item_${count}`]}
              <StyledDivider />
            </StyledSpan>
          ))}
        </Flex>
      </Description>
    </StyledCard>
  )
}

interface IGearCardContent {
  gear: ISetSelection
  setSelectionCount: number
}

export const GearCardContent = ({
  gear,
  setSelectionCount,
}: IGearCardContent) => {
  const gearTypeTag = (gearType: string) => {
    switch (gearType) {
      case 'lightarmor':
        return <StyledTag color='blue'>Light</StyledTag>
      case 'mediumarmor':
        return <StyledTag color='green'>Medium</StyledTag>
      case 'heavyarmor':
        return <StyledTag color='red'>Heavy</StyledTag>
      case 'onehanded':
        return <StyledTag color='#108ee9'>Onehanded</StyledTag>
      case 'twohanded':
        return <StyledTag color='#108ee9'>Twohanded</StyledTag>
      default:
        return ''
    }
  }

  return (
    <Container>
      <StyledSetTitle>
        {gear.selectedSet ? gear.selectedSet.name : 'Set name'}{' '}
        {gear.type ? (
          <SmallTitle>
            {getItemType(gear.type)}
            {gear.weaponType ? ` - ${getWeaponType(gear.weaponType)}` : ''}
          </SmallTitle>
        ) : (
          ''
        )}
      </StyledSetTitle>
      {gear.type ? gearTypeTag(gear.type) : ''}
      <StyledTag color='#108ee9'>
        {gear.selectedSet ? gear.selectedSet.type : 'No type'}
      </StyledTag>
      <StyledDivider />
      <Description>
        <Flex direction='column'>
          {gear.selectedSet ? (
            totalBonus(gear.selectedSet).map(count => (
              <StyledSpan bold={count <= setSelectionCount} key={count}>
                {count} pcs:{' '}
                {gear.selectedSet && gear.selectedSet[`bonus_item_${count}`]}
              </StyledSpan>
            ))
          ) : (
            <span />
          )}
        </Flex>
      </Description>
      <StyledDivider />
      <Flex direction='column' justify='space-around' align='flex-start'>
        <StyledDescription>
          <Flex direction='row' justify='flex-start' align='center'>
            {gear.trait ? (
              <IconImg
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/traits/${encodeURI(
                  gear.trait.icon
                )}`}
              />
            ) : (
              'Trait not selected.'
            )}
            <b>{gear.trait ? gear.trait.type : ''}</b>
          </Flex>
          <StyledSpanColor>
            {gear.trait ? gear.trait.description : ''}
          </StyledSpanColor>
        </StyledDescription>
        <StyledDivider />
        <StyledDescription>
          <Flex direction='row' justify='flex-start' align='center'>
            {gear.glyph ? (
              <GlyphIconImg
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/glyphs/${encodeURI(
                  gear.glyph.icon
                )}`}
              />
            ) : (
              'Glyph not selected.'
            )}
            <b>{gear.glyph ? gear.glyph.type : ''}</b>
          </Flex>
          <StyledSpanColor>
            {gear.glyph ? gear.glyph.description : ''}
          </StyledSpanColor>
        </StyledDescription>
      </Flex>
    </Container>
  )
}
