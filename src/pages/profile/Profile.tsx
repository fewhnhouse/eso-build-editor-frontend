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
import { RESEND_VERIFICATION, AppContext } from '../../components/AppContainer'
import Scrollbars from 'react-custom-scrollbars'
import UpdateWebhook from './UpdateWebhook'
import Helmet from 'react-helmet'

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

const StyledFlexButton = styled(Flex)`
  width: 100%;
`

const StyledText = styled(Typography.Text)`
  margin-right: 30px;
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.mini} 0px;
`

const StyledFlexFull = styled(Flex)`
  width: 100%;
`

const ME = gql`
  query {
    me {
      id
      email
      name
      webhook
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

const UPDATE_WEBHOOK = gql`
  mutation updateWebhook($webhook: String!) {
    updateWebhook(webhook: $webhook) {
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
    webhook?: string
  }
  value?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  handleActionClick: (clickedAction: ProfileAction) => () => void
}

export enum ProfileAction {
  updateEmail = 'UPDATE_EMAIL',
  updatePassword = 'UPDATE_PASSWORD',
  deleteAccount = 'DELETE_ACCOUNT',
  updateWebhook = 'UPDATE_WEBHOOK',
}

const openNotification = (resendMutation: any) => {
  const key = `open${Date.now()}`
  const handleResendClick = () => {
    notification.close(key)
    resendMutation()
  }
  const btn = (
    <StyledFlexButton direction='row' align='center' justify='space-between'>
      <StyledText>Didnt get an email? </StyledText>
      <Button onClick={handleResendClick} icon='mail' type='primary'>
        {'Resend'}
      </Button>
    </StyledFlexButton>
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
        <StyledDivider />
      </Flex>
    ),
  })
}

const Profile = ({ loggedIn }: IProfileProps) => {
  const me = useQuery(ME)
  const [, appDispatch] = useContext(AppContext)
  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Profile' },
    })
    appDispatch!({
      type: 'SET_HEADER_SUBTITLE',
      payload: { headerSubTitle: '' },
    })
  }, [appDispatch])

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [webhook, setWebhook] = useState('')
  const [email, setEmail] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [, setLoggedIn] = useContext(LoginContext)
  const [action, setAction] = useState<ProfileAction>()
  const handleActionClick = (clickedAction: ProfileAction) => () => {
    setAction(clickedAction)
  }
  const [resendMutation, resendResult] = useMutation(RESEND_VERIFICATION)
  const [updateWebhook, updateWebhookResult] = useMutation<any, any>(
    UPDATE_WEBHOOK
  )
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
      deleteAccountResult.data ||
      updateWebhookResult.data
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
        case ProfileAction.updateWebhook:
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
      deleteAccountResult.error ||
      updateWebhookResult.error
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
    updateWebhookResult,
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
      case ProfileAction.updateWebhook:
        await updateWebhook({
          variables: { webhook },
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
      <Helmet>
        <title>Profile</title>
      </Helmet>

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
          <StyledFlexFull
            direction='column'
            justify='space-around'
            align='center'
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
            <UpdateWebhook
              value={webhook}
              setValue={setWebhook}
              handleActionClick={handleActionClick}
            />
            <Divider />

            <DeleteAccount handleActionClick={handleActionClick} />
          </StyledFlexFull>
        </Scrollbars>
      </Container>
    </>
  )
}

export default Profile
