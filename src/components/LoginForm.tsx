import { Form, Icon, Input, Button, Checkbox } from "antd";
import React from "react";
import styled from "styled-components";

const StyledForm = styled(Form)`
  display: flex;
  width: "250px";
  flex-direction: column;
`;

const LoginForm = ({ form }: { form: any }) => {
  const handleSubmit = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
    <StyledForm onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="/resetPassword">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default WrappedNormalLoginForm;
