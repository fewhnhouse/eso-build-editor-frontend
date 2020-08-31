import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { useQuery } from 'react-apollo'
import { OWN_GROUPS } from '../../home/HorizontalGroupCards'
import { Redirect } from 'react-router-dom'
import { IGroupState } from '../GroupStateContext'
import SimpleCard from '../../../components/SimpleCard'

const Container = styled(Flex)`
  padding: ${props => props.theme.paddings.medium};
  overflow: auto;
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
        <SimpleCard
          key={group.id}
          onEditRedirect={handleRedirect(`/editGroup/${group.id}/0`)}
          onOpenRedirect={handleRedirect(`/groups/${group.id}`)}
          item={group}
        />
      ))}
    </Container>
  )
}
