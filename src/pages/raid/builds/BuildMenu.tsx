import React, { useState } from 'react'
import { List, Divider, Input, Select, Button } from 'antd'
import styled from 'styled-components'
import { useTrail, animated } from 'react-spring'
import Flex from '../../../components/Flex'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import BuildCard from './BuildCard'
import { IBuild } from '../../build/BuildStateContext'
import { reducedBuild } from '../../../util/fragments'
import { races, classes } from '../../build/RaceAndClass/data'
import Scrollbars from 'react-custom-scrollbars'
const { Option } = Select

const ListContainer = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 370px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledFlexOuter = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledFlexInner = styled(Flex)`
  width: 100%;
`

const StyledInput = styled(Input)`
  width: 100%;
  margin: ${props => props.theme.paddings.small};
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.paddings.small} 0px;
`

const StyledFlexExpanded = styled(Flex)`
  margin: 0px ${props => props.theme.paddings.small};
  overflow: auto;
  width: 100%;
`

const StyledFlexExpandedSecond = styled(Flex)`
  margin: 0px ${props => props.theme.paddings.small};
  width: 100%;
`

const StyledScrollbars = styled(Scrollbars)`
  max-width: 420px;
  width: 100%;
  min-width: 370px;
`

const StyledList = styled(List)`
  height: 100%;
`

export function titleCase(str: string): string {
  let string = str.toLowerCase().split(' ')
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1)
  }
  return string.join(' ')
}

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
      ...ReducedBuild
    }
  }
  ${reducedBuild}
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
            OR: [
              { name_contains: searchText },
              { name_contains: searchText.toLowerCase() },
              { name_contains: searchText.toUpperCase() },
              { name_contains: titleCase(searchText) },
            ],
          },
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
    setSelectedClasses(classes)
  }
  const handleRaceSelectChange = (races: string[]) => {
    setSelectedRaces(races)
  }

  const handleExpandChange = () => {
    setExpanded(expanded => !expanded)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <ListContainer>
      <>
        <StyledFlexOuter direction='column' justify='center' align='center'>
          <StyledFlexInner direction='row' justify='center' align='center'>
            <StyledInput
              placeholder='Search for Builds'
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
          </StyledFlexInner>
          {expanded && (
            <>
              <StyledDivider />
              <StyledFlexExpanded
                direction='row'
                justify='center'
                align='center'
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
              </StyledFlexExpanded>

              <StyledFlexExpandedSecond
                direction='row'
                justify='center'
                align='center'
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
              </StyledFlexExpandedSecond>
            </>
          )}
        </StyledFlexOuter>
        <BuildsList
          expanded={expanded}
          loading={loading}
          builds={(data && data.builds) || []}
        />
      </>
    </ListContainer>
  )
}

interface IBuildsListProps {
  builds: IBuild[]
  loading: boolean
  expanded: boolean
}
const BuildsList = ({ builds, loading, expanded }: IBuildsListProps) => {
  const trail = useTrail(builds.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 2000, friction: 300 },
  })

  return (
    <StyledScrollbars autoHide>
      <StyledList
        loading={loading}
        dataSource={trail}
        renderItem={(style: any, index) => {
          const item = builds[index]
          return (
            <animated.div style={{ ...style, display: 'inline-flex' }}>
              <BuildCard item={item} />
            </animated.div>
          )
        }}
      />
    </StyledScrollbars>
  )
}
