import React from 'react'
import styled from 'styled-components'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { ResultStatusType } from 'antd/lib/result';

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
  subTitle = 'Sorry, you are not authorized to access this page.',
}: IErrorPageProps) => {
  return (
    <Container>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          <Link to='/'>
            <Button type='primary'>Back Home</Button>
          </Link>
        }
      />
    </Container>
  )
}
