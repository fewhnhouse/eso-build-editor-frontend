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
import { useQuery, useMutation } from 'react-apollo'
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
const UPDATE_EMAIL = gql`
  mutation {

  }
`

interface IProfileProps {
  loggedIn: boolean
}

enum ProfileAction {
  updateEmail = 'UPDATE_EMAIL',
  updatePassword = 'UPDATE_PASSWORD',
  deleteAccount = 'DELETE_ACCOUNT',
}

const Profile = ({ loggedIn }: IProfileProps) => {
  const { loading, error, data } = useQuery(ME)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const [action, setAction] = useState<ProfileAction>()
  const handleActionClick = (clickedAction: ProfileAction) => () => {
    setAction(clickedAction)
  }

  const [updateEmail, updateEmailResult] = useMutation<any,any>(UPDATE_EMAIL)

  const handleConfirm = async () => {
    try {
      await (
        updateEmail
      )
      setAction(undefined)
      notification.success({
        message: action,
        description: `${action} update successful!`,
      })
    } catch (e) {
      notification.error({
        message: `${action} update failed.`,
        description: "Changes couldn't be saved. Try again later",
      })
    }
  }
  const handleCancel = () => {
    setAction(undefined)
  }

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  return (
    <>
      <Modal
        title='Confirm password'
        visible={action !== undefined}
        okText='Confirm and apply'
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        <Input.Password
          onChange={handleChange(setOldPassword)}
          value={oldPassword}
          size='large'
          placeholder='Type current password...'
        />
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
            <Input
              value={email}
              onChange={handleChange(setEmail)}
              size='large'
              placeholder='Type new email...'
            />
            <Button
              onClick={handleActionClick(ProfileAction.updateEmail)}
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
            <Input.Password
              value={password}
              onChange={handleChange(setPassword)}
              size='large'
              placeholder='New password'
            />
            <Button
              onClick={handleActionClick(ProfileAction.updatePassword)}
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
              onClick={handleActionClick(ProfileAction.deleteAccount)}
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
