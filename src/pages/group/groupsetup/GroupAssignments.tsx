import React, { useContext } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Select, Icon } from 'antd'
import gql from 'graphql-tag'
import { raid } from '../../../util/fragments'
import { useQuery } from 'react-apollo'
import { GroupContext } from '../GroupStateContext'

const { Option } = Select

export const RAID = gql`
  query Raids($id: ID!) {
    raid(id: $id) {
      ...Raid
    }
  }
  ${raid}
`

const RaidCardsWrapper = styled(Flex)`
  width: 100%;
`

const RoleWrapper = styled(Flex)`
  width: 100%;
`

const RoleInnerCard = styled(Card)`
  width: ${props => props.theme.widths.small};
  margin: ${props => props.theme.margins.mini};
`

interface IGroupAssignments {
  useRaid?: string
}

export default ({ useRaid }: IGroupAssignments) => {
  const raidQuery = useQuery(RAID, { variables: { id: useRaid } })
  const singleRaid = raidQuery.data ? raidQuery.data.raid : ''

  const [state, dispatch] = useContext(GroupContext)
  const { name, members } = state!

  const handlePrimaryChange = (build: string) => (selectedMembers: []) => {
    members.map((member, index) => {
      if (selectedMembers[index] === member.memberName) {
        member.assignedRoles.push({ build: build, priority: 'primary' })
      }
      console.log(member.assignedRoles)
    })
    /*cconst newRole = { build: build, priority: 'primary' }
    index ? members[index].assignedRoles.push(newRole) : ''
    dispatch!({
      type: 'SET_PRIMARY_ROLE',
      payload: { assignedRoles: members[index].assignedRoles },
    })*/
  }

  const handleSecondaryChange = () => {
    dispatch!({
      type: 'SET_GROUP_MEMBERS',
      payload: { members: members },
    })
  }

  return (
    <RaidCardsWrapper
      direction='column'
      align='center'
      justify={raidQuery.loading ? 'center' : undefined}
    >
      {raidQuery.loading ? (
        <Icon type='loading' />
      ) : raidQuery.data && raidQuery.data.raid ? (
        <>
          <h3>{name}</h3>
          <h3>Assign members to roles in "{singleRaid.name}"</h3>
          {singleRaid.roles.map((role: any) => (
            <>
              <h3>{role.name}</h3>
              <RoleWrapper direction='row' justify='center' wrap>
                {role.builds.map((sortedBuild: any) => (
                  <RoleInnerCard type='inner' title={sortedBuild.build.name}>
                    <span>Primary members:</span>
                    <Select
                      onChange={handlePrimaryChange(sortedBuild.build.name)}
                      mode='multiple'
                      style={{ width: '100%' }}
                    >
                      {members.map(member => (
                        <Option value={member.memberName}>
                          {member.memberName}
                        </Option>
                      ))}
                    </Select>
                    <span>Secondary members:</span>
                    <Select
                      onChange={handleSecondaryChange}
                      mode='multiple'
                      style={{ width: '100%' }}
                    >
                      {members.map(member => (
                        <Option value={member.memberName}>
                          {member.memberName}
                        </Option>
                      ))}
                    </Select>
                  </RoleInnerCard>
                ))}
              </RoleWrapper>
            </>
          ))}
        </>
      ) : (
        'No raid selected'
      )}
    </RaidCardsWrapper>
  )
}
