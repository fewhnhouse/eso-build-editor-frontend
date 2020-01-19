import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import gql from 'graphql-tag'
import { Card, Spin, Typography, Divider, Icon, Button } from 'antd'
import { useQuery } from 'react-apollo'
import { IGroupState } from '../group/GroupStateContext'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'

const { Title } = Typography

const UserGroupWrapper = styled(Flex)`
  width: 100%;
  margin-top: ${props => props.theme.margins.medium};
`

const GroupContainer = styled(Flex)`
  width: 100%;
  overflow: auto hidden;
`

const UserGroup = styled(Card)`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
  margin: 0px ${props => props.theme.margins.small};
  text-align: start;
`

const StyledButton = styled(Button)`
  margin: 0px ${props => props.theme.margins.small};
  height: 170px;
  width: 170px;
`

const Description = styled.p`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: break-spaces;
  margin: 0;
`

const StyledIcon = styled(Icon)`
  font-size: 30px;
`

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

  const handleAddClick = () => {
    setRedirect(`/groupEditor/0`)
  }

  return (
    <UserGroupWrapper align='center' direction='column' justify='center'>
      {!isMobile && (
        <Divider>
          <Title level={3}>My groups</Title>
        </Divider>
      )}
      {loading && <Spin />}
      <GroupContainer direction={isMobile ? 'column' : 'row'}>
        {!loading && !isMobile && (
          <StyledButton size='large' onClick={handleAddClick}>
            <StyledIcon type='plus' />
          </StyledButton>
        )}
        {data &&
          data.ownGroups &&
          data.ownGroups.map((ownGroup: IGroupState) => {
            return (
              <UserGroup
                actions={[
                  <Icon
                    type='edit'
                    title='Edit'
                    key='group-edit'
                    onClick={handleClick(`/editGroup/${ownGroup?.id ?? ''}/0`)}
                  />,
                  <Icon
                    type='select'
                    title='Open'
                    key='group-open'
                    onClick={handleClick(`/groups/${ownGroup?.id ?? ''}`)}
                  />,
                ]}
                key={ownGroup.id}
                hoverable
              >
                <Card.Meta
                  title={ownGroup.name}
                  description={
                    <Description>{ownGroup.description}</Description>
                  }
                ></Card.Meta>
              </UserGroup>
            )
          })}
      </GroupContainer>
      <Divider />
    </UserGroupWrapper>
  )
}

export default UserGroupBar
