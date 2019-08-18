import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router'
import Raid from './Raid'
import { Spin, message } from 'antd'
import { defaultRaidState } from './RaidStateContext'
import { raid } from '../../util/fragments';

const GET_RAID = gql`
  query raid($id: ID!) {
    raid(id: $id) {
      ...Raid
    }
  }
  ${raid}
`
interface IRaidWrapperProps
  extends RouteComponentProps<{ id: string; raidId: string }> {
  edit?: boolean
}

export default ({ edit, match }: IRaidWrapperProps) => {
  const { id, raidId } = match.params
  const pageIndex = parseInt(id || '0', 10)
  const { loading, error, data } = useQuery(GET_RAID, {
    variables: { id: raidId },
  })
  if (edit) {
    if (loading) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <Spin style={{ marginTop: 10 }} />
        </div>
      )
    }
    if (error) {
      return <div>Error.</div>
    }
    if (data) {
      return (
        <Raid
          edit
          initialRoles={data.raid.roles}
          path={`/editRaid/${raidId}`}
          raid={{ ...defaultRaidState, ...data.raid }}
          pageIndex={pageIndex}
        />
      )
    }
    return null
  } else {
    const savedRaidState = localStorage.getItem('raidState')

    return <NewRaid savedRaidState={savedRaidState} pageIndex={pageIndex} />
  }
}
const NewRaid = ({
  savedRaidState,
  pageIndex,
}: {
  savedRaidState: string | null
  pageIndex: number
}) => {
  useEffect(() => {
    try {
      const parsedRaidState = savedRaidState
        ? JSON.parse(savedRaidState)
        : false
      if (parsedRaidState) {
        message.info('Your settings have been restored.')
      }
    } catch (e) {
      console.error(e)
    }
  }, [])
  try {
    const parsedRaidState = JSON.parse(savedRaidState || '')
    return <Raid path='/raid' raid={parsedRaidState} pageIndex={pageIndex} />
  } catch (e) {
    return <Raid path='/raid' raid={defaultRaidState} pageIndex={pageIndex} />
  }
}
