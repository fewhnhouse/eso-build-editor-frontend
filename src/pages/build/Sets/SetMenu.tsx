import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { List, Tag, Divider, Button, Input, Spin, Select } from 'antd'
import styled from 'styled-components'
import { ISet } from '../../../components/GearSlot'
import { BuildContext } from '../BuildStateContext'
import Flex from '../../../components/Flex'
import { animated, useTrail } from 'react-spring'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { titleCase } from '../../raid/builds/BuildMenu';

const { Option } = Select
const { Item } = List

const ListContainer = styled.div`
  width: ${(props: { collapsed: boolean }) => (props.collapsed ? '60px' : '')};
  flex: ${(props: { collapsed: boolean }) => (props.collapsed ? '' : 1)};
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  max-width: 450px;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledListItem = styled(Item)`
  cursor: pointer;
  display: flex;
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 5px;
  border-radius: 4px;
  padding: 10px 5px;
  &:hover > div {
    font-weight: 500;
  }
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
`

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledIconBtn = styled(Button)`
  margin: 10px;
  height: 40px;
  width: 40px;
`

const GET_SETS = gql`
  query sets($where: SetWhereInput) {
    sets(where: $where) {
      id
      setId
      name
      location
      type
      slug
      bonus_item_1
      bonus_item_2
      bonus_item_3
      bonus_item_4
      bonus_item_5
      has_jewels
      has_weapons
      has_heavy_armor
      has_light_armor
      has_medium_armor
      traits_needed
    }
  }
`

interface IMenuProps {
  collapsed: boolean
  collapsable?: boolean
  context: React.Context<any>
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const setTypes = [
  'Arena',
  'Monster Set',
  'Overland',
  'PvP',
  'Trial',
  'Dungeon',
  'Battleground',
  'Craftable',
]
const setWeight = ['Light', 'Medium', 'Heavy', 'Jewelry', 'Weapons']

export default ({
  collapsed,
  setCollapsed,
  context,
  collapsable,
}: IMenuProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedWeights, setSelectedWeights] = useState<string[]>([])
  const [searchText, setSearchText] = useState('')
  const [expanded, setExpanded] = useState(false)

  const { error, loading, data } = useQuery(GET_SETS, {
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
          ,
          {
            has_medium_armor:
              selectedWeights.length && selectedWeights.includes('Medium')
                ? 1
                : undefined,
          },
          {
            has_light_armor:
              selectedWeights.length && selectedWeights.includes('Light')
                ? 1
                : undefined,
          },
          {
            has_heavy_armor:
              selectedWeights.length && selectedWeights.includes('Heavy')
                ? 1
                : undefined,
          },
          {
            has_jewels:
              selectedWeights.length && selectedWeights.includes('Jewelry')
                ? 1
                : undefined,
          },
          {
            has_weapons:
              selectedWeights.length && selectedWeights.includes('Weapons')
                ? 1
                : undefined,
          },
          {
            type_in: selectedTypes.length
              ? [...selectedTypes, 'Unknown']
              : [...setTypes, 'Unknown'],
          },
        ],
      },
    },
  })

  if (error) {
    return <div>Error.</div>
  }

  console.log(data)

  const handleTypeSelectChange = (types: string[]) => {
    setSelectedTypes(types)
  }
  const handleWeightSelectChange = (weight: string[]) => {
    setSelectedWeights(weight)
  }
  const handleIconClick = (collapse: boolean) => () => {
    setCollapsed(collapse)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  const handleExpandChange = () => {
    setExpanded(expanded => !expanded)
  }
  return (
    <ListContainer collapsed={collapsed}>
      {collapsed && (
        <StyledIconBtn
          type='primary'
          ghost
          style={{ marginTop: 10 }}
          onClick={handleIconClick(false)}
          icon='double-right'
        />
      )}
      <>
        <Flex
          direction='column'
          justify='center'
          align='center'
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px 0px',
            padding: '5px',
            opacity: collapsed ? 0 : 1,
            pointerEvents: collapsed ? 'none' : 'all',
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          <Flex
            direction='row'
            justify='center'
            align='center'
            style={{ width: '100%' }}
          >
            <Input
              placeholder='Search for Sets'
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
            {collapsable && (
              <StyledIconBtn
                type='primary'
                ghost
                style={{ marginRight: 10 }}
                onClick={handleIconClick(true)}
                icon='double-left'
              />
            )}
          </Flex>
          {expanded && (
            <>
              <Divider
                style={{
                  margin: '10px 0px',
                }}
              />
              <Flex
                direction='row'
                justify='center'
                align='center'
                style={{
                  margin: '0px 10px',
                  overflow: 'auto',
                  width: '100%',
                }}
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%', margin: '5px 10px' }}
                  placeholder='Filter by type...'
                  onChange={handleTypeSelectChange}
                >
                  {setTypes.map((type, index) => (
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
                  placeholder='Filter by weight...'
                  onChange={handleWeightSelectChange}
                >
                  {setWeight.map((weight, index) => (
                    <Option key={weight}>{weight}</Option>
                  ))}
                </Select>
              </Flex>
            </>
          )}
        </Flex>
        {data && data.sets && (
          <SetList
            context={context}
            searchText={searchText}
            setSearchText={setSearchText}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            sets={data.sets}
            loading={loading}
          />
        )}
      </>
    </ListContainer>
  )
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

interface ISetListProps extends IMenuProps {
  sets: any[]
  loading: boolean
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
}

const SetList = ({
  sets,
  loading,
  collapsed,
  context,
  setCollapsed,
}: ISetListProps) => {
  const [state, dispatch] = useContext(context)

  const handleClick = (set: ISet) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCollapsed(true)
    dispatch!({ type: 'SET_ITEMSET', payload: { selectedSet: set } })
  }

  const trail = useTrail(sets.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 3000, friction: 100 },
  })
  return (
    <List
      loading={loading}
      style={{
        height: '100%',
        overflow: 'auto',
        opacity: collapsed ? 0 : 1,
        pointerEvents: collapsed ? 'none' : 'all',
        transition: 'opacity 0.2s ease-in-out',
      }}
      dataSource={trail}
      renderItem={(style: any, index) => {
        const item = sets[index]
        return (
          <animated.div style={style}>
            <StyledListItem onClick={handleClick(item)}>
              <div style={{ width: 140, display: 'flex' }}>
                <ArmorTypeTag
                  hasHeavyArmor={item.has_heavy_armor === 1}
                  hasMediumArmor={item.has_medium_armor === 1}
                  hasLightArmor={item.has_light_armor === 1}
                  traitsNeeded={item.traits_needed !== null}
                />
                <StyledTag color='geekblue'>{item.type}</StyledTag>
              </div>
              <div
                style={{
                  textAlign: 'left',
                  flex: 2,
                  fontWeight:
                    state!.selectedSet &&
                    item.setId === state!.selectedSet.setId
                      ? 500
                      : 400,
                }}
              >
                {item.name}
              </div>
            </StyledListItem>
          </animated.div>
        )
      }}
    />
  )
}
