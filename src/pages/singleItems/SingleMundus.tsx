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
import Helmet from 'react-helmet'

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
    if (data && data.mundusStone) {
      appDispatch!({
        type: 'SET_HEADER_SUBTITLE',
        payload: { headerSubTitle: data.mundusStone.name },
      })
    }
  }, [appDispatch, data])

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
    const { mundusStone } = data
    return (
      <StyledFlex direction='row' align='flex-start'>
        <Helmet>
          <title>{mundusStone && mundusStone.name}</title>
          <meta
            property='og:url'
            content={`${
              window.location.origin
            }/overview/mundusStones/${mundusStone && mundusStone.id}`}
          />
          <meta property='og:type' content={'website'} />
          <meta property='og:title' content={mundusStone && mundusStone.name} />
          <meta
            property='og:description'
            content={
              mundusStone
                ? `${mundusStone.effect} by ${mundusStone.value}.`
                : ''
            }
          />
          <meta
            property='og:image'
            content={`${
              process.env.REACT_APP_IMAGE_SERVICE
            }/mundusStones/${mundusStone && mundusStone.icon}`}
          />
        </Helmet>
        <MundusCard mundusStone={mundusStone} />
      </StyledFlex>
    )
  }
  return null
}

export default withRouter(SingleMundus)
