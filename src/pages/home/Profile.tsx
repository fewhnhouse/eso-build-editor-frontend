import React from 'react'
import styled from 'styled-components'
import { Layout, Typography, Divider, Input, Button } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Flex from '../../components/Flex'

const { Content } = Layout
const { Title, Text } = Typography

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 64px);
  color: ${props => props.theme.mainBg};
`

const ME = gql`
  query {
    me {
      email
      name
    }
  }
`

interface IProfileProps {
  loggedIn: boolean
}

const Profile = ({ loggedIn }: IProfileProps) => {
  const { loading, error, data } = useQuery(ME)
  return (
    <>
      <Container>
        <Title>Hello {data && data.me ? data.me.name : ''}!</Title>
        <Flex direction='column' justify='space-around' align='center'>
          <Flex
            style={{ marginBottom: 20, width: 400 }}
            direction='column'
            justify='flex-start'
            align='center'
          >
            <Text strong style={{ marginBottom: 10 }}>
              Change your email
            </Text>
            <Text>
              Changing your email will require the new address to be verified.
              Make sure to type the new address correctly and click the link in
              the verification mail.
            </Text>
            <Text style={{ marginTop: 20 }}>
              Current email: {data && data.me ? data.me.email : ''}
            </Text>
            <Input
              style={{ width: 400 }}
              size='large'
              placeholder='Type new email...'
            />
            <Button type='primary'>Update email</Button>
          </Flex>
          <Divider />
          <Flex
            style={{ marginBottom: 20, width: 400 }}
            direction='column'
            justify='flex-start'
            align='center'
          >
            <Text strong style={{ marginBottom: 10 }}>
              Change your password
            </Text>
            <Input.Password
              style={{ width: 400 }}
              size='large'
              placeholder='New password'
            />
            <Input.Password
              style={{ width: 400 }}
              size='large'
              placeholder='Confirm new password'
            />
            <Button type='primary'>Update password</Button>
          </Flex>
          <Divider />
          <Flex
            style={{ marginBottom: 20, width: 400 }}
            direction='column'
            justify='flex-start'
            align='center'
          >
            <Text strong style={{ color: 'red', marginBottom: 10 }}>
              Delete the account
            </Text>
            <Text>
              Deleting will remove the account and all associated data. Builds
              and raids created by this account will be
              <span style={{ color: 'red' }}>
                {' '}
                deleted immediately and permanently
              </span>
              . Any access this account has to shared builds or raids will be
              removed.
            </Text>
            <Text strong style={{ marginTop: 20 }}>
              This action cannot be undone.
            </Text>
            <Button type='danger'>Delete account</Button>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}

export default Profile
