import React, { useEffect, useContext, useReducer } from 'react'
import '../App.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'
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
import Menu from './menu/Menu'
import Div100vh from 'react-div-100vh'
import { MailOutlined } from '@ant-design/icons'

const LoadingContainer = styled.div`
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
`
export const AppContext = React.createContext<
  Partial<[IAppState, React.Dispatch<IAppAction>]>
>([])

export const ME = gql`
  query {
    me {
      id
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

interface IAppAction {
  type: string
  payload: any
}

const appReducer = (state: IAppState, action: IAppAction) => {
  switch (action.type) {
    case 'SET_HEADER_TITLE': {
      const { headerTitle } = action.payload
      return {
        ...state,
        headerTitle,
      }
    }
    case 'SET_HEADER_SUBTITLE': {
      const { headerSubTitle } = action.payload
      return {
        ...state,
        headerSubTitle,
      }
    }
    default:
      return state
  }
}

interface IAppState {
  headerTitle: string
  headerSubTitle: string
}
const defaultAppState: IAppState = {
  headerTitle: '',
  headerSubTitle: '',
}

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
      <Button
        onClick={handleResendClick}
        icon={<MailOutlined />}
        type='primary'
      >
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
  const [state, dispatch] = useReducer(appReducer, defaultAppState)

  useEffect(() => {
    if (resendResult.data) {
      message.success('Verification Email resent.')
    } else if (resendResult.error) {
      message.error('Error sending Verification Email.')
    }
  }, [resendResult])

  useEffect(() => {
    if (data && data.me) {
      if (!data.me.verified) {
        openNotification(resendMutation)
      }
      setLoggedIn(true)
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
    <Div100vh>
      <Layout style={{ height: '100%' }}>
        <AppContext.Provider value={[state, dispatch]}>
          <Menu me={data && data.me} />
          <Routes isLoggedIn={loggedIn} />
        </AppContext.Provider>
      </Layout>
    </Div100vh>
  )
}

export default withRouter(AppContainer)
