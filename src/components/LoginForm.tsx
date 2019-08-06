import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import React, { useState } from 'react';
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
const StyledForm = styled(Form)`
  display: flex;
  width: '250px';
  flex-direction: column;
`;

interface LoginFormProps extends FormComponentProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginForm = ({ form, setLoggedIn }: LoginFormProps) => {
  const handleSubmit = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login({
          variables: { email: values.email, password: values.password },
        });
      }
    });
  };

  const [login, { error, data }] = useMutation<
    { login: { token: string } },
    { email: string; password: string }
  >(LOGIN);

  if (error) {
    message.error(error.message);
  }
  if (data) {
    console.log('data', data);
    setLoggedIn(true);
    localStorage.setItem('token', data.login.token);
  }

  const { getFieldDecorator } = form;
  return (
    <StyledForm onSubmit={handleSubmit} className="login-form">
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
        <a className="login-form-forgot" href="/resetPassword">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

const WrappedNormalLoginForm = Form.create<LoginFormProps>({
  name: 'normal_login',
})(LoginForm);

export default WrappedNormalLoginForm;
