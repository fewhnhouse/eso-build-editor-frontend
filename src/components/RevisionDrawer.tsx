import React, { useState } from 'react'
import { Drawer, Timeline, Tag, Button, Spin } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { IBuild } from '../pages/build/BuildStateContext'
import { Redirect, withRouter, RouteComponentProps } from 'react-router'
import { useMediaQuery } from 'react-responsive'

interface IRevisionDrawerProps extends RouteComponentProps<{ id: string }> {
  onClose: () => void
  visible: boolean
  revisionId?: string
}

const GET_CURRENT_REVISION = gql`
  query buildRevision($id: ID!) {
    buildRevision(id: $id) {
      id
      builds(orderBy: updatedAt_DESC) {
        id
        updatedAt
      }
    }
  }
`
const RevisionDrawer = ({
  onClose,
  visible,
  revisionId,
  match,
}: IRevisionDrawerProps) => {
  const { id } = match.params
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const { data, loading } = useQuery(GET_CURRENT_REVISION, {
    variables: { id: revisionId },
  })

  const [redirect, setRedirect] = useState('')

  const handleRevisionClick = (id: string) => () => {
    setRedirect(`/builds/${id}`)
  }
  if (redirect) {
    return <Redirect to={redirect} />
  }
  return (
    <Drawer
      height='100%'
      title='Revisions'
      placement={isMobile ? 'bottom' : 'right'}
      closable
      onClose={onClose}
      visible={visible}
    >
      {loading ? (
        <Spin />
      ) : (
        <Timeline>
          {data.buildRevision.builds.map((build: IBuild, index: number) => {
            const date = build.updatedAt ? new Date(build.updatedAt) : undefined
            return (
              <Timeline.Item color={id === build.id ? 'green' : 'blue'}>
                Revision {date && date.toLocaleString()} <br />
                {id === build.id ? (
                  <Tag color='green'>Currently Selected</Tag>
                ) : (
                  <Button
                    size='small'
                    onClick={handleRevisionClick(build.id || '')}
                  >
                    Select
                  </Button>
                )}
              </Timeline.Item>
            )
          })}
        </Timeline>
      )}
    </Drawer>
  )
}

export default withRouter(RevisionDrawer)
