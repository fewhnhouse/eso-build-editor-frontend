import React, { useContext, useEffect, useState } from "react"
import { RouteComponentProps, withRouter, Redirect } from "react-router"
import { withTheme, ThemeProps } from "styled-components"
import { ITheme } from "../../../components/globalStyles"
import { BuildContext } from "../BuildStateContext"
import { useQuery, useMutation } from "react-apollo"
import gql from "graphql-tag"
import { Button, notification } from "antd"
import { build } from "../../../util/fragments"
import { ME } from "../../home/UserHomeCard"
import {
  CREATE_BUILD,
  CREATE_SET_SELECTIONS,
  CREATE_SKILL_SELECTIONS,
  ISkillSelectionData,
  ISetSelectionData,
} from "../Build"
import { handleCopy } from "../util"
import Flex from "../../../components/Flex"
import { LoginContext } from "../../../App"
import Review from "../../../components/Review"

interface IBuildReview extends ThemeProps<ITheme>, RouteComponentProps<any> {
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

const BuildReview = ({ match, local }: IBuildReview) => {
  const { id } = match.params
  const [, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [redirect, setRedirect] = useState("")

  const [state] = useContext(BuildContext)
  const [loggedIn] = useContext(LoginContext)

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

  useEffect(() => {
    buildQuery.refetch({ id })
  }, [loggedIn, buildQuery, id])

  useEffect(() => {
    if (data) {
      notification.success({
        message: "Build Deletion",
        description: "Build successfully deleted.",
      })
    } else if (error) {
      notification.error({
        message: "Build Deletion",
        description: "Error while deleting build. Try again later.",
      })
    }
  }, [data, error])

  useEffect(() => {
    if (saved && createBuildResult.data && createBuildResult.data.createBuild) {
      localStorage.removeItem("buildState")
      setRedirect(`/builds/${createBuildResult.data.createBuild.id}`)
    }
  }, [createBuildResult.data, saved])
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
        message: "Build copy successful",
        description: (
          <Flex direction="column" align="center" justify="center">
            <div>
              Your build was successfully copied. You can now view it and share
              it with others!
            </div>
            <Flex
              style={{ width: "100%", marginTop: 10 }}
              direction="row"
              align="center"
              justify="space-between"
            >
              <Button icon="share-alt">Share link</Button>
            </Flex>
          </Flex>
        ),
      })
      setSaved(true)
    } catch (e) {
      console.error(e)
      notification.error({
        message: "Build creation failed",
        description: "Your build could not be copied. Try again later.",
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
  return (
    <Review
      saved={saved}
      state={state!}
      data={buildQuery.data && buildQuery.data.build}
      isBuild
      error={buildQuery.error || meQuery.error}
      loading={buildQuery.loading || meQuery.loading}
      me={meQuery.data && meQuery.data.me}
      local={local}
      onCopy={handleCopyClick}
      onDelete={handleDeleteConfirm}
      onEdit={handleEditClick}
    />
  )
}

export default withTheme(withRouter(BuildReview))
