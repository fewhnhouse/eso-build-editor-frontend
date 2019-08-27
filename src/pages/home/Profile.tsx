import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Typography,
  Divider,
  Input,
  Button,
  Card,
  Modal,
  notification,
} from 'antd'
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
  overflow: auto;
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
  const [action, setAction] = useState('')
  const handleActionClick = (clickedAction: string) => () => {
    setAction(clickedAction)
  }
  const handleConfirm = () => {
    console.log(action)
    setAction('');
    notification.success({
      message: action,
      description: `${action} update successful!`,
    })
  }
  const handleCancel = () => {
    setAction('')
  }
  return (
    <>
      <Modal
        title='Confirm password'
        visible={action !== ''}
        okText='Confirm and apply'
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        <Input.Password size='large' placeholder='Type current password...' />
      </Modal>
      <Container>
        <Title>Hello {data && data.me ? data.me.name : ''}!</Title>
        <Flex
          direction='column'
          justify='space-around'
          align='center'
          style={{ width: '100%', margin: 20 }}
        >
          <Card
            title='Change your email'
            style={{ maxWidth: 500, width: '40%' }}
          >
            <Text>Current email: {data && data.me ? data.me.email : ''}</Text>
            <Divider />
            <Input size='large' placeholder='Type new email...' />
            <Button
              onClick={handleActionClick('email')}
              block
              size='large'
              style={{ marginTop: 20 }}
              type='primary'
            >
              Update email
            </Button>
          </Card>
          <Divider />
          <Card
            title='Change your password'
            style={{ maxWidth: 500, width: '40%' }}
          >
            <Input.Password size='large' placeholder='New password' />
            <Button
              onClick={handleActionClick('password')}
              block
              size='large'
              style={{ marginTop: 20 }}
              type='primary'
            >
              Update password
            </Button>
          </Card>
          <Divider />
          <Card title='Delete account' style={{ maxWidth: 500, width: '40%' }}>
            <Text>
              Deleting will remove the account and all associated data. Builds
              and raids created by this account will be deleted permanently.
              <br /> Any access this account has to shared builds or raids will
              be removed.
            </Text>
            <Divider />
            <Text strong style={{ marginTop: 20 }}>
              This action cannot be undone.
            </Text>
            <Button
              onClick={handleActionClick('account')}
              block
              size='large'
              style={{ marginTop: 20 }}
              type='danger'
            >
              Delete account
            </Button>
          </Card>
        </Flex>
      </Container>
    </>
  )
}

export default Profile
