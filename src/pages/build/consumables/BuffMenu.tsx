import React, { useContext, useState } from 'react'
import { List, Tag, Divider, Card, Input, Button, Select } from 'antd'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { useTrail, animated } from 'react-spring'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { buff } from '../../../util/fragments'
import { titleCase } from '../../raid/builds/BuildMenu'
import Scrollbars from 'react-custom-scrollbars'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../../../components/theme'

const { Option } = Select

export interface ISpecialBuff {
  id?: string
  name: string
  buffDescription: string
  description: string
  duration: number
  notes: string
  icon: string
  type?: string
  buffType: string
  quality: 1 | 2 | 3 | 4
}

const GET_BUFFS = gql`
  query buffs($where: BuffWhereInput!) {
    buffs(where: $where) {
      ...Buff
    }
  }
  ${buff}
`
const ListContainer = styled.div`
  flex: 1;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const IconContainer = styled.div`
  padding-right: ${props => props.theme.icon.containerPadding};
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean, theme: ITheme }) =>
    props.active ? 'rgb(21, 136, 246)' : props.theme.mainBorderColor};
  background: ${(props: { active: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  margin: ${props => props.theme.margins.small};
`

const StyledFlex = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledInnerFlex = styled(Flex)`
  width: 100%;
`

const StyledExpandedFlex = styled(Flex)`
  margin: 0px ${props => props.theme.margins.small};
  overflow: auto;
  width: 100%;
`

const StyledList = styled(List)`
  height: 100%;
`

const StyledInput = styled(Input)`
  margin: 10px;
  width: 100%;
`

export const StyledTag = styled(Tag)`
  min-width: 50px;
  margin: ${props => props.theme.margins.mini};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Icon = styled.img`
  width: ${props => props.theme.icon.width};
  height: ${props => props.theme.icon.height};
  border-radius: ${props => props.theme.icon.borderRadius};
  border: ${props => props.theme.icon.border};
`

const StyledListFlex = styled(Flex)`
  width: 100%;
  margin: ${props => props.theme.margins.small} 0px;
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

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.normal};
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  text-overflow: ellipsis;
  text-align: left;
`

const ListWrapper = styled(Flex)`
  max-width: ${props => props.theme.widths.medium};
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.small} 0px;
`

const StyledDescription = styled(Description)`
  font-style: italic;
`

const buffTypes = [
  'Health Recovery',
  'Stamina Recovery',
  'Magicka Recovery',
  'Max Health',
  'Max Stamina',
  'Max Magicka',
]

const buffQualities = ['Standard', 'Difficult', 'Complex', 'Legendary']

interface IBuffMenuProps {
  context: React.Context<any>
}

export default ({ context }: IBuffMenuProps) => {
  const [expanded, setExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedQualities, setSelectedQualities] = useState<string[]>([])

  const handleExpandChange = () => {
    setExpanded(expanded => !expanded)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleTypeSelectChange = (types: string[]) => {
    setSelectedTypes(types)
  }
  const handleQualitySelectChange = (qualities: string[]) => {
    setSelectedQualities(qualities)
  }

  const { data, error, loading } = useQuery<{ buffs: ISpecialBuff[] }, {}>(
    GET_BUFFS,
    {
      variables: {
        where: {
          AND: [
            {
              OR: [
                { name_contains: searchText },
                { name_contains: searchText.toLowerCase() },
                { name_contains: searchText.toUpperCase() },
                { name_contains: titleCase(searchText) },
              ],
            },
            {
              quality_in: selectedQualities.length
                ? selectedQualities.map(
                    (v, index) => buffQualities.findIndex(q => q === v) + 1
                  )
                : buffQualities.map((value, index) => index + 1),
            },
            ...selectedTypes.map(type => ({ buffDescription_contains: type })),
          ],
        },
      },
    }
  )
  if (error) {
    return <div>Error.</div>
  }

  return (
    <ListContainer>
      <StyledFlex direction='column' justify='center' align='center'>
        <StyledInnerFlex direction='row' justify='center' align='center'>
          <StyledInput
            placeholder='Search for Food'
            allowClear
            value={searchText}
            onChange={handleSearchChange}
            size='large'
            type='text'
          />
          <Button
            size='large'
            icon={expanded ? 'shrink' : 'arrows-alt'}
            onClick={handleExpandChange}
          />
        </StyledInnerFlex>
        {expanded && (
          <>
            <StyledDivider />
            <StyledExpandedFlex direction='row' justify='center' align='center'>
              <Select
                mode='multiple'
                style={{ width: '100%', margin: '5px 10px' }}
                placeholder='Filter by type...'
                onChange={handleTypeSelectChange}
              >
                {buffTypes.map((type, index) => (
                  <Option key={type}>{type}</Option>
                ))}
              </Select>
            </StyledExpandedFlex>

            <StyledExpandedFlex direction='row' justify='center' align='center'>
              <Select
                mode='multiple'
                style={{ width: '100%', margin: '5px 10px' }}
                placeholder='Filter by quality...'
                onChange={handleQualitySelectChange}
              >
                {buffQualities.map((quality, index) => (
                  <Option key={quality}>{quality}</Option>
                ))}
              </Select>
            </StyledExpandedFlex>
          </>
        )}
      </StyledFlex>
      <BuffMenuList
        context={context}
        buffs={(data && data.buffs) || []}
        searchText={searchText}
        loading={loading}
      />
    </ListContainer>
  )
}

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
        renderItem={(style: any, index) => {
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
