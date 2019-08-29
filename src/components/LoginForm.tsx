import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message,
  notification,
} from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { FormComponentProps } from 'antd/lib/form'
import { RouteComponentProps, withRouter } from 'react-router'
import { LoginContext } from '../App'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`

const REGISTER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(email: $email, name: $username, password: $password) {
      name
      id
    }
  }
`
const StyledForm = styled(Form)`
  display: flex;
  width: '300px';
  flex-direction: column;
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

const hasErrors = (fieldsError: any) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

interface LoginFormProps extends FormComponentProps, RouteComponentProps<any> {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
}
const LoginForm = ({ form, location, match }: LoginFormProps) => {
  const [register, setRegister] = useState(false)
  const [, setLoggedIn] = useContext(LoginContext)
  const [mutateLogin, loginResult] = useMutation<ILoginResult, ILoginData>(
    LOGIN
  )
  const [mutateRegister, registerResult] = useMutation<
    IRegisterResult,
    IRegisterData
  >(REGISTER)

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
    validateFields,
  } = form
  useEffect(() => {
    validateFields()
  }, [validateFields])

  const handleSubmit = (e: React.SyntheticEvent<any>) => {
    e.preventDefault()
    validateFields((err: any, values: any) => {
      if (!err) {
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
    })
  }

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
        notification.success({
          message: 'Registration successful.',
          description:
            'Check your Inbox. We have sent you a Mail to validate your account.',
        })
      }
    }
  }, [loginResult, registerResult, setLoggedIn])

  const emailError = isFieldTouched('email') && getFieldError('email')
  const usernameError = isFieldTouched('username') && getFieldError('username')
  const passwordError = isFieldTouched('password') && getFieldError('password')
  return (
    <StyledForm onSubmit={handleSubmit} className='login-form'>
      {register && (
        <Form.Item
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
                min: 2,
              },
            ],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
            />
          )}
        </Form.Item>
      )}
      <Form.Item
        validateStatus={emailError ? 'error' : ''}
        help={emailError || ''}
      >
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: 'Please input a valid email!',
              whitespace: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
          ],
        })(
          <Input
            prefix={<Icon type='email' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Email'
          />
        )}
      </Form.Item>
      <Form.Item
        validateStatus={passwordError ? 'error' : ''}
        help={passwordError || ''}
      >
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input a valid Password!',
              min: 6,
              whitespace: true,
            },
          ],
        })(
          <Input
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            placeholder='Password'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        {!register && (
          <a className='login-form-forgot' href='/resetPassword'>
            Forgot password
          </a>
        )}
      </Form.Item>
      <Form.Item>
        <Button
          disabled={hasErrors(getFieldsError())}
          loading={loginResult.loading || registerResult.loading}
          style={{ width: '100%' }}
          type='primary'
          htmlType='submit'
          className='login-form-button'
        >
          {register ? 'Register' : 'Login'}
        </Button>
        Or
        <Button type='link' onClick={() => setRegister(register => !register)}>
          {register ? 'login.' : 'register now!'}
        </Button>
      </Form.Item>
    </StyledForm>
  )
}

const WrappedNormalLoginForm = Form.create<LoginFormProps>({
  name: 'normal_login',
})(LoginForm)

export default withRouter(WrappedNormalLoginForm)
