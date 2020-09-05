import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import {
  StyledScrollbars,
  StyledList,
  ListItem,
  ActionButton,
  ListMeta,
} from './StyledComponents'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { titleCase } from '../raid/builds/BuildMenu'
import ListWrapper from './ListWrapper'
import { IGroupState } from '../group/GroupStateContext'

interface IUserDataProps {
  data: IGroupState[]
  loading: boolean
}

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

const GroupList = () => {
  const [search, setSearch] = useState('')

  const groupsQuery = useQuery(OWN_GROUPS, {
    variables: {
      where: {
        OR: [
          { name_contains: search },
          { name_contains: search.toLowerCase() },
          { name_contains: search.toUpperCase() },
          { name_contains: titleCase(search) },
        ],
      },
    },
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <ListWrapper
      placeholder='Search for Groups...'
      hasExpansion={false}
      expanded={false}
      search={search}
      handleSearchChange={handleSearchChange}
      InnerList={
        <InnerList
          loading={groupsQuery.loading}
          data={
            groupsQuery.data && groupsQuery.data.ownGroups
              ? groupsQuery.data.ownGroups
              : []
          }
        />
      }
    ></ListWrapper>
  )
}

const InnerList = ({ data, loading }: IUserDataProps) => {
  const [path, setRedirect] = useState('')

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (path !== '') {
    return <Redirect push to={`${path}`} />
  }

  return (
    <StyledScrollbars>
      <StyledList
        isMobile={isMobile}
        loading={loading}
        dataSource={data}
        renderItem={(_, index: number) => {
          const group = data[index]
          return (
            <ListItem
              actions={[
                <ActionButton
                  onClick={handleClick(`/editGroup/${group.id}/0`)}
                  size='small'
                  type='default'
                  key='list-edit'
                >
                  Edit
                </ActionButton>,
                <ActionButton
                  onClick={handleClick(`/groups/${group.id}`)}
                  size='small'
                  type='primary'
                  key='list-view'
                >
                  View
                </ActionButton>,
              ]}
            >
              <ListMeta
                style={{ textAlign: 'start' }}
                title={group.name || ''}
                description={group.description || ''}
              />
            </ListItem>
          )
        }}
      />
    </StyledScrollbars>
  )
}

export default GroupList
