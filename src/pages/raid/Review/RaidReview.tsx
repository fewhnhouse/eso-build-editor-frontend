import React, { useEffect, useState, useContext } from 'react'
import { RaidContext } from '../RaidStateContext'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import { notification, Button, Modal } from 'antd'
import { raid } from '../../../util/fragments'
import { ME } from '../../home/LoggedInHome'
import { LoginContext } from '../../../App'
import { AppContext } from '../../../components/AppContainer'
import { handleCopy } from '../util'
import { CREATE_RAID, CREATE_RAID_REVISION } from '../Raid'
import { Helmet } from 'react-helmet'
import image from '../../../assets/icons/favicon-32x32.png'
import Review from '../../../components/Review'
import { createNotification } from '../../../util/notification'

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

const DELETE_REVISION = gql`
  mutation deleteRaidRevision($id: ID!) {
    deleteRaidRevision(id: $id) {
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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const [state] = useContext(RaidContext)
  const [loggedIn] = useContext(LoginContext)
  const [, appDispatch] = useContext(AppContext)

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Raid Review' },
    })
  }, [appDispatch])

  const raidQuery = useQuery(RAID, { variables: { id }, skip: local })
  const [createRaidCopy, createRaidCopyResult] = useMutation<any, any>(
    CREATE_RAID
  )
  const [createRaidRevision, createRaidRevisionResult] = useMutation<any, any>(
    CREATE_RAID_REVISION
  )
  const meQuery = useQuery(MY_ID)
  const [deleteMutation, deleteResult] = useMutation(DELETE_RAID, {
    variables: { id },
    refetchQueries: [{ query: ME }],
  })
  const [deleteRevisionMutation, deleteRevisionResult] = useMutation(
    DELETE_REVISION,
    {
      variables: { id },
      refetchQueries: [{ query: ME }],
    }
  )

  useEffect(() => {
    if (!local) {
      raidQuery.refetch({ id })
    }
  }, [loggedIn, id, raidQuery, local])

  useEffect(() => {
    if (deleteResult.data || deleteRevisionResult.data) {
      notification.success({
        message: 'Raid Deletion',
        description: deleteRevisionResult.data
          ? 'All raid revisions successfully deleted.'
          : 'Raid revision successfully deleted.',
      })
      setRedirect(`/`)
    } else if (deleteResult.error || deleteRevisionResult.error) {
      notification.error({
        message: 'Raid Deletion',
        description: 'Error while deleting Raid. Try again later.',
      })
    }
  }, [deleteResult, deleteRevisionResult])

  useEffect(() => {
    if (
      saved &&
      createRaidCopyResult.data &&
      createRaidCopyResult.data.createRaid &&
      createRaidRevisionResult.data
    ) {
      localStorage.removeItem('raidState')
      notification.success(
        createNotification(
          'Raid copy successful',
          'Your raid was successfully copied. You can now view it and share it with others!',
          createRaidCopyResult.data.createRaid.id,
          'raids'
        )
      )
      setRedirect(`/raids/${createRaidCopyResult.data.createRaid.id}`)
    }
  }, [createRaidCopyResult.data, createRaidRevisionResult.data, saved])

  const handleDelete = () => {
    setDeleteModalVisible(true)
  }

  const handleCancelDelete = () => {
    setDeleteModalVisible(false)
  }

  const handleCopyClick = async () => {
    try {
      await handleCopy(createRaidCopy, createRaidRevision, raidQuery.data.raid)
      setSaved(true)
    } catch (e) {
      console.error(e)
      notification.error({
        message: 'Raid copy failed',
        description: 'Your raid could not be copied. Try again later.',
      })
    }
  }

  const handleDeleteAll = async () => {
    try {
      await deleteRevisionMutation({
        variables: { id },
        refetchQueries: [{ query: ME }],
      })
    } catch (e) {
      notification.error({
        message: 'Raid deletion failed',
        description: 'Your raid could not be deleted. Try again later.',
      })
    }
  }

  const handleDeleteRevision = async () => {
    try {
      await deleteMutation({
        variables: { id },
        refetchQueries: [{ query: ME }],
      })
    } catch (e) {
      notification.error({
        message: 'Raid deletion failed',
        description: 'Your raid could not be deleted. Try again later.',
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
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
      <Modal
        visible={deleteModalVisible}
        title='Delete Build'
        onOk={handleDeleteRevision}
        onCancel={handleCancelDelete}
        footer={[
          <Button key='back' type='default' onClick={handleCancelDelete}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={handleDeleteRevision}>
            Delete current
          </Button>,
          <Button key='submit' danger onClick={handleDeleteAll}>
            Delete all
          </Button>,
        ]}
      >
        You can either decide to delete only the current revision, or all
        revisions. This action is irreversible.
      </Modal>
    </>
  )
}

export default withRouter(RaidOverview)
