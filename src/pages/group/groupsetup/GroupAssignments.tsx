import React, { useContext } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Select, Divider } from 'antd'
import gql from 'graphql-tag'
import { raid } from '../../../util/fragments'
import { useQuery } from 'react-apollo'
import { GroupContext } from '../GroupStateContext'
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
  const [state, dispatch] = useContext(GroupContext)
  const { raids, members } = state!

  const flattenedBuilds = raids
    .map(raid => raid.roles)
    .flat()
    .map(roles => roles.builds)
    .flat()

  const uniqueBuilds = flattenedBuilds.reduce<ISortedBuild[]>(
    (prev, curr) =>
      prev.find(build => build.build.id === curr.build.id)
        ? prev
        : [...prev, curr],
    []
  )
  return (
    <AssignmentContainer>
      {applicationAreas.map(area => {
        const areaBuilds = uniqueBuilds.filter(
          build => build.build.applicationArea === area.key
        )

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
  const { members, buildsMembers } = state!
  const buildMembers = buildsMembers.find(member => member.buildId === id)
  console.log(buildsMembers, buildMembers)
  if (!buildMembers) {
    return null
  }
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
        value={buildMembers.members}
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
