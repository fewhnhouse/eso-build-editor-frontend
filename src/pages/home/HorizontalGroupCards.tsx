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
import { EditOutlined, SelectOutlined } from '@ant-design/icons'

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
  padding: 10px;
  overflow: auto;
`

const HeaderContainer = styled(Flex)`
  padding: 0px 10px;
`

const Header = styled(Title)`
  margin-bottom: 0px;
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


const Description = styled.p`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: break-spaces;
  margin: 0;
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
      {loading && <Spin />}
      {!isMobile && (<>
        <HeaderContainer fluid justify="space-between">
          <Header level={3}>Groups</Header>
          <Button onClick={handleAddClick} size="large" type="primary">Create</Button>
        </HeaderContainer>
        <Divider />
      </>)}
      <GroupContainer direction={isMobile ? 'column' : 'row'}>
       
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
