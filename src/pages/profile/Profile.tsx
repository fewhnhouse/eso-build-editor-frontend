import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Typography, Divider, Input, Modal, notification } from 'antd'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import Flex from '../../components/Flex'
import UpdateEmail from './UpdateEmail'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'

const { Content } = Layout
const { Title } = Typography

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
  mutation updateEmail($oldPassword: String!, $newEmail: String!) {
    updateEmail(oldPassword: $oldPassword, newEmail: $newEmail) {
      id
    }
  }
`

const UPDATE_PASSWORD = gql`
  mutation updatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`

const DELETE_ACCOUNT = gql`
  mutation deleteAccount($oldPassword: String!) {
    deleteAccount(oldPassword: $oldPassword) {
      id
    }
  }
`

interface IProfileProps {
  loggedIn: boolean
}

export interface IActionProps {
  me?: {
    name: string
    email: string
  }
  value?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  handleActionClick: (clickedAction: ProfileAction) => () => void
}

export enum ProfileAction {
  updateEmail = 'UPDATE_EMAIL',
  updatePassword = 'UPDATE_PASSWORD',
  deleteAccount = 'DELETE_ACCOUNT',
}

const Profile = ({ loggedIn }: IProfileProps) => {
  const me = useQuery(ME)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [action, setAction] = useState<ProfileAction>()
  const handleActionClick = (clickedAction: ProfileAction) => () => {
    setAction(clickedAction)
  }

  const [updateEmail, updateEmailResult] = useMutation<any, any>(UPDATE_EMAIL)
  const [updatePassword, updatePasswordResult] = useMutation<any, any>(
    UPDATE_PASSWORD
  )
  const [deleteAccount, deleteAccountResult] = useMutation<any, any>(
    DELETE_ACCOUNT
  )
  const { called, data, error, loading } =
    updatePasswordResult || updateEmailResult || deleteAccountResult
  useEffect(() => {
    if (data) {
      switch (action) {
        case ProfileAction.updateEmail:
          notification.success({
            message: 'Registration successful.',
            description:
              'Check your Inbox. We have sent you a Mail to validate your account.',
          })
          break
        case ProfileAction.updatePassword:
          notification.success({
            message: action,
            description: `${action} update successful!`,
          })
          break
        case ProfileAction.deleteAccount:
          notification.success({
            message: action,
            description: `${action} update successful!`,
          })
          break
        default:
          break
      }
      setAction(undefined)
      setPassword("")
      setEmail("")
      setOldPassword("")
    } else if (error) {
      notification.error({
        message: `${action} update failed.`,
        description: "Changes couldn't be saved. Try again later",
      })
      setAction(undefined)
      setPassword("")
      setEmail("")
      setOldPassword("")
    }
  }, [called, error, data])
  const handleConfirm = async () => {
    switch (action) {
      case ProfileAction.updateEmail:
        await updateEmail({ variables: { oldPassword, newEmail: email } })
        break
      case ProfileAction.updatePassword:
        await updatePassword({
          variables: { oldPassword, newPassword: password },
        })
        break
      case ProfileAction.deleteAccount:
        await deleteAccount({ variables: { oldPassword } })
        break
      default:
        break
    }
    setOldPassword('')
  }
  const handleCancel = () => {
    setAction(undefined)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)
  }
  return (
    <>
      <Modal
        title='Confirm password'
        visible={action !== undefined}
        okText='Confirm and apply'
        onOk={handleConfirm}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Input.Password
          onChange={handleChange}
          value={oldPassword}
          size='large'
          placeholder='Type current password...'
        />
      </Modal>
      <Container>
        <Title>Hello {me.data.me ? me.data.me.name : ''}!</Title>
        <Flex
          direction='column'
          justify='space-around'
          align='center'
          style={{ width: '100%', margin: 20 }}
        >
          <UpdateEmail value={email} setValue={setEmail} me={me.data.me} handleActionClick={handleActionClick} />
          <Divider />
          <UpdatePassword value={password} setValue={setPassword} handleActionClick={handleActionClick} />
          <Divider />
          <DeleteAccount handleActionClick={handleActionClick} />
        </Flex>
      </Container>
    </>
  )
}

export default Profile
