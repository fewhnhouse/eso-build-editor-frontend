import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message,
  notification,
} from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FormComponentProps } from 'antd/lib/form';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

const REGISTER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(email: $email, name: $username, password: $password) {
      name
      id
    }
  }
`;
const StyledForm = styled(Form)`
  display: flex;
  width: '300px';
  flex-direction: column;
`;

interface ILoginData {
  email: string;
  password: string;
}

interface ILoginResult {
  login: {
    token: string;
  };
}

interface IRegisterData extends ILoginData {
  username: string;
}

interface IRegisterResult {
  signup: {
    token: string;
  };
}

interface LoginFormProps extends FormComponentProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
const LoginForm = ({ form, setLoggedIn }: LoginFormProps) => {
  const [register, setRegister] = useState(false);
  const [mutateLogin, loginResult] = useMutation<ILoginResult, ILoginData>(
    LOGIN
  );
  const [mutateRegister, registerResult] = useMutation<
    IRegisterResult,
    IRegisterData
  >(REGISTER);

  const handleSubmit = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (register) {
          mutateRegister({
            variables: {
              email: values.email,
              username: values.username,
              password: values.password,
            },
          });
        } else {
          mutateLogin({
            variables: { email: values.email, password: values.password },
          });
        }
      }
    });
  };

  useEffect(() => {
    if (loginResult.called) {
      if (loginResult.error !== undefined) {
        message.error(loginResult.error.message);
      }

      if (loginResult.data) {
        setLoggedIn(true);
        localStorage.setItem(
          'token',
          loginResult.data ? loginResult.data.login.token : ''
        );
      }
    } else if (registerResult.called) {
      console.log(registerResult);
      if (registerResult.error !== undefined) {
        message.error(registerResult.error.message);
      }
      if (registerResult.data) {
        setLoggedIn(true);
        notification.success({
          message: 'Registration successful.',
          description:
            'Check your Inbox. We have sent you a Mail to validate your account.',
        });
      }
    }
  }, [loginResult, registerResult]);

  const { getFieldDecorator } = form;
  return (
    <StyledForm onSubmit={handleSubmit} className="login-form">
      {register && (
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
      )}
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your email!' }],
        })(
          <Input
            prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        {!register && (
          <a className="login-form-forgot" href="/resetPassword">
            Forgot password
          </a>
        )}
      </Form.Item>
      <Form.Item>
        <Button
          loading={loginResult.loading || registerResult.loading}
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {register ? 'Register' : 'Login'}
        </Button>
        Or{' '}
        <a onClick={() => setRegister(register => !register)}>
          {register ? 'login.' : 'register now!'}
        </a>
      </Form.Item>
    </StyledForm>
  );
};

const WrappedNormalLoginForm = Form.create<LoginFormProps>({
  name: 'normal_login',
})(LoginForm);

export default WrappedNormalLoginForm;
