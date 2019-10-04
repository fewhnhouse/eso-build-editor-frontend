import React, { useEffect, useState, useContext } from 'react'
import { RaidContext } from '../RaidStateContext'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import { notification } from 'antd'
import { raid } from '../../../util/fragments'
import { ME } from '../../home/UserHomeCard'
import { LoginContext } from '../../../App'
import Review from '../../../components/Review'
import { AppContext } from '../../../components/AppContainer'
import { handleCopy } from '../util'
import { CREATE_RAID, createNotification } from '../Raid'
import { Helmet } from 'react-helmet'
import image from '../../../assets/icons/favicon-32x32.png'

export const RAID = gql`
  query Raids($id: ID!) {
    raid(id: $id) {
      ...Raid
    }
  }
  ${raid}
`

const MY_ID = gql`
  query {
    me {
      id
    }
  }
`

const DELETE_RAID = gql`
  mutation deleteRaid($id: ID!) {
    deleteRaid(id: $id) {
      id
    }
  }
`

interface IRaidOverviewProps extends RouteComponentProps<any> {
  local?: boolean
}

const RaidOverview = ({ match, local }: IRaidOverviewProps) => {
  const { id } = match.params
  const [redirect, setRedirect] = useState('')
  const [saved, setSaved] = useState(false)
  //const [copyLoading, setLoading] = useState(false)

  const [state] = useContext(RaidContext)
  const [loggedIn] = useContext(LoginContext)
  const [, appDispatch] = useContext(AppContext)
  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Raid Review' },
    })
  }, [appDispatch])

  const raidQuery = useQuery(RAID, { variables: { id } })
  const [createRaidCopy, createRaidCopyResult] = useMutation<any, any>(
    CREATE_RAID
  )
  const meQuery = useQuery(MY_ID)
  const [deleteMutation, { data, error }] = useMutation(DELETE_RAID, {
    variables: { id },
    refetchQueries: [{ query: ME }],
  })

  useEffect(() => {
    raidQuery.refetch({ id })
  }, [loggedIn, id, raidQuery])

  useEffect(() => {
    if (data) {
      notification.success({
        message: 'Raid Deletion',
        description: 'Raid successfully deleted.',
      })
      setRedirect(`/`)
    } else if (error) {
      notification.error({
        message: 'Raid Deletion',
        description: 'Error while deleting Raid. Try again later.',
      })
    }
  }, [data, error])

  useEffect(() => {
    if (
      saved &&
      createRaidCopyResult.data &&
      createRaidCopyResult.data.createRaid
    ) {
      localStorage.removeItem('raidState')
      notification.success(
        createNotification(
          'Raid copy successful',
          'Your raid was successfully copied. You can now view it and share it with others!',
          createRaidCopyResult.data.createRaid.id
        )
      )
      setRedirect(`/raids/${createRaidCopyResult.data.createRaid.id}`)
    }
  }, [createRaidCopyResult.data, saved])

  const handleDeleteConfirm = () => {
    deleteMutation({ variables: { id }, refetchQueries: [{ query: ME }] })
  }

  const handleCopyClick = async () => {
    try {
      await handleCopy(createRaidCopy, raidQuery.data.raid)
      setSaved(true)
    } catch (e) {
      console.error(e)
      notification.error({
        message: 'Raid copy failed',
        description: 'Your raid could not be copied. Try again later.',
      })
    }
  }

  const handleEditClick = () => {
    setRedirect(`/editRaid/${id}/0`)
  }
  if (redirect) {
    return <Redirect to={redirect} push />
  }
  const raid = raidQuery.data && raidQuery.data.raid
  return (
    <>
      <Helmet>
        <title>{raid && raid.name}</title>
        <meta
          property='og:url'
          content={`${window.location.origin}/raids/${raid && raid.id}`}
        />
        <meta property='og:type' content={'website'} />
        <meta property='og:title' content={raid && raid.name} />
        <meta property='og:description' content={raid && raid.description} />
        <meta property='og:image' content={image} />
      </Helmet>
      <Review
        saved={saved}
        state={state!}
        data={raidQuery.data && raidQuery.data.raid}
        isBuild={false}
        dataError={raidQuery.error}
        loading={raidQuery.loading || meQuery.loading}
        me={meQuery.data && meQuery.data.me}
        local={local}
        onCopy={handleCopyClick}
        onDelete={handleDeleteConfirm}
        onEdit={handleEditClick}
      />
    </>
  )
}

export default withRouter(RaidOverview)
