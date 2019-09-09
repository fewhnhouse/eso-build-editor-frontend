import React, { useContext, useEffect } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Spin } from 'antd'
import { MundusCard } from '../overview/MundusStone'
import ErrorPage from '../../components/ErrorPage'
import styled from 'styled-components'
import { AppContext } from '../../components/AppContainer'

const StyledFlex = styled(Flex)`
  height: calc(100vh - 100px);
  width: 100%;
  padding: ${props => props.theme.paddings.medium};
`

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
  const [, appDispatch] = useContext(AppContext)

  const { data, loading, error } = useQuery(GET_MUNDUS_BY_ID, {
    variables: { id: id },
  })
  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Mundus Stone' },
    })
    if (data.mundusStone) {
      appDispatch!({
        type: 'SET_HEADER_SUBTITLE',
        payload: { headerSubTitle: data.mundusStone.name },
      })
    }
  }, [appDispatch, data.mundusStone])

  if (loading) {
    return (
      <Flex fluid justify='center'>
        <Spin />
      </Flex>
    )
  }
  if (error) {
    return <ErrorPage title='Error occured.' />
  }
  if (data) {
    return (
      <StyledFlex direction='row' align='flex-start'>
        <MundusCard mundusStone={data.mundusStone} />
      </StyledFlex>
    )
  }
  return null
}

export default withRouter(SingleMundus)
