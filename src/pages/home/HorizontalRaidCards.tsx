import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Card, Spin, Divider } from 'antd'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { EditOutlined, SelectOutlined } from '@ant-design/icons'
import { IRaidRevision } from '../raid/RaidStateContext'
import { Wrapper, Container, StyledCard, Description } from './StyledComponents'
import Header from './Header'

export const RAID_REVISIONS = gql`
  query raidRevisions(
    $where: RaidRevisionWhereInput
    $orderBy: RaidRevisionOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    raidRevisions(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      raids(first: 1, orderBy: updatedAt_DESC) {
        id
        owner {
          id
          name
        }
        name
        description
        applicationArea
        roles {
          id
          builds {
            id
          }
        }
      }
    }
  }
`

const HorizontalRaidCards = () => {
  const { data, loading } = useQuery<{ raidRevisions: IRaidRevision[] }>(
    RAID_REVISIONS
  )

  const [redirect, setRedirect] = useState('')
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }

  return (
    <Wrapper
      isMobile={isMobile}
      align='center'
      direction='column'
      justify={isMobile ? 'flex-start' : 'center'}
    >
      {loading && <Spin />}
      {!isMobile && (
        <Header createPath='/raidEditor/0' allPath='/raids' title='Raids' />
      )}
      <Container direction={isMobile ? 'column' : 'row'}>
        {data?.raidRevisions
          .filter((revision: IRaidRevision) => revision.raids.length)
          .map((revision: IRaidRevision) => revision.raids[0])
          .map((item) => {
            return (
              <StyledCard
                isMobile={isMobile}
                actions={[
                  <EditOutlined
                    title='Edit'
                    key='raid-edit'
                    onClick={handleClick(`/editRaid/${item?.id ?? ''}/0`)}
                  />,
                  <SelectOutlined
                    title='Open'
                    key='raid-open'
                    onClick={handleClick(`/raids/${item?.id ?? ''}`)}
                  />,
                ]}
                key={item.id}
              >
                <Card.Meta
                  title={item.name}
                  description={<Description>{item.description}</Description>}
                ></Card.Meta>
              </StyledCard>
            )
          })}
      </Container>
      {!isMobile && <Divider />}
    </Wrapper>
  )
}

export default HorizontalRaidCards
