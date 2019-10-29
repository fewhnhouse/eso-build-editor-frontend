import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import { GroupContext } from '../GroupStateContext'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { notification, Spin, Layout } from 'antd'
import { group } from '../../../util/fragments'
import { ME } from '../../home/UserHomeCard'
import { handleCopy } from '../util'
import { LoginContext } from '../../../App'
import { AppContext } from '../../../components/AppContainer'
import Helmet from 'react-helmet'
import image from '../../../assets/icons/favicon-32x32.png'
import { CREATE_GROUP } from '../Group'
import GroupReviewDetails from './GroupReviewDetails'
import styled from 'styled-components'
import { createNotification } from '../../../util/notification'
import Footer from '../../../components/Footer'

const { Content } = Layout

interface IGroupReview extends RouteComponentProps<any> {
  local?: boolean
}

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.paddings.mini};
`

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: ${(props: { isMobile: boolean }) =>
    `calc(100% - ${props.isMobile ? '204px' : '144px'})`};
  color: ${props => props.theme.mainBg};
`

export const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      ...Group
    }
  }
  ${group}
`

const MY_ID = gql`
  query {
    me {
      id
    }
  }
`

const DELETE_BUILD = gql`
  mutation deleteGroup($id: ID!) {
    deleteGroup(id: $id) {
      id
    }
  }
`

const GroupReview = ({ match, local }: IGroupReview) => {
  const { id } = match.params
  const [saved, setSaved] = useState(false)
  const [redirect, setRedirect] = useState('')

  const [state] = useContext(GroupContext)
  const [loggedIn] = useContext(LoginContext)
  const [, appDispatch] = useContext(AppContext)

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Group Review' },
    })
  }, [appDispatch])

  const groupQuery = useQuery(GROUP, { variables: { id } })

  const [createGroupCopy, createGroupCopyResult] = useMutation<any, any>(
    CREATE_GROUP
  )

  const meQuery = useQuery(MY_ID)
  const [deleteMutation, { data, error }] = useMutation(DELETE_BUILD, {
    variables: { id },
    refetchQueries: [{ query: ME }],
  })

  useEffect(() => {
    groupQuery.refetch({ id })
  }, [loggedIn, groupQuery, id])

  useEffect(() => {
    if (data) {
      notification.success({
        message: 'Group Deletion',
        description: 'Group successfully deleted.',
      })
      setRedirect(`/`)
    } else if (error) {
      notification.error({
        message: 'Group Deletion',
        description: 'Error while deleting Group. Try again later.',
      })
    }
  }, [data, error])

  useEffect(() => {
    if (
      saved &&
      createGroupCopyResult.data &&
      createGroupCopyResult.data.createGroup
    ) {
      localStorage.removeItem('groupState')
      notification.success(
        createNotification(
          'Group copy successful',
          'Your group was successfully copied. You can now view it and share it with others!',
          createGroupCopyResult.data.createGroup.id,
          'groups'
        )
      )
      setRedirect(`/groups/${createGroupCopyResult.data.createGroup.id}`)
    }
  }, [createGroupCopyResult.data, saved])

  const handleDeleteConfirm = () => {
    deleteMutation({ variables: { id } })
  }

  const handleCopyClick = async () => {
    try {
      await handleCopy(createGroupCopy, groupQuery.data.group)
      setSaved(true)
    } catch (e) {
      console.error(e)
      notification.error({
        message: 'Group copy failed',
        description: 'Your group could not be copied. Try again later.',
      })
    }
  }

  const handleEditClick = () => {
    setRedirect(`/editGroup/${id}/0`)
  }

  if (redirect) {
    return <Redirect to={redirect} push />
  }

  if (groupQuery.loading || meQuery.loading) {
    return (
      <Container isMobile={false}>
        <StyledSpin />
      </Container>
    )
  }

  const group = groupQuery.data && groupQuery.data.group

  const me = meQuery.data && meQuery.data.me
  const information = [
    {
      icon: 'highlight',
      title: 'Title',
      description: group.name || '',
    },
    {
      icon: 'edit',
      title: 'Description',
      description: group.description || '',
    },
    {
      icon: 'user',
      title: 'Owner',
      description: group.owner ? group.owner.name : '',
    },
  ]

  return (
    <>
      <Helmet>
        <title>{group && group.name}</title>
        <meta
          property='og:url'
          content={`${window.location.origin}/groups/${group && group.id}`}
        />
        <meta property='og:type' content={'website'} />
        <meta property='og:title' content={group && group.name} />
        <meta property='og:description' content={group && group.description} />
        <meta property='og:image' content={image} />
      </Helmet>
      <GroupReviewDetails local={local} loadedData={local ? state! : group} />
      {!local && group && (
        <Footer
          information={information}
          onCopy={handleCopyClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteConfirm}
          owner={group.owner}
          me={me}
          type={'group'}
          loading={createGroupCopyResult.loading}
          saved={saved}
        />
      )}
    </>
  )
}

export default withRouter(GroupReview)
