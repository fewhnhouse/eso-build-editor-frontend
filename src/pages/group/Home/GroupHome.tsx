import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Collapse, Skeleton, Empty, Icon } from 'antd'
import { useQuery } from 'react-apollo'
import { OWN_GROUPS } from '../../home/UserGroupBar'
import { Redirect } from 'react-router-dom'
import { IGroupState } from '../GroupStateContext'

const Container = styled(Flex)`
  padding: ${props => props.theme.paddings.medium};
  overflow: auto;
`

const GroupCard = styled(Card)`
  margin: ${props => `${props.theme.margins.small}`};
  width: 300px;
`

export default () => {
  const { data } = useQuery(OWN_GROUPS)

  const groups: IGroupState[] = data?.ownGroups ?? []

  const [redirect, setRedirect] = useState('')

  const handleRedirect = (path: string) => () => {
    setRedirect(path)
  }

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  return (
    <Container fluid direction='row' wrap>
      {groups.map(group => (
        <GroupCard
          actions={[
            <Icon
              onClick={handleRedirect(`/editGroup/${group.id}/0`)}
              key='build-edit'
              type='edit'
              title='Edit'
            />,
            <Icon
              onClick={handleRedirect(`/groups/${group.id}`)}
              key='build-open'
              type='select'
              title='Open'
            />,
          ]}
          key={group.id}
        >
          <Card.Meta title={group.name} description={group.description} />
        </GroupCard>
      ))}
    </Container>
  )
}
