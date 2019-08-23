import React, { useState } from 'react'
import { List, Tag, Divider, Input, Select, Button } from 'antd'
import styled from 'styled-components'
import { useTrail, animated } from 'react-spring'
import Flex from '../../../components/Flex'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import BuildCard from './BuildCard'
import { IBuild } from '../../build/BuildStateContext'
import { build } from '../../../util/fragments'
import { races, classes } from '../../build/RaceAndClass/data'
const { Option } = Select

const { CheckableTag } = Tag

const ListContainer = styled.div`
  width: 500px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const GET_BUILDS = gql`
  query builds(
    $where: BuildWhereInput
    $orderBy: BuildOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    builds(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      ...Build
    }
  }
  ${build}
`

export default () => {
  const [selectedRaces, setSelectedRaces] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)
  const [searchText, setSearchText] = useState('')

  // const [, dispatch] = useContext(RaidContext);
  const { loading, data } = useQuery<{ builds: IBuild[] }, {}>(GET_BUILDS, {
    variables: {
      where: {
        AND: [
          {
            race_in: selectedRaces.length
              ? selectedRaces
              : races.map(race => race.title),
          },
          {
            esoClass_in: selectedClasses.length
              ? selectedClasses
              : classes.map(esoClass => esoClass.title),
          },
        ],
      },
    },
  })

  const handleClassSelectChange = (classes: string[]) => {
    console.log(classes)
    setSelectedClasses(classes)
  }
  const handleRaceSelectChange = (races: string[]) => {
    console.log(races)
    setSelectedRaces(races)
  }

  const handleExpandChange = () => {
    setExpanded(expanded => !expanded)
  }
  const filteredBuilds =
    data && data.builds
      ? data.builds.filter((build: any) =>
          build.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : []
  const trail = useTrail(filteredBuilds.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 2000, friction: 300 },
  })
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <ListContainer>
      <>
        <Flex
          direction='column'
          justify='center'
          align='center'
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px 0px',
            padding: '5px',
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
              placeholder='Search for Builds'
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
                  margin: '10px 0px',
                }}
              />
              <Flex
                direction='row'
                justify='center'
                align='center'
                style={{ margin: '0px 10px', overflow: 'auto', width: '100%' }}
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%', margin: '5px 10px' }}
                  placeholder='Filter by class...'
                  onChange={handleClassSelectChange}
                >
                  {classes.map((esoClass, index) => (
                    <Option key={esoClass.title}>{esoClass.title}</Option>
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
                  placeholder='Filter by race...'
                  onChange={handleRaceSelectChange}
                >
                  {races.map((race, index) => (
                    <Option key={race.title}>{race.title}</Option>
                  ))}
                </Select>
              </Flex>
            </>
          )}
        </Flex>

        <List
          loading={loading}
          style={{
            height: '100%',
            overflow: 'auto',
          }}
          dataSource={trail}
          renderItem={(style: any, index) => {
            const item = filteredBuilds[index]
            return (
              <animated.div style={style}>
                <BuildCard item={item} />
              </animated.div>
            )
          }}
        />
      </>
    </ListContainer>
  )
}

interface IAttributeTagProps {
  hasMagicka: boolean
  hasStamina: boolean
  hasHealth: boolean
}

/* const AttributeTag = ({
  hasMagicka,
  hasStamina,
  hasHealth,
}: IAttributeTagProps) => {
  if (hasMagicka && hasStamina && hasHealth) {
    return <StyledTag color="purple">All</StyledTag>;
  } else if (hasHealth) {
    return <StyledTag color="red">Health</StyledTag>;
  } else if (hasStamina) {
    return <StyledTag color="green">Stamina</StyledTag>;
  } else {
    return <StyledTag color="blue">Magicka</StyledTag>;
  }
};

interface IBuffTagProps {
  isFood: boolean;
  isDrink: boolean;
  isSpecialFood: boolean;
  isSpecialDrink: boolean;
}
const BuffTypeTag = ({
  isFood,
  isDrink,
  isSpecialFood,
  isSpecialDrink,
}: IBuffTagProps) => {
  if (isFood) {
    return <StyledTag color="purple">Food</StyledTag>;
  } else if (isDrink) {
    return <StyledTag color="red">Drink</StyledTag>;
  } else if (isSpecialFood) {
    return <StyledTag color="green">Special Food</StyledTag>;
  } else {
    return <StyledTag color="blue">Special Drink</StyledTag>;
  }
};

const QualityTag = ({ quality }: { quality: number }) => {
  if (quality === 1) {
    return <StyledTag color="green">Standard</StyledTag>;
  } else if (quality === 2) {
    return <StyledTag color="blue">Difficult</StyledTag>;
  } else if (quality === 3) {
    return <StyledTag color="purple">Complex</StyledTag>;
  } else {
    return <StyledTag color="yellow">Legendary</StyledTag>;
  }
};*/
