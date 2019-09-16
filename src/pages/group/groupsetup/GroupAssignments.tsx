import React from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Select, Icon } from 'antd'
import gql from 'graphql-tag'
import { raid } from '../../../util/fragments'
import { useQuery } from 'react-apollo'

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
          <h3>Assign members to roles in "{singleRaid.name}"</h3>
          {singleRaid.roles.map((role: any) => (
            <>
              <h3>{role.name}</h3>
              <RoleWrapper direction='row' justify='center' wrap>
                {role.builds.map((sortedBuild: any) => (
                  <RoleInnerCard type='inner' title={sortedBuild.build.name}>
                    <span>Primary members:</span>
                    <Select mode='multiple' style={{ width: '100%' }}>
                      <Option value='Member 1'>Member 1</Option>
                      <Option value='Member 2'>Member 2</Option>
                      <Option value='Member 3'>Member 3</Option>
                    </Select>
                    <span>Secondary members:</span>
                    <Select mode='multiple' style={{ width: '100%' }}>
                      <Option value='Member 1'>Member 1</Option>
                      <Option value='Member 2'>Member 2</Option>
                      <Option value='Member 3'>Member 3</Option>
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
