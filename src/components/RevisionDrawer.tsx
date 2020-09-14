import React, { useState } from 'react'
import { Drawer, Timeline, Tag, Button, Spin } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { IBuild } from '../pages/build/BuildStateContext'
import { Redirect, withRouter, RouteComponentProps } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { IRaid } from '../pages/raid/RaidStateContext'

interface IRevisionDrawerProps extends RouteComponentProps<{ id: string }> {
  onClose: () => void
  visible: boolean
  isBuild?: boolean
  revisionId?: string
}

const GET_CURRENT_BUILD_REVISION = gql`
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

const GET_CURRENT_RAID_REVISION = gql`
  query raidRevision($id: ID!) {
    raidRevision(id: $id) {
      id
      raids(orderBy: updatedAt_DESC) {
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
  isBuild,
  match,
}: IRevisionDrawerProps) => {
  const { id } = match.params
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const { data, loading } = useQuery(
    isBuild ? GET_CURRENT_BUILD_REVISION : GET_CURRENT_RAID_REVISION,
    {
      variables: { id: revisionId },
    }
  )

  const [redirect, setRedirect] = useState('')

  const handleRevisionClick = (id: string) => () => {
    setRedirect(`/${isBuild ? 'builds' : 'raids'}/${id}`)
  }
  if (redirect) {
    return <Redirect to={redirect} />
  }

  const mappedData = isBuild
    ? data?.buildRevision?.builds ?? []
    : data?.raidRevision?.raids ?? []

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
          {mappedData.map((item: IBuild | IRaid, index: number) => {
            const date = item.updatedAt ? new Date(item.updatedAt) : undefined
            return (
              <Timeline.Item
                key={item.id || index}
                color={id === item.id ? 'green' : 'blue'}
              >
                Revision {date && date.toLocaleString()} <br />
                {id === item.id ? (
                  <Tag color='green'>Currently Selected</Tag>
                ) : (
                  <Button
                    size='small'
                    onClick={handleRevisionClick(item.id || '')}
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
