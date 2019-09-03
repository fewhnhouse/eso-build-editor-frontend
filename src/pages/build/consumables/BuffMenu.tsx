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

const AvatarContainer = styled.div`
  padding-right: 16px;
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean }) =>
    props.active ? 'rgb(21, 136, 246)' : 'rgb(232, 232, 232)'};
  background: ${(props: { active: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  margin: 10px;
`

export const StyledTag = styled(Tag)`
  min-width: 100px;
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.45);
`

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  text-overflow: ellipsis;
  text-align: left;
`

const buffTypes = [
  'Health Recovery',
  'Stamina Recovery',
  'Magicka Recovery',
  'Max Health',
  'Max Stamina',
  'Max Magicka'
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
                { name_contains: titleCase(searchText) }
              ]
            },
            {
              quality_in: selectedQualities.length
                ? selectedQualities.map(
                    (v, index) => buffQualities.findIndex(q => q === v) + 1
                  )
                : buffQualities.map((value, index) => index + 1)
            },
            ...selectedTypes.map(type => ({ buffDescription_contains: type }))
          ]
        }
      }
    }
  )
  if (error) {
    return <div>Error.</div>
  }

  return (
    <ListContainer>
      <Flex
        direction='column'
        justify='center'
        align='center'
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px 0px',
          padding: '5px',
          transition: 'opacity 0.2s ease-in-out'
        }}
      >
        <Flex
          direction='row'
          justify='center'
          align='center'
          style={{ width: '100%' }}
        >
          <Input
            placeholder='Search for Food'
            allowClear
            value={searchText}
            onChange={handleSearchChange}
            size='large'
            type='text'
            style={{ margin: '10px', width: '100%' }}
          />
          <Button
            size='large'
            icon={expanded ? 'shrink' : 'arrows-alt'}
            onClick={handleExpandChange}
          />
        </Flex>
        {expanded && (
          <>
            <Divider
              style={{
                margin: '10px 0px'
              }}
            />
            <Flex
              direction='row'
              justify='center'
              align='center'
              style={{
                margin: '0px 10px',
                overflow: 'auto',
                width: '100%'
              }}
            >
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
            </Flex>

            <Flex
              direction='row'
              justify='center'
              align='center'
              style={{ margin: '0px 10px', width: '100%' }}
            >
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
            </Flex>
          </>
        )}
      </Flex>
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
      transform: 'translate(0px, -40px)'
    },
    config: { mass: 1, tension: 2000, friction: 300 }
  })
  return (
    <Scrollbars>
      {redirect && <Redirect to={`/overview/buffs/${redirect}`} push />}
      <List
        loading={loading}
        style={{
          height: '100%'
        }}
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
                <Flex
                  align='flex-start'
                  direction='row'
                  style={{ maxWidth: 400 }}
                >
                  <AvatarContainer>
                    <MyAvatar
                      title={item.name}
                      src={`${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${item.icon}`}
                    />
                  </AvatarContainer>
                  <div>
                    <Title>{item.name}</Title>

                    <Divider style={{ margin: '5px 0px' }} />
                    <Flex
                      wrap
                      direction='row'
                      style={{
                        width: '100%',
                        margin: '10px 0px'
                      }}
                    >
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
                    </Flex>
                    <Description>{item.buffDescription}</Description>
                    {item.description && (
                      <>
                        <Divider style={{ margin: '5px 0px' }} />
                        <Description style={{ fontStyle: 'italic' }} newEffect>
                          {item.description}
                        </Description>
                      </>
                    )}
                  </div>
                </Flex>
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
  hasHealth
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
  isSpecialDrink
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
