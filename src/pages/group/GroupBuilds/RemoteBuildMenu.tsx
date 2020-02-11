import React, { useState, useContext, useEffect } from 'react'
import { Divider, Input, Select, Empty } from 'antd'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { useQuery } from 'react-apollo'
import { GroupContext } from '../GroupStateContext'
import RemoteBuildList from './RemoteBuildList'
import { IBuild, IBuildRevision } from '../../build/BuildStateContext'
import { classes } from '../../build/RaceAndClass/data'
import { build } from '../../../util/fragments'
import gql from 'graphql-tag'
const { Option } = Select

const DETAILED_BUILD_REVISIONS = gql`
  query buildRevisions(
    $where: BuildRevisionWhereInput
    $orderBy: BuildRevisionOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    buildRevisions(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      builds(first: 1, orderBy: updatedAt_DESC) {
        ...Build
      }
    }
  }
  ${build}
`

const ListContainer = styled.div`
  width: 100%;
  max-width: 300px;
  min-width: 300px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledEmpty = styled(Empty)`
  margin-top: ${props => props.theme.margins.medium};
`

const StyledFlexOuter = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledInput = styled(Input)`
  width: 100%;
`

export function titleCase(str: string): string {
  const string = str.toLowerCase().split(' ')
  for (let i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1)
  }
  return string.join(' ')
}

export default () => {
  const [state, dispatch] = useContext(GroupContext)
  const { groupBuilds, currentClass } = state!

  const [searchText, setSearchText] = useState('')
  const [remoteBuilds, setRemoteBuilds] = useState<IBuild[]>([])
  // const [, dispatch] = useContext(RaidContext);
  const { loading, data } = useQuery<{ buildRevisions: IBuildRevision[] }, {}>(
    DETAILED_BUILD_REVISIONS,
    {
      variables: {
        where: {
          builds_some: {
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
                esoClass: currentClass,
              },
            ],
          },
        },
      },
    }
  )

  useEffect(() => {
    if (data && data.buildRevisions) {
      const newBuilds = data.buildRevisions.filter(remoteBuildRevision => {
        return !groupBuilds.find(
          groupBuild => groupBuild.build.id === remoteBuildRevision.builds[0].id
        )
      })
      setRemoteBuilds(newBuilds.map(buildRevision => buildRevision.builds[0]))
    }
  }, [groupBuilds, data])

  const handleClassSelectChange = (currentClass: string) => {
    dispatch!({ type: 'SET_CURRENT_CLASS', payload: { currentClass } })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <ListContainer>
      <>
        <StyledFlexOuter direction='column' justify='center' align='center'>
          <Select
            style={{ width: '100%', margin: '5px 10px' }}
            placeholder='Select class...'
            value={currentClass}
            onChange={handleClassSelectChange}
          >
            {classes.map((esoClass, index) => (
              <Option key={esoClass.title}>{esoClass.title}</Option>
            ))}
          </Select>
          <Divider style={{ margin: '5px 0px' }} />
          <StyledInput
            placeholder='Search for Builds'
            allowClear
            value={searchText}
            onChange={handleSearchChange}
            type='text'
          />
        </StyledFlexOuter>
        {data && data.buildRevisions && currentClass ? (
          <RemoteBuildList
            builds={remoteBuilds}
            loading={loading}
            dropType={'removeBuild'}
            dispatchType={'REMOVE_BUILD'}
          />
        ) : (
          <StyledEmpty description='Select a class' />
        )}
      </>
    </ListContainer>
  )
}
