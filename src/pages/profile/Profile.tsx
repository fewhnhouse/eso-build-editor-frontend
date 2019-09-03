import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import {
  Layout,
  Typography,
  Divider,
  Input,
  Modal,
  notification,
  Button,
  message,
  Card,
} from 'antd'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import Flex from '../../components/Flex'
import UpdateEmail from './UpdateEmail'
import DeleteAccount from './DeleteAccount'
import UpdatePassword from './UpdatePassword'
import { LoginContext } from '../../App'
import { Redirect } from 'react-router'
import { RESEND_VERIFICATION } from '../../components/AppContainer'
import Scrollbars from 'react-custom-scrollbars'

const { Content } = Layout
const { Title } = Typography

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
  height: 100%;
  color: ${props => props.theme.mainBg};
`

export const ItemCard = styled(Card)`
  max-width: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '' : '500px'};
  width: ${(props: { isMobile: boolean }) => (props.isMobile ? '100%' : '40%')};
`

const ME = gql`
  query {
    me {
      id
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

const openNotification = (resendMutation: any) => {
  const key = `open${Date.now()}`
  const handleResendClick = () => {
    notification.close(key)
    resendMutation()
  }
  const btn = (
    <Flex
      style={{ width: '100%' }}
      direction='row'
      align='center'
      justify='space-between'
    >
      <Typography.Text style={{ marginRight: 30 }}>
        Didnt get an email?{' '}
      </Typography.Text>
      <Button onClick={handleResendClick} icon='mail' type='primary'>
        {'Resend'}
      </Button>
    </Flex>
  )

  notification.info({
    key,
    duration: 0,
    message: 'Please verify your account.',
    btn,
    description: (
      <Flex direction='column' align='center' justify='center'>
        <div>
          Check your Inbox. We have sent you a Mail to validate your account.
        </div>
        <Divider style={{ margin: '5px 0px' }} />
      </Flex>
    ),
  })
}

const Profile = ({ loggedIn }: IProfileProps) => {
  const me = useQuery(ME)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [, setLoggedIn] = useContext(LoginContext)
  const [action, setAction] = useState<ProfileAction>()
  const handleActionClick = (clickedAction: ProfileAction) => () => {
    setAction(clickedAction)
  }
  const [resendMutation, resendResult] = useMutation(RESEND_VERIFICATION)
  const [updateEmail, updateEmailResult] = useMutation<any, any>(UPDATE_EMAIL)
  const [updatePassword, updatePasswordResult] = useMutation<any, any>(
    UPDATE_PASSWORD
  )
  const [deleteAccount, deleteAccountResult] = useMutation<any, any>(
    DELETE_ACCOUNT
  )

  useEffect(() => {
    if (
      updatePasswordResult.data ||
      updateEmailResult.data ||
      deleteAccountResult.data
    ) {
      switch (action) {
        case ProfileAction.updateEmail:
          openNotification(resendMutation)
          break
        case ProfileAction.updatePassword:
          notification.success({
            message: action,
            description: `${action} update successful!`,
          })
          break
        case ProfileAction.deleteAccount:
          localStorage.removeItem('token')
          setLoggedIn(false)
          notification.success({
            message: action,
            description: `${action} update successful!`,
          })
          setRedirect(true)
          break
        default:
          break
      }
      setAction(undefined)
      setPassword('')
      setEmail('')
      setOldPassword('')
    } else if (
      updatePasswordResult.error ||
      updateEmailResult.error ||
      deleteAccountResult.error
    ) {
      notification.error({
        message: `${action} update failed.`,
        description: "Changes couldn't be saved. Try again later",
      })
      setAction(undefined)
      setPassword('')
      setEmail('')
      setOldPassword('')
    }
  }, [
    updatePasswordResult,
    updateEmailResult,
    deleteAccountResult,
    action,
    resendMutation,
    setLoggedIn,
  ])

  useEffect(() => {
    if (resendResult.data) {
      message.success('Verification Email resent.')
    } else if (resendResult.error) {
      message.error('Error sending Verification Email.')
    }
  }, [resendResult])

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
    setOldPassword('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)
  }
  if (redirect) {
    return <Redirect to='/' />
  }
  return (
    <>
      <Modal
        title='Confirm password'
        visible={action !== undefined}
        okText='Confirm and apply'
        onOk={handleConfirm}
        onCancel={handleCancel}
        confirmLoading={
          updatePasswordResult.loading ||
          updateEmailResult.loading ||
          deleteAccountResult.loading
        }
      >
        <Input.Password
          onChange={handleChange}
          value={oldPassword}
          size='large'
          placeholder='Type current password...'
        />
      </Modal>
      <Container>
        <Scrollbars autoHide>
          <Title>Hello {me && me.data.me ? me.data.me.name : ''}!</Title>
          <Flex
            direction='column'
            justify='space-around'
            align='center'
            style={{ width: '100%' }}
          >
            <UpdateEmail
              value={email}
              setValue={setEmail}
              me={me.data.me}
              handleActionClick={handleActionClick}
            />
            <Divider />
            <UpdatePassword
              value={password}
              setValue={setPassword}
              handleActionClick={handleActionClick}
            />
            <Divider />
            <DeleteAccount handleActionClick={handleActionClick} />
          </Flex>
        </Scrollbars>
      </Container>
    </>
  )
}

export default Profile
