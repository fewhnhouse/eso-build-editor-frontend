import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { useTrail, animated } from 'react-spring'
import Flex from '../../../../components/Flex'
import { ITheme } from '../../../../components/theme'
import { ISpecialBuff, StyledDivider } from './BuffMenu'
import { List, Tag, Card } from 'antd'

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.normal};
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  text-overflow: ellipsis;
  text-align: left;
`

export const StyledTag = styled(Tag)`
  min-width: 50px;
  margin: ${props => props.theme.margins.mini};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ListWrapper = styled(Flex)`
  max-width: ${props => props.theme.widths.medium};
`

const StyledListFlex = styled(Flex)`
  width: 100%;
  margin: ${props => props.theme.margins.small} 0px;
`

const Icon = styled.img`
  width: ${props => props.theme.icon.width};
  height: ${props => props.theme.icon.height};
  border-radius: ${props => props.theme.icon.borderRadius};
  border: ${props => props.theme.icon.border};
`

const Description = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean; theme: ITheme }) =>
    props.newEffect
      ? props.theme.description.newEffect
      : props.theme.description.notNewEffect};
  text-align: left;
`

const StyledList = styled(List)`
  height: 100%;
`

const StyledDescription = styled(Description)`
  font-style: italic;
`

const IconContainer = styled.div`
  padding-right: ${props => props.theme.icon.containerPadding};
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean; theme: ITheme }) =>
    props.active ? 'rgb(21, 136, 246)' : props.theme.mainBorderColor};
  background: ${(props: { active: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  margin: ${props => props.theme.margins.small};
`

interface IBuffMenuListProps {
  loading: boolean
  buffs: ISpecialBuff[]
  searchText: string
  context: React.Context<any>
}

const BuffMenuList = ({ buffs, loading, context }: IBuffMenuListProps) => {
  const [state, dispatch] = useContext(context)
  const { buff } = state!
  const [redirect, setRedirect] = useState('')
  const isMobile = useMediaQuery({ maxWidth: 800 })
  const handleClick = (buff: ISpecialBuff) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isMobile) {
      setRedirect(buff.id || '')
    } else {
      dispatch!({ type: 'SET_BUFF', payload: { buff } })
    }
  }

  const trail = useTrail(buffs.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 2000, friction: 300 },
  })
  return (
    <Scrollbars>
      {redirect && <Redirect to={`/overview/buffs/${redirect}`} push />}
      <StyledList
        loading={loading}
        dataSource={trail}
        renderItem={(style: any, index: number) => {
          const item = buffs[index]
          return (
            <animated.div style={style}>
              <StyledCard
                hoverable
                active={item.name === (buff && buff.name)}
                onClick={handleClick(item)}
              >
                <ListWrapper align='flex-start' direction='row'>
                  <IconContainer>
                    <Icon
                      title={item.name}
                      src={`${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${item.icon}`}
                    />
                  </IconContainer>
                  <div>
                    <Title>{item.name}</Title>

                    <StyledDivider />
                    <StyledListFlex wrap direction='row'>
                      <AttributeTag
                        hasHealth={item.buffDescription.includes('Health')}
                        hasMagicka={item.buffDescription.includes('Magicka')}
                        hasStamina={item.buffDescription.includes('Stamina')}
                      />
                      <BuffTypeTag
                        isSpecialDrink={
                          item.buffType === 'drink' && item.type === null
                        }
                        isSpecialFood={
                          item.buffType === 'food' && item.type === null
                        }
                        isFood={item.buffType === 'food' && item.type !== null}
                        isDrink={
                          item.buffType === 'drink' && item.type !== null
                        }
                      />
                      <QualityTag quality={item.quality} />
                    </StyledListFlex>
                    <Description>{item.buffDescription}</Description>
                    {item.description && (
                      <>
                        <StyledDivider />
                        <StyledDescription>
                          {item.description}
                        </StyledDescription>
                      </>
                    )}
                  </div>
                </ListWrapper>
              </StyledCard>
            </animated.div>
          )
        }}
      />
    </Scrollbars>
  )
}

interface IAttributeTagProps {
  hasMagicka: boolean
  hasStamina: boolean
  hasHealth: boolean
}

export const AttributeTag = ({
  hasMagicka,
  hasStamina,
  hasHealth,
}: IAttributeTagProps) => {
  if (hasMagicka && hasStamina && hasHealth) {
    return <StyledTag color='purple'>All</StyledTag>
  } else if (hasHealth) {
    return <StyledTag color='red'>Health</StyledTag>
  } else if (hasStamina) {
    return <StyledTag color='green'>Stamina</StyledTag>
  } else {
    return <StyledTag color='blue'>Magicka</StyledTag>
  }
}

interface IBuffTagProps {
  isFood: boolean
  isDrink: boolean
  isSpecialFood: boolean
  isSpecialDrink: boolean
}
export const BuffTypeTag = ({
  isFood,
  isDrink,
  isSpecialFood,
  isSpecialDrink,
}: IBuffTagProps) => {
  if (isFood) {
    return <StyledTag color='purple'>Food</StyledTag>
  } else if (isDrink) {
    return <StyledTag color='red'>Drink</StyledTag>
  } else if (isSpecialFood) {
    return <StyledTag color='green'>Special Food</StyledTag>
  } else {
    return <StyledTag color='blue'>Special Drink</StyledTag>
  }
}

export const QualityTag = ({ quality }: { quality: number }) => {
  if (quality === 1) {
    return <StyledTag color='green'>Standard</StyledTag>
  } else if (quality === 2) {
    return <StyledTag color='blue'>Difficult</StyledTag>
  } else if (quality === 3) {
    return <StyledTag color='purple'>Complex</StyledTag>
  } else {
    return <StyledTag color='yellow'>Legendary</StyledTag>
  }
}

export default BuffMenuList
