import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  notification,
  Divider,
  Typography,
} from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'
import { LoginContext } from '../App'
import Flex from './Flex'
import { RESEND_VERIFICATION } from './AppContainer'
import { Link } from 'react-router-dom'
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`

const REGISTER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(email: $email, name: $username, password: $password) {
      id
      name
    }
  }
`
const StyledForm = styled(Form)`
  display: flex;
  width: '300px';
  flex-direction: column;
`

const StyledFlex = styled(Flex)`
  width: 100%;
`

const StyledText = styled(Typography.Text)`
  margin-right: 30;
`

const StyledDivider = styled(Divider)`
  margin: ${(props) => props.theme.margins.mini} 0px;
`

const getStyledIcon = (Icon: any) => styled(Icon)`
  color: ${(props) => props.theme.colors.grey.light};
`

const StyledButton = styled(Button)`
  width: 100%;
`

interface ILoginData {
  email: string
  password: string
}

interface ILoginResult {
  login: {
    token: string
  }
}

interface IRegisterData extends ILoginData {
  username: string
}

interface IRegisterResult {
  signup: {
    token: string
  }
}

const StyledEmail = getStyledIcon(MailOutlined)
const StyledUser = getStyledIcon(UserOutlined)
const StyledLock = getStyledIcon(LockOutlined)

const hasErrors = (fieldsError: any, tosChecked: boolean) => {
  if (tosChecked === false) {
    return true
  } else {
    return Object.keys(fieldsError).some((field) => fieldsError[field])
  }
}

const openNotification = (resendMutation: any) => {
  const key = `open${Date.now()}`
  const handleResendClick = () => {
    notification.close(key)
    resendMutation()
  }
  const btn = (
    <StyledFlex direction='row' align='center' justify='space-between'>
      <StyledText>Didnt get an email?</StyledText>
      <Button
        onClick={handleResendClick}
        icon={<MailOutlined />}
        type='primary'
      >
        {'Resend'}
      </Button>
    </StyledFlex>
  )

  notification.info({
    key,
    duration: 0,
    message: 'Registration successful.',
    btn,
    description: (
      <Flex direction='column' align='center' justify='center'>
        <div>
          Check your Inbox. We have sent you a Mail to validate your account.
        </div>
        <StyledDivider />
      </Flex>
    ),
  })
}

interface LoginFormProps extends RouteComponentProps<any> {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
}
const LoginForm = () => {
  const [register, setRegister] = useState(false)
  const [form] = useForm()
  const { getFieldsError } = form
  const [, setLoggedIn] = useContext(LoginContext)
  const [mutateLogin, loginResult] = useMutation<ILoginResult, ILoginData>(
    LOGIN
  )
  const [resendMutation, resendResult] = useMutation(RESEND_VERIFICATION)

  const [mutateRegister, registerResult] = useMutation<
    IRegisterResult,
    IRegisterData
  >(REGISTER)

  const handleFinish = (values: any) => {
    if (register) {
      mutateRegister({
        variables: {
          email: values.email,
          username: values.username,
          password: values.password,
        },
      })
    } else {
      mutateLogin({
        variables: { email: values.email, password: values.password },
      })
    }
  }

  useEffect(() => {
    if (resendResult.data) {
      message.success('Verification Email resent.')
    } else if (resendResult.error) {
      message.error('Error sending Verification Email.')
    }
  }, [resendResult])

  useEffect(() => {
    if (loginResult.called) {
      if (loginResult.error !== undefined) {
        message.error(loginResult.error.message)
      }

      if (loginResult.data) {
        localStorage.setItem(
          'token',
          loginResult.data ? loginResult.data.login.token : ''
        )
        setLoggedIn(true)
      }
    } else if (registerResult.called) {
      if (registerResult.error !== undefined) {
        message.error(registerResult.error.message)
      }
      if (registerResult.data) {
        setLoggedIn(true)
        openNotification(resendMutation)
      }
    }
  }, [loginResult, registerResult, setLoggedIn, resendMutation])

  const [tosChecked, setTosChecked] = useState(false)

  const handleTosCheck = () => {
    tosChecked === true ? setTosChecked(false) : setTosChecked(true)
  }

  return (
    <StyledForm
      initialValues={{ remember: true }}
      name='login-form'
      onFinish={handleFinish}
      className='login-form'
    >
      {register && (
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              whitespace: true,
              min: 2,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input prefix={<StyledUser />} placeholder='Username' />
        </Form.Item>
      )}
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: 'Please input a valid email!',
            whitespace: true,
            //eslint-disable-next-line
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
        ]}
      >
        <Input prefix={<StyledEmail />} placeholder='Email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input a valid Password!',
            min: 6,
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<StyledLock />} type='password' placeholder='Password' />
      </Form.Item>
      <Form.Item name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
        {!register && (
          <a className='login-form-forgot' href='/resetPassword'>
            Forgot password
          </a>
        )}
      </Form.Item>
      {register && (
        <Checkbox defaultChecked={false} onChange={handleTosCheck}>
          I agree to the
          <Link to='/tos'> Terms of service</Link>.
        </Checkbox>
      )}
      <Form.Item>
        <StyledButton
          disabled={hasErrors(getFieldsError(), register ? tosChecked : true)}
          loading={loginResult.loading || registerResult.loading}
          type='primary'
          htmlType='submit'
          className='login-form-button'
        >
          {register ? 'Register' : 'Login'}
        </StyledButton>
        <br />
        Or
        <Button
          type='link'
          onClick={() => setRegister((register) => !register)}
        >
          {register ? 'login.' : 'register now!'}
        </Button>
      </Form.Item>
    </StyledForm>
  )
}

export default withRouter(LoginForm)
