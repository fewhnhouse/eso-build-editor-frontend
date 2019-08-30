import React, { useEffect, useContext } from 'react'
import '../App.css'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import Routes from './Routes'
import styled from 'styled-components'
import {
  Layout,
  Button,
  Spin,
  notification,
  Typography,
  Divider,
  message,
} from 'antd'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { LoginContext } from '../App'
import Flex from './Flex'
import Menu from './Menu';

const { Header } = Layout

const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`

const LoadingContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
`

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-repeat: repeat;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
`

const getSelectedKey = (pathname: string) => {
  if (pathname.includes('build')) return '2'
  else if (pathname.includes('raid')) return '3'
  return '1'
}

export const ME = gql`
  query {
    me {
      email
      name
      verified
    }
  }
`

export const RESEND_VERIFICATION = gql`
  mutation {
    resendVerification {
      id
    }
  }
`

const openNotification = (resendMutation: any) => {
  const key = `open${Date.now()}`
  const handleResendClick = () => {
    notification.close(key)
    resendMutation()
  }
  const btn = (
    <Flex
      style={{ width: '100%' }}
      direction='row'
      align='center'
      justify='space-between'
    >
      <Typography.Text style={{ marginRight: 30 }}>
        Didnt get an email?{' '}
      </Typography.Text>
      <Button onClick={handleResendClick} icon='mail' type='primary'>
        {'Resend'}
      </Button>
    </Flex>
  )

  notification.info({
    key,
    duration: 0,
    message: 'Please verify your account.',
    btn,
    description: (
      <Flex direction='column' align='center' justify='center'>
        <div>
          Check your Inbox. We have sent you a Mail to validate your account.
        </div>
        <Divider style={{ margin: '5px 0px' }} />
      </Flex>
    ),
  })
}

const AppContainer = ({ location }: RouteComponentProps<any>) => {
  const { loading, error, data } = useQuery(ME)
  const [loggedIn, setLoggedIn] = useContext(LoginContext)

  const [resendMutation, resendResult] = useMutation(RESEND_VERIFICATION)

  useEffect(() => {
    if (resendResult.data) {
      message.success('Verification Email resent.')
    } else if (resendResult.error) {
      message.error('Error sending Verification Email.')
    }
  }, [resendResult])
  /*
  useEffect(() => {
    loggedIn !== undefined && refetch()
  }, [loggedIn, refetch])
  */
  useEffect(() => {
    if (data && data.me) {
      if (!data.me.verified) {
        openNotification(resendMutation)
      }
      setLoggedIn(true)
    } else {
    }
  }, [data, setLoggedIn, resendMutation])
  useEffect(() => {
    if (error !== undefined) {
      setLoggedIn(false)
    }
  }, [error, setLoggedIn])
  if (loading) {
    return (
      <LoadingContainer>
        <Spin size='large' />
      </LoadingContainer>
    )
  }

  return (
    <Layout>
      <Menu me={data && data.me}/>
      <Routes isLoggedIn={loggedIn} />
    </Layout>
  )
}

export default withRouter(AppContainer)
