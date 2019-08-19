import React from 'react';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';
import { message, Typography } from 'antd';
import styled from 'styled-components';

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
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 68px);
  text-align: center;
  padding: 40px;
`;
export default ({ match }: RouteComponentProps<{ token: string }>) => {
  const { token } = match.params;
  const [mutate, { error, data }] = useMutation(VERIFY, {
    variables: { token },
  });
  if (!token) {
    message.error('No token provided.');
  } else {
    mutate({ variables: { token } });
  }
  console.log(error, data, token);
  if (error) {
    message.error('Invalid token.');
  } else if (data && data.confirmSignup) {
    localStorage.setItem('token', data.confirmSignup.token);
    message.success('Account verified.');
  }
  return (
    <Container>
      <Typography.Title>Verify</Typography.Title>
    </Container>
  );
};
