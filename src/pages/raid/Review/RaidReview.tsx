import React, { useEffect, useState, useContext } from 'react'
import { RaidContext, IRole } from '../RaidStateContext'
import RaidReviewDetails from './RaidReviewDetails'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import {
  notification,
  Layout,
  Button,
  Popconfirm,
  Typography,
  Spin,
  Divider,
} from 'antd'
import styled from 'styled-components'
import { raid } from '../../../util/fragments'
import { ME } from '../../home/UserHomeCard'
import Flex from '../../../components/Flex'
import InformationCard from '../../../components/InformationCard'
import { applicationAreas } from '../general/RaidGeneral'
import ErrorPage from '../../../components/ErrorPage'
import { LoginContext } from '../../../App'
import { Scrollbars } from 'react-custom-scrollbars'

const { Content, Footer } = Layout

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
  const [redirect, setRedirect] = useState(false)

  const [state] = useContext(RaidContext)
  const [loggedIn] = useContext(LoginContext)

  const raidQuery = useQuery(RAID, { variables: { id } })
  const meQuery = useQuery(MY_ID)
  const [deleteMutation, { data, error }] = useMutation(DELETE_RAID, {
    variables: { id },
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
    } else if (error) {
      notification.error({
        message: 'Raid Deletion',
        description: 'Error while deleting Raid. Try again later.',
      })
    }
  }, [data, error])

  if (!local) {
    const { loading } = raidQuery || meQuery
    if (loading) {
      return (
        <Container>
          <Spin style={{ marginTop: 5 }} />
        </Container>
      )
    }
    const { error } = raidQuery || meQuery
    if (error) {
      return <ErrorPage />
    }
    if (
      raidQuery.data &&
      raidQuery.data.raid &&
      meQuery.data &&
      meQuery.data.me
    ) {
      const handleDeleteConfirm = () => {
        deleteMutation({ variables: { id }, refetchQueries: [{ query: ME }] })
      }

      const handleEditClick = () => {
        setRedirect(true)
      }
      if (redirect) {
        return <Redirect to={`/editRaid/${id}/0`} push />
      }
      const {
        name,
        owner,
        description,
        applicationArea,
        roles,
        published,
      } = raidQuery.data.raid
      const area = applicationAreas.find(area => area.key === applicationArea)
      return (
        <>
          <Container>
            <RaidReviewDetails loadedData={raidQuery.data.raid} />
          </Container>
          <Footer
            style={{
              height: 80,
              padding: '0px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 100,
              alignItems: 'center',
              boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <Scrollbars autoHide>
              <Flex
                direction='row'
                justify='flex-start'
                align='center'
                style={{ height: 80 }}
              >
                <Flex
                  direction='column'
                  align='flex-start'
                  style={{ width: 200 }}
                >
                  <Typography.Title
                    style={{
                      marginBottom: 0,
                      width: 180,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    level={3}
                  >
                    {name}
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      whiteSpace: 'nowrap',
                      width: 180,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {description}
                  </Typography.Text>
                </Flex>
                <Divider
                  type='vertical'
                  style={{ height: 50, margin: '0px 20px' }}
                />
                <InformationCard
                  icon='user'
                  title='Owner'
                  description={owner.name}
                />
                <Divider
                  type='vertical'
                  style={{ height: 50, margin: '0px 20px' }}
                />
                <InformationCard
                  icon='environment'
                  title='Application Area'
                  description={area ? area.label : ''}
                />
                <Divider
                  type='vertical'
                  style={{ height: 50, margin: '0px 20px' }}
                />
                <InformationCard
                  icon='team'
                  title='Group Size'
                  description={roles.reduce(
                    (prev: number, curr: IRole) => prev + curr.builds.length,
                    0
                  )}
                />
                <Divider
                  type='vertical'
                  style={{ height: 50, margin: '0px 20px' }}
                />
                <InformationCard
                  icon={published ? 'unlock' : 'lock'}
                  title='Access Rights'
                  description={published ? 'Public' : 'Private'}
                />
              </Flex>
            </Scrollbars>

            {owner.id === meQuery.data.me.id && (
              <Flex direction='row'>
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
              </Flex>
            )}
          </Footer>
        </>
      )
    } else {
      return null
    }
  } else {
    return <RaidReviewDetails loadedData={state!} local />
  }
}

export default withRouter(RaidOverview)
