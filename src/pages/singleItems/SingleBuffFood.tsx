import React, { useContext, useEffect } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { Spin } from 'antd'
import ErrorPage from '../../components/ErrorPage'
import { BuffCard } from '../overview/Buff'
import styled from 'styled-components'
import { AppContext } from '../../components/AppContainer'
import { Helmet } from 'react-helmet'

const StyledFlex = styled(Flex)`
  height: calc(100vh - 100px);
  width: 100%;
  padding: ${(props) => props.theme.paddings.medium};
`

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
  const [, appDispatch] = useContext(AppContext)

  const { data, loading, error } = useQuery(GET_BUFF_BY_ID, {
    variables: { id: id },
  })
  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Buff Food' },
    })
    if (data && data.buff) {
      appDispatch!({
        type: 'SET_HEADER_SUBTITLE',
        payload: { headerSubTitle: data.buff.name },
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
    const { buff } = data
    return (
      <>
        <Helmet>
          <title>{buff && buff.name}</title>
          <meta
            property='og:url'
            content={`${window.location.origin}/overview/buffs/${
              buff && buff.id
            }`}
          />
          <meta property='og:type' content={'website'} />
          <meta property='og:title' content={buff && buff.name} />
          <meta
            property='og:description'
            content={buff && buff.buffDescription}
          />
          <meta
            property='og:image'
            content={`${process.env.REACT_APP_IMAGE_SERVICE}/buffs/${
              buff && buff.icon
            }`}
          />
        </Helmet>

        <StyledFlex direction='row' align='flex-start'>
          <Flex direction='column' fluid>
            <BuffCard buff={buff} />
          </Flex>
        </StyledFlex>
      </>
    )
  }
  return null
}

export default withRouter(SingleBuffFood)
