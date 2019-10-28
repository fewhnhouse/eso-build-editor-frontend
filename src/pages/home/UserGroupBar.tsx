import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import { group } from '../../util/fragments'
import gql from 'graphql-tag'
import { Card, Spin, Typography, Button, Divider, Icon } from 'antd'
import { useQuery } from 'react-apollo'
import { IGroupState } from '../group/GroupStateContext'
import Scrollbars from 'react-custom-scrollbars'
import { Redirect } from 'react-router'

const { Title, Text } = Typography

const UserGroupWrapper = styled(Flex)`
  width: 100%;
  margin-top: ${props => props.theme.margins.medium};
`

const GroupContainer = styled(Flex)`
  width: calc(100% - 40px);
  margin: ${props => props.theme.margins.medium};
  overflow-x: auto;
  overflow-y: hidden;
`

const UserGroup = styled(Card)`
  margin: ${props => props.theme.margins.mini};
  width: ${props => props.theme.widths.small};
  min-width: 200px;
  height: 100px;
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.mini} 0px;
`

const StyledIcon = styled(Icon)`
  margin-right: 5px;
`

const Description = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const StyledTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.normal};
  line-height: 1.5;
  font-weight: 500;
  color: ${props => props.theme.colors.grey.dark};
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`

const OWN_GROUPS = gql`
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
      ...Group
    }
  }
  ${group}
`

const UserGroupBar = () => {
  const [redirect, setRedirect] = useState('')
  const { loading, error, data } = useQuery(OWN_GROUPS)

  if (error) {
    return <div>Error.</div>
  }

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const handleClick = (id: string) => () => {
    setRedirect(`/groups/${id}`)
  }

  const handleAddClick = () => {
    setRedirect(`/groupEditor/0`)
  }

  const raids = data.ownGroups
  return (
    <UserGroupWrapper align='center' direction='column' justify='center'>
      <Divider>
        <Title level={3}>My groups</Title>
      </Divider>
      {loading && <Spin />}
      <GroupContainer>
        {data &&
          data.ownGroups &&
          data.ownGroups.map((ownGroup: IGroupState) => {
            return (
              <UserGroup
                hoverable
                onClick={handleClick(ownGroup ? ownGroup.id || '' : '')}
              >
                <StyledTitle>
                  <Flex direction='row' justify='space-between'>
                    {ownGroup.name}
                  </Flex>
                </StyledTitle>
                <StyledDivider />
                <Description>{ownGroup.description}</Description>
              </UserGroup>
            )
          })}
        {!loading && (
          <UserGroup
            onClick={handleAddClick}
            bodyStyle={{ height: '100%' }}
            hoverable
          >
            <Typography.Title style={{ margin: 0 }} level={4}>
              <StyledIcon type='plus' />
              Add Group
            </Typography.Title>
          </UserGroup>
        )}
      </GroupContainer>
    </UserGroupWrapper>
  )
}

export default UserGroupBar
