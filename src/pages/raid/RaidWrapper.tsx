import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import Raid from './Raid'
import { Spin, message } from 'antd'
import { defaultRaidState } from './RaidStateContext'
import { raid } from '../../util/fragments'
import { useMediaQuery } from 'react-responsive'
import ErrorPage from '../../components/ErrorPage'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
`

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.margins.small};
`

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
  const isDesktopOrLaptop = useMediaQuery({
    minWidth: 900,
  })
  const { loading, error, data } = useQuery(GET_RAID, {
    variables: { id: raidId },
  })
  if (!isDesktopOrLaptop) {
    return (
      <ErrorPage
        status='warning'
        title='Unfortunately, editing raids is not supported on small screens yet.'
        subTitle='Please try opening this page on a bigger screen.'
      />
    )
  }
  if (edit) {
    if (loading) {
      return (
        <StyledDiv>
          <StyledSpin />
        </StyledDiv>
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
    return <NewRaid pageIndex={pageIndex} />
  }
}
const NewRaid = ({ pageIndex }: { pageIndex: number }) => {
  const savedRaidState = localStorage.getItem('raidState')
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
  }, [savedRaidState])
  try {
    const parsedRaidState = JSON.parse(savedRaidState || '')
    return (
      <Raid path='/raidEditor' raid={parsedRaidState} pageIndex={pageIndex} />
    )
  } catch (e) {
    return (
      <Raid path='/raidEditor' raid={defaultRaidState} pageIndex={pageIndex} />
    )
  }
}
