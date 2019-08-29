import React, { useContext } from 'react'
import styled from 'styled-components'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { ResultStatusType } from 'antd/lib/result'
import { LoginContext } from '../App'

const Container = styled.div`
  background: #ededed;
  width: 100vw;
  height: calc(100vh - 64px);
`

interface IErrorPageProps {
  status?: ResultStatusType
  title?: React.ReactNode
  subTitle?: React.ReactNode
}
export default ({
  status = '403',
  title = 'Forbidden',
  subTitle,
}: IErrorPageProps) => {
  const [loggedIn] = useContext(LoginContext)
  return (
    <Container>
      <Result
        status={status}
        title={title}
        subTitle={
          subTitle || !loggedIn
            ? 'You have to be logged in to access this page'
            : 'Sorry, you are not authorized to access this page.'
        }
        extra={
          <Link to='/'>
            <Button type='primary'>Back Home</Button>
          </Link>
        }
      />
    </Container>
  )
}
