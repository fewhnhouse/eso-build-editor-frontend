import React, { useEffect, useState, useContext } from 'react'
import { RaidContext } from '../RaidStateContext'
import RaidReviewDetails from './RaidReviewDetails'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import { notification, Layout, Button, Popconfirm, Typography } from 'antd'
import styled from 'styled-components'
import { raid } from '../../../util/fragments'
const { Content, Footer } = Layout

const RAID = gql`
  query Raids($id: ID!) {
    raid(id: $id) {
      ...Raid
    }
  }
  ${raid}
`

const ME = gql`
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

const ActionButton = styled(Button)`
  width: 100px;
  margin: 10px;
`

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 144px);
  color: rgb(155, 155, 155);
`

interface IRaidOverviewProps extends RouteComponentProps<any> {
  local?: boolean
}

const RaidOverview = ({ match, local }: IRaidOverviewProps) => {
  const { id } = match.params
  const [state] = useContext(RaidContext)

  const raidQuery = useQuery(RAID, { variables: { id } })
  const meQuery = useQuery(ME)
  const [deleteMutation, { data, error }] = useMutation(DELETE_RAID, {
    variables: { id },
  })
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (data) {
      notification.success({
        message: 'Raid Deletion',
        description: 'Raid successfully deleted.',
      })
    } else if (error) {
      notification.error({
        message: 'Raid Deletion',
        description: 'Error while deleting Raid. Try again later.',
      })
    }
  }, [data, error])

  if (!local) {
    if (raidQuery.loading || meQuery.loading) {
      return <div>Loading...</div>
    }
    if (
      raidQuery.data &&
      raidQuery.data.raid &&
      meQuery.data &&
      meQuery.data.me
    ) {
      const handleDeleteConfirm = () => {
        deleteMutation({ variables: { id } })
      }

      const handleEditClick = () => {
        setRedirect(true)
      }
      if (redirect) {
        return <Redirect to={`/editRaid/${id}/0`} push />
      }

      return (
        <>
          <Container>
            <RaidReviewDetails loadedData={raidQuery.data.raid} />
          </Container>
          <Footer
            style={{
              height: 80,
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 100,
              alignItems: 'center',
              boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography.Title level={3}>
              Owner: {raidQuery.data.raid.owner.name}
            </Typography.Title>
            {raidQuery.data.raid.owner.id === meQuery.data.me.id && (
              <div>
                <ActionButton
                  onClick={handleEditClick}
                  icon='edit'
                  size='large'
                  type='primary'
                >
                  Edit
                </ActionButton>
                <Popconfirm
                  title='Are you sure you want to delete this raid?'
                  onConfirm={handleDeleteConfirm}
                  okText='Yes'
                  cancelText='No'
                >
                  <ActionButton icon='delete' size='large' type='danger'>
                    Delete
                  </ActionButton>
                </Popconfirm>
              </div>
            )}
          </Footer>
        </>
      )
    } else {
      return null
    }
  } else {
    return <RaidReviewDetails loadedData={state!} />
  }
}

export default withRouter(RaidOverview)
