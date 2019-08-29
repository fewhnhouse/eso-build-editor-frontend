import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import styled, { withTheme, ThemeProps } from 'styled-components'
import { ITheme } from '../../../components/globalStyles'
import { BuildContext } from '../BuildStateContext'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import BuildReviewDetails from './BuildReviewDetails'
import {
  Layout,
  Typography,
  Button,
  Spin,
  Popconfirm,
  notification,
  Divider,
  Result,
} from 'antd'
import { build } from '../../../util/fragments'
import { ME } from '../../home/UserHomeCard'
import {
  CREATE_BUILD,
  CREATE_SET_SELECTIONS,
  CREATE_SKILL_SELECTIONS,
  ISkillSelectionData,
  ISetSelectionData,
} from '../Build'
import { handleCopy } from '../util'
import Flex from '../../../components/Flex'
import InformationCard from '../../../components/InformationCard'
import { applicationAreas } from '../RaceAndClass/RaceClass'
import ErrorPage from '../../../components/ErrorPage'
const { Content, Footer } = Layout

interface IBuildReview extends ThemeProps<ITheme>, RouteComponentProps<any> {
  local?: boolean
}

const BUILD = gql`
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

const BuildReview = ({ match, theme, local }: IBuildReview) => {
  const { id } = match.params
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [state] = useContext(BuildContext)
  const buildQuery = useQuery(BUILD, { variables: { id } })
  const [createBuild, createBuildResult] = useMutation<any, any>(CREATE_BUILD)
  const [createSkillSelections] = useMutation<any, ISkillSelectionData>(
    CREATE_SKILL_SELECTIONS
  )
  const [createSetSelections] = useMutation<any, ISetSelectionData>(
    CREATE_SET_SELECTIONS
  )

  const meQuery = useQuery(MY_ID)
  const [deleteMutation, { data, error }] = useMutation(DELETE_BUILD, {
    variables: { id },
    refetchQueries: [{ query: ME }],
  })
  const [redirect, setRedirect] = useState('')
  useEffect(() => {
    if (data) {
      notification.success({
        message: 'Build Deletion',
        description: 'Build successfully deleted.',
      })
    } else if (error) {
      notification.error({
        message: 'Build Deletion',
        description: 'Error while deleting build. Try again later.',
      })
    }
  }, [data, error])

  useEffect(() => {
    if (saved && createBuildResult.data && createBuildResult.data.createBuild) {
      localStorage.removeItem('buildState')
      setRedirect(`/builds/${createBuildResult.data.createBuild.id}`)
    }
  }, [createBuildResult.data, saved])

  if (!local) {
    const { loading } = buildQuery || meQuery
    if (buildQuery.loading || meQuery.loading) {
      return (
        <Container>
          <Spin style={{ marginTop: 5 }} />
        </Container>
      )
    }
    const { error } = buildQuery || meQuery
    if (error) {
      return <ErrorPage />
    }
    if (
      buildQuery.data &&
      buildQuery.data.build &&
      meQuery.data &&
      meQuery.data.me
    ) {
      const handleDeleteConfirm = () => {
        deleteMutation({ variables: { id } })
      }

      const handleCopyClick = async () => {
        setLoading(true)
        try {
          await handleCopy(
            createSkillSelections,
            createSetSelections,
            createBuild,
            buildQuery.data.build
          )
          notification.success({
            message: 'Build copy successful',
            description: (
              <Flex direction='column' align='center' justify='center'>
                <div>
                  Your build was successfully copied. You can now view it and
                  share it with others!
                </div>
                <Flex
                  style={{ width: '100%', marginTop: 10 }}
                  direction='row'
                  align='center'
                  justify='space-between'
                >
                  <Button icon='share-alt'>Share link</Button>
                </Flex>
              </Flex>
            ),
          })
          setSaved(true)
        } catch (e) {
          console.error(e)
          notification.error({
            message: 'Build creation failed',
            description: 'Your build could not be copied. Try again later.',
          })
        }

        setLoading(false)
      }

      const handleEditClick = () => {
        setRedirect(`/editBuild/${id}/0`)
      }
      if (redirect) {
        return <Redirect to={redirect} push />
      }

      const {
        name,
        owner,
        description,
        applicationArea,
        published,
      } = buildQuery.data.build
      const area = applicationAreas.find(area => area.key === applicationArea)

      return (
        <>
          <Container>
            <BuildReviewDetails loadedData={buildQuery.data.build} />
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
            <Flex direction='row' justify='flex-start'>
              <Flex direction='column' align='flex-start'>
                <Typography.Title style={{ marginBottom: 0 }} level={3}>
                  {name}
                </Typography.Title>
                <Typography.Text>{description}</Typography.Text>
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
                icon={published ? 'unlock' : 'lock'}
                title='Access Rights'
                description={published ? 'Public' : 'Private'}
              />
            </Flex>

            {buildQuery.data.build.owner.id === meQuery.data.me.id && (
              <div>
                <Popconfirm
                  title='Are you sure you want to copy this build?'
                  onConfirm={handleCopyClick}
                  okText='Yes'
                  cancelText='No'
                >
                  <ActionButton
                    loading={loading}
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
                  title='Are you sure you want to delete this build?'
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
    return <BuildReviewDetails local loadedData={state!} />
  }
}

export default withTheme(withRouter(BuildReview))
