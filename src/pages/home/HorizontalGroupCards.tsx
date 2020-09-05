import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Card, Spin, Divider } from 'antd'
import { useQuery } from 'react-apollo'
import { IGroupState } from '../group/GroupStateContext'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { EditOutlined, SelectOutlined } from '@ant-design/icons'
import Header from './Header'
import { Wrapper, Container, StyledCard, Description } from './StyledComponents'

export const OWN_GROUPS = gql`
  query OwnGroups(
    $where: GroupWhereInput
    $orderBy: GroupOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    ownGroups(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      name
      description
    }
  }
`

const UserGroupBar = () => {
  const [redirect, setRedirect] = useState('')
  const { loading, error, data } = useQuery(OWN_GROUPS)
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (error) {
    return <div>Error.</div>
  }

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }

  return (
    <Wrapper
      isMobile={isMobile}
      align='center'
      direction='column'
      justify={isMobile ? 'flex-start' : 'center'}
    >
      {loading && <Spin />}
      {!isMobile && (
        <Header createPath='/groupEditor/0' allPath='/groups' title='Groups' />
      )}
      <Container direction={isMobile ? 'column' : 'row'}>
        {data &&
          data.ownGroups &&
          data.ownGroups.map((ownGroup: IGroupState) => {
            return (
              <StyledCard
                isMobile={isMobile}
                actions={[
                  <EditOutlined
                    title='Edit'
                    key='group-edit'
                    onClick={handleClick(`/editGroup/${ownGroup?.id ?? ''}/0`)}
                  />,
                  <SelectOutlined
                    title='Open'
                    key='group-open'
                    onClick={handleClick(`/groups/${ownGroup?.id ?? ''}`)}
                  />,
                ]}
                key={ownGroup.id}
              >
                <Card.Meta
                  title={ownGroup.name}
                  description={
                    <Description>{ownGroup.description}</Description>
                  }
                ></Card.Meta>
              </StyledCard>
            )
          })}
      </Container>
      {!isMobile && <Divider />}
    </Wrapper>
  )
}

export default UserGroupBar
