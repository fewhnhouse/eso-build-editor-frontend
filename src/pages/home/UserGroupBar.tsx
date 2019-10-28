import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import { group } from '../../util/fragments'
import gql from 'graphql-tag'
import { Card, Spin, Typography, Divider, Icon } from 'antd'
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
  width: calc(100% - 40px);
  margin: ${props => props.theme.margins.medium};
  overflow-x: auto;
  overflow-y: hidden;
`

const UserGroup = styled(Card)`
  margin: ${props => props.theme.margins.mini};
  min-width: 200px;
  max-width: 400px;
  width: 100%;
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
  const isMobile = useMediaQuery({ maxWidth: 800 })

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

  return (
    <UserGroupWrapper align='center' direction='column' justify='center'>
      {!isMobile && (
        <Divider>
          <Title level={3}>My groups</Title>
        </Divider>
      )}
      {loading && <Spin />}
      <GroupContainer direction={isMobile ? 'column' : 'row'}>
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
        {!loading && !isMobile && (
          <UserGroup
            onClick={handleAddClick}
            bodyStyle={{ height: '100%' }}
            hoverable
          >
            <Flex fluid align='center' justify='center'>
              <Typography.Title style={{ margin: 0 }} level={4}>
                <StyledIcon type='plus' />
                Add Group
              </Typography.Title>
            </Flex>
          </UserGroup>
        )}
      </GroupContainer>
    </UserGroupWrapper>
  )
}

export default UserGroupBar
