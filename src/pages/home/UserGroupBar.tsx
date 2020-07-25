import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import gql from 'graphql-tag'
import { Card, Spin, Typography, Divider, Button } from 'antd'
import { useQuery } from 'react-apollo'
import { IGroupState } from '../group/GroupStateContext'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../../components/theme'
import { EditOutlined, SelectOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const UserGroupWrapper = styled(Flex)`
  width: 100%;
  margin-top: ${(props) => props.theme.margins.medium};
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'calc(100vh - 130px)' : ''};
`

const GroupContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow: auto;
`

const UserGroup = styled(Card)`
  width: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? `calc(100% - 20px)` : '250px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
  margin: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile
      ? `${props.theme.margins.small}`
      : `0px ${props.theme.margins.small}`};
  text-align: start;
`

const StyledButton = styled(Button)`
  margin: 0px ${(props) => props.theme.margins.small};
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

const StyledPlus = styled(PlusOutlined)`
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
    <UserGroupWrapper
      isMobile={isMobile}
      align='center'
      direction='column'
      justify={isMobile ? 'flex-start' : 'center'}
    >
      {!isMobile && (
        <Divider>
          <Title level={3}>My groups</Title>
        </Divider>
      )}
      {loading && <Spin />}
      <GroupContainer direction={isMobile ? 'column' : 'row'}>
        {!loading && !isMobile && (
          <StyledButton size='large' onClick={handleAddClick}>
            <StyledPlus />
          </StyledButton>
        )}
        {data &&
          data.ownGroups &&
          data.ownGroups.map((ownGroup: IGroupState) => {
            return (
              <UserGroup
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
      {!isMobile && <Divider />}
    </UserGroupWrapper>
  )
}

export default UserGroupBar
