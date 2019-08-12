import React from 'react'
import { IRaidState, defaultRaidState } from '../raid/RaidStateContext'
import RaidReviewDetails from './RaidReviewDetails'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { RouteComponentProps, withRouter } from 'react-router'

const RAID = gql`
  query Raids($id: ID!) {
    raid(id: $id) {
      name
      owner {
        name
      }
      applicationArea
      roles {
        name
        builds {
          id
          name
          role
          race
          esoClass
        }
      }
    }
  }
`

interface IRaidOverviewProps extends RouteComponentProps<any> {
  local?: boolean
}

const RaidOverview = ({ match, local }: IRaidOverviewProps) => {
  const { id } = match.params
  const raidState = localStorage.getItem('raidState')
  const parsedRaidState: IRaidState = raidState
    ? JSON.parse(raidState)
    : defaultRaidState

  const { loading, error, data } = useQuery(RAID, { variables: { id } })

  if (!local) {
    if (loading) {
      return <div>Loading...</div>
    }
    if (data && data.raid) {
      return <RaidReviewDetails loadedData={data.raid} />
    } else {
      return null
    }
  } else {
    return <RaidReviewDetails loadedData={parsedRaidState} />
  }
}

export default withRouter(RaidOverview)
