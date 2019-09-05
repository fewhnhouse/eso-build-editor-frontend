import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router'
import { message, Result, Button, Spin } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AppContext } from './AppContainer'

const VERIFY = gql`
  mutation confirmSignup($token: String!) {
    confirmSignup(token: $token) {
      token
      user {
        id
        name
      }
    }
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #ededed;
`

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.margins.mini};
`

export default ({ match }: RouteComponentProps<{ token: string }>) => {
  const [, appDispatch] = useContext(AppContext)

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Verify' },
    })
    appDispatch!({
      type: 'SET_HEADER_SUBTITLE',
      payload: { headerSubTitle: '' },
    })
  }, [appDispatch])

  const { token } = match.params
  const [mutate, { error, loading, data }] = useMutation(VERIFY, {
    variables: { token },
  })
  if (!token) {
    message.error('No token provided.')
  } else {
    mutate({ variables: { token } })
  }
  if (loading) {
    return (
      <Container>
        <StyledSpin />
      </Container>
    )
  }
  if (error) {
    message.error('Invalid token.')
    return (
      <Container>
        <Result
          status='500'
          title='500'
          subTitle='Something went wrong. your Account could not be validated.'
          extra={
            <Link to='/'>
              <Button type='primary'>Back Home</Button>
            </Link>
          }
        />
      </Container>
    )
  } else if (data && data.confirmSignup) {
    localStorage.setItem('token', data.confirmSignup.token)
    return (
      <Container>
        <Result
          status='success'
          title='Account successfully validated!'
          extra={
            <Link to='/'>
              <Button type='primary' key='console'>
                Go to Home
              </Button>
            </Link>
          }
        />
        ,
      </Container>
    )
  } else {
    return null
  }
}
