import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import { BuildContext } from '../BuildStateContext'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { notification, Modal, Button } from 'antd'
import { build } from '../../../util/fragments'
import { ME } from '../../home/LoggedInHome'
import {
  CREATE_BUILD,
  CREATE_SET_SELECTIONS,
  CREATE_SKILL_SELECTIONS,
  ISkillSelectionData,
  ISetSelectionData,
  CREATE_BUILD_REVISION,
} from '../Build'
import { handleCopy } from '../utils/copy'
import { LoginContext } from '../../../App'
import Review from '../../../components/Review'
import { AppContext } from '../../../components/AppContainer'
import { Helmet } from 'react-helmet'
import image from '../../../assets/icons/favicon-32x32.png'
import { createNotification } from '../../../util/notification'

interface IBuildReview extends RouteComponentProps<any> {
  local?: boolean
}

export const BUILD = gql`
  query Build($id: ID!) {
    build(id: $id) {
      ...Build
    }
  }
  ${build}
`

const MY_ID = gql`
  query {
    me {
      id
    }
  }
`

const DELETE_BUILD = gql`
  mutation deleteBuild($id: ID!) {
    deleteBuild(id: $id) {
      id
    }
  }
`

const DELETE_REVISION = gql`
  mutation deleteRevision($id: ID!) {
    deleteRevision(id: $id) {
      id
    }
  }
`

const BuildReview = ({ match, local }: IBuildReview) => {
  const { id } = match.params
  console.log(id)
  const [saved, setSaved] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [redirect, setRedirect] = useState('')

  const [state] = useContext(BuildContext)
  const [loggedIn] = useContext(LoginContext)
  const [, appDispatch] = useContext(AppContext)

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Build Review' },
    })
  }, [appDispatch])

  const buildQuery = useQuery(BUILD, { variables: { id }, skip: local })
  const [createBuildCopy, createBuildCopyResult] = useMutation<any, any>(
    CREATE_BUILD
  )
  const [createBuildRevision, createBuildRevisionResult] = useMutation<
    any,
    any
  >(CREATE_BUILD_REVISION)
  const [createSkillSelections] = useMutation<any, ISkillSelectionData>(
    CREATE_SKILL_SELECTIONS
  )
  const [createSetSelections] = useMutation<any, ISetSelectionData>(
    CREATE_SET_SELECTIONS
  )
  const meQuery = useQuery(MY_ID)
  const [deleteMutation, deleteResult] = useMutation(DELETE_BUILD, {
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
    buildQuery.refetch({ id })
  }, [loggedIn, buildQuery, id])

  useEffect(() => {
    if (deleteResult.data || deleteRevisionResult.data) {
      notification.success({
        message: 'Build Deletion',
        description: 'Build successfully deleted.',
      })
      setRedirect(`/`)
    } else if (deleteResult.error || deleteRevisionResult.error) {
      notification.error({
        message: 'Build Deletion',
        description: 'Error while deleting build. Try again later.',
      })
    }
  }, [deleteResult, deleteRevisionResult])

  useEffect(() => {
    if (
      saved &&
      createBuildCopyResult.data &&
      createBuildCopyResult.data.createBuild &&
      createBuildRevisionResult.data
    ) {
      localStorage.removeItem('buildState')
      notification.success(
        createNotification(
          'Build copy successful',
          'Your build was successfully copied. You can now view it and share it with others!',
          createBuildCopyResult.data.createBuild.id,
          'builds'
        )
      )
      setRedirect(`/builds/${createBuildCopyResult.data.createBuild.id}`)
    }
  }, [createBuildCopyResult.data, createBuildRevisionResult.data, saved])
  const handleDelete = () => {
    setDeleteModalVisible(true)
  }

  const handleCopyClick = async () => {
    try {
      await handleCopy(
        createSkillSelections,
        createSetSelections,
        createBuildRevision,
        createBuildCopy,
        buildQuery.data.build
      )
      setSaved(true)
    } catch (e) {
      console.error(e)
      notification.error({
        message: 'Build copy failed',
        description: 'Your build could not be copied. Try again later.',
      })
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalVisible(false)
  }

  const handleDeleteAll = async () => {
    try {
      await deleteRevisionMutation({ variables: { id } })
    } catch (e) {
      notification.error({
        message: 'Build deletion failed',
        description: 'Your build could not be deleted. Try again later.',
      })
    }
  }

  const handleDeleteRevision = async () => {
    try {
      await deleteMutation({ variables: { id } })
    } catch (e) {
      notification.error({
        message: 'Build deletion failed',
        description: 'Your build could not be deleted. Try again later.',
      })
    }
  }

  const handleEditClick = () => {
    setRedirect(`/editBuild/${id}/0`)
  }

  if (redirect) {
    return <Redirect to={redirect} push />
  }
  const build = buildQuery.data && buildQuery.data.build
  return (
    <>
      <Helmet>
        <title>{build && build.name}</title>
        <meta
          property='og:url'
          content={`${window.location.origin}/builds/${build && build.id}`}
        />
        <meta property='og:type' content={'website'} />
        <meta property='og:title' content={build && build.name} />
        <meta property='og:description' content={build && build.description} />
        <meta property='og:image' content={image} />
      </Helmet>
      <Review
        saved={saved}
        state={state!}
        data={buildQuery.data && buildQuery.data.build}
        isBuild
        dataError={buildQuery.error}
        loading={buildQuery.loading || meQuery.loading}
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

export default withRouter(BuildReview)
