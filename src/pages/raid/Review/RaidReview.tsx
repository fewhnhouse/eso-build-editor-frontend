import React, { useEffect, useState, useContext } from "react"
import { RaidContext } from "../RaidStateContext"
import { useQuery, useMutation } from "react-apollo"
import gql from "graphql-tag"
import { RouteComponentProps, withRouter, Redirect } from "react-router"
import { notification } from "antd"
import { raid } from "../../../util/fragments"
import { ME } from "../../home/UserHomeCard"
import { LoginContext } from "../../../App"
import Review from "../../../components/Review"

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
  const [redirect, setRedirect] = useState(false)
  const [saved, setSaved] = useState(false)
  //const [copyLoading, setLoading] = useState(false)

  const [state] = useContext(RaidContext)
  const [loggedIn] = useContext(LoginContext)

  const raidQuery = useQuery(RAID, { variables: { id } })
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
        message: "Raid Deletion",
        description: "Raid successfully deleted.",
      })
    } else if (error) {
      notification.error({
        message: "Raid Deletion",
        description: "Error while deleting Raid. Try again later.",
      })
    }
  }, [data, error])
  const handleDeleteConfirm = () => {
    deleteMutation({ variables: { id }, refetchQueries: [{ query: ME }] })
  }

  const handleCopyClick = async () => {
    setSaved(true)
  }

  const handleEditClick = () => {
    setRedirect(true)
  }
  if (redirect) {
    return <Redirect to={`/editRaid/${id}/0`} push />
  }
  return (
    <Review
      saved={saved}
      state={state!}
      data={raidQuery.data && raidQuery.data.raid}
      isBuild={false}
      error={raidQuery.error || meQuery.error}
      loading={raidQuery.loading || meQuery.loading}
      me={meQuery.data && meQuery.data.me}
      local={local}
      onCopy={handleCopyClick}
      onDelete={handleDeleteConfirm}
      onEdit={handleEditClick}
    />
  )
}

export default withRouter(RaidOverview)
