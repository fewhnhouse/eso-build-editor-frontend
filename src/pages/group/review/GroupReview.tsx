import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import { GroupContext } from '../GroupStateContext'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { notification, Spin, Layout, Divider, Button, Popconfirm } from 'antd'
import { group } from '../../../util/fragments'
import { ME } from '../../home/UserHomeCard'
import { handleCopy } from '../util'
import { LoginContext } from '../../../App'
import Review from '../../../components/Review'
import { AppContext } from '../../../components/AppContainer'
import Helmet from 'react-helmet'
import image from '../../../assets/icons/favicon-32x32.png'
import { CREATE_GROUP, createNotification } from '../Group'
import GroupReviewDetails from './GroupReviewDetails'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import Scrollbars from 'react-custom-scrollbars'
import InformationCard from '../../../components/InformationCard'
import { useMediaQuery } from 'react-responsive'

const { Content, Footer } = Layout

interface IGroupReview extends RouteComponentProps<any> {
  local?: boolean
}

const ActionButton = styled(Button)`
  width: 100px;
  margin: ${props => props.theme.margins.small};
`

const StyledScrollbars = styled(Scrollbars)`
  height: 80px !important;
`

const StyledFooter = styled(Footer)`
  height: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? '140px' : '80px'}`};
  flex-direction: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? 'column' : 'row'}`};
  display: flex;
  padding: 0px ${props => props.theme.paddings.medium};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
`

const StyledFlex80 = styled(Flex)`
  height: 80px;
`

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.paddings.mini};
`

const StyledDivider = styled(Divider)`
  height: 50px;
  margin: 0px ${props => props.theme.paddings.medium};
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
  const isMobile = useMediaQuery({ maxWidth: 800 })

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
          createGroupCopyResult.data.createGroup.id
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
        <StyledFooter isMobile={isMobile}>
          <StyledScrollbars autoHide>
            <StyledFlex80 direction='row' justify='flex-start' align='center'>
              <InformationCard
                icon='highlight'
                title='Title'
                description={group.name || ''}
              />
              <StyledDivider type='vertical' />
              <InformationCard
                icon='edit'
                title='Description'
                description={group.description || ''}
              />
              <StyledDivider type='vertical' />
              <InformationCard
                icon='user'
                title='Owner'
                description={group.owner ? group.owner.name : ''}
              />
            </StyledFlex80>
          </StyledScrollbars>

          {(group.owner && group.owner.id) === (me && me.id) && (
            <Flex direction='row'>
              <Popconfirm
                title={`Are you sure you want to copy this Group?`}
                onConfirm={handleCopyClick}
                okText='Yes'
                cancelText='No'
              >
                <ActionButton
                  loading={createGroupCopyResult.loading}
                  disabled={saved}
                  icon='copy'
                  size='large'
                  type='default'
                >
                  Copy
                </ActionButton>
              </Popconfirm>

              <ActionButton
                onClick={handleEditClick}
                icon='edit'
                size='large'
                type='primary'
              >
                Edit
              </ActionButton>
              <Popconfirm
                title={`Are you sure you want to delete this Group?`}
                onConfirm={handleDeleteConfirm}
                okText='Yes'
                cancelText='No'
              >
                <ActionButton icon='delete' size='large' type='danger'>
                  Delete
                </ActionButton>
              </Popconfirm>
            </Flex>
          )}
        </StyledFooter>
      )}
    </>
  )
}

export default withRouter(GroupReview)
