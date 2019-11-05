import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Select, Divider } from 'antd'
import gql from 'graphql-tag'
import { raid } from '../../../util/fragments'
import { GroupContext, IGroupBuild } from '../GroupStateContext'
import { ISortedBuild } from '../../raid/RaidStateContext'
import BuildCard from '../../raid/builds/BuildCard'
import { applicationAreas } from '../../raid/general/RaidGeneral'

const { Option } = Select
export const RAID = gql`
  query Raids($id: ID!) {
    raid(id: $id) {
      ...Raid
    }
  }
  ${raid}
`
const StyledSelect = styled(Select)`
  width: 100%;
`
const AssignmentContainer = styled.div`
  width: 100%;
  height: 100%;
`

const BuildsContainer = styled(Flex)`
  width: 100%;
  overflow: auto;
`

const MembersContainer = styled(Flex)`
  width: 100%;
  height: 100px;
  overflow: auto;
  margin-bottom: ${props => props.theme.margins.medium};
`

export default () => {
  const [state] = useContext(GroupContext)
  const { raids } = state!

  const flattenedRaidBuilds = raids
    .map(raid => raid.roles)
    .flat()
    .map(roles => roles.builds)
    .flat()

  const uniqueRaidBuilds = flattenedRaidBuilds.reduce<ISortedBuild[]>(
    (prev, curr) =>
      prev.find(build => build.build.id === curr.build.id)
        ? prev
        : [...prev, curr],
    []
  )
  return (
    <AssignmentContainer>
      {applicationAreas.map(area => {
        const areaBuilds = uniqueRaidBuilds.filter(
          build => build.build.applicationArea === area.key
        )
        console.log(areaBuilds)

        return areaBuilds.length ? (
          <>
            <Divider>{area.label}</Divider>
            <BuildsContainer
              direction='row'
              justify='flex-start'
              align='center'
            >
              {areaBuilds.map(build => (
                <BuildCard
                  item={build.build}
                  draggable={false}
                  additionalContent={
                    <MemberSelector id={build.build.id || ''} />
                  }
                />
              ))}
            </BuildsContainer>
          </>
        ) : null
      })}
    </AssignmentContainer>
  )
}

const MemberSelector = ({ id }: { id: string }) => {
  const [state, dispatch] = useContext(GroupContext)
  const { members, groupBuilds, raids } = state!
  const [groupBuild, setGroupBuild] = useState<IGroupBuild | undefined>(
    undefined
  )

  useEffect(() => {
    const groupBuild = groupBuilds.find(member => member.build.id === id)
    if (!groupBuild) {
      const flattenedRaidBuilds = raids
        .map(raid => raid.roles)
        .flat()
        .map(roles => roles.builds)
        .flat()

      const uniqueRaidBuilds = flattenedRaidBuilds.reduce<ISortedBuild[]>(
        (prev, curr) =>
          prev.find(build => build.build.id === curr.build.id)
            ? prev
            : [...prev, curr],
        []
      )

      const build: ISortedBuild | undefined = uniqueRaidBuilds.find(
        sortedBuild => sortedBuild.build.id === id
      )

      if (build) {
        const newGroupBuild = { members: [], build: build.build }
        dispatch!({
          type: 'ADD_GROUP_BUILD',
          payload: { groupBuild: newGroupBuild },
        })
        setGroupBuild(newGroupBuild)
      }
    } else {
      setGroupBuild(groupBuild)
    }
  }, [groupBuilds, raids])
  const handleSelectChange = (values: unknown) => {
    dispatch!({
      type: 'SET_BUILD_MEMBERS',
      payload: { members: values, buildId: id },
    })
  }
  return (
    <MembersContainer align='center' direction='column'>
      <Divider>Members</Divider>
      <StyledSelect
        value={groupBuild ? groupBuild.members : []}
        onChange={handleSelectChange}
        size='large'
        mode='multiple'
      >
        {members.map(member => (
          <Option key={member}>{member}</Option>
        ))}
      </StyledSelect>
    </MembersContainer>
  )
}
