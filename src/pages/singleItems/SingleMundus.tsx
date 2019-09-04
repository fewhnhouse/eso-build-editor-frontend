import React from "react"
import Flex from "../../components/Flex"
import { RouteComponentProps, withRouter } from "react-router"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import { Spin } from "antd"
import { MundusCard } from "../overview/MundusStone"
import ErrorPage from "../../components/ErrorPage"

const GET_MUNDUS_BY_ID = gql`
  query Mundus($id: ID!) {
    mundusStone(id: $id) {
      name
      effect
      value
      icon
      aldmeri
      daggerfall
      ebonheart
    }
  }
`

const SingleMundus = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const { data, loading, error } = useQuery(GET_MUNDUS_BY_ID, {
    variables: { id: id },
  })

  if (loading) {
    return (
      <Flex fluid justify="center">
        <Spin />
      </Flex>
    )
  }
  if (error) {
    return <ErrorPage title="Error occured." />
  }
  if (data) {
    return (
      <Flex
        direction="row"
        align="flex-start"
        style={{
          height: "calc(100vh - 100px)",
          width: "100%",
          padding: 20,
        }}
      >
        <MundusCard mundusStone={data.mundusStone} />
      </Flex>
    )
  }
  return null
}

export default withRouter(SingleMundus)
