import React from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Card, Spin } from 'antd'
import GearCard from '../../components/GearCard'
import { ISet } from '../../components/GearSlot'

const GET_SETS_BY_ID = gql`
  query Set($id: ID!) {
    set(id: $id) {
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
      pts
      eso_id
    }
  }
`

const SingleSet = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const { data } = useQuery(GET_SETS_BY_ID, {
    variables: { id: id }
  })

  const set: ISet = data.set ? data.set : ''

  return set ? (
    <Flex
      direction='row'
      align='flex-start'
      style={{
        height: '100%',
        width: '100%',
        padding: 20
      }}
    >
      <Flex direction='column' fluid>
        <Card style={{ width: '100%' }}>
          <GearCard size='big' set={set} setSelectionCount={0} />
        </Card>
      </Flex>
    </Flex>
  ) : (
    <Flex fluid justify='center'>
      <Spin />
    </Flex>
  )
}

export default withRouter(SingleSet)
