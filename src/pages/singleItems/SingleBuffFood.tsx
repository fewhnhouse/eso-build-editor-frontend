import React from "react"
import Flex from "../../components/Flex"
import { RouteComponentProps, withRouter } from "react-router"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import { Spin } from "antd"
import ErrorPage from "../../components/ErrorPage"
import { BuffCard } from "../overview/Buff"

const GET_BUFF_BY_ID = gql`
  query Buff($id: ID!) {
    buff(id: $id) {
      name
      icon
      buffDescription
      buffType
      quality
    }
  }
`

const SingleBuffFood = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const { data, loading, error } = useQuery(GET_BUFF_BY_ID, {
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
        <Flex direction="column" fluid>
          <BuffCard buff={data.buff} />
        </Flex>
      </Flex>
    )
  }
  return null
}

export default withRouter(SingleBuffFood)
