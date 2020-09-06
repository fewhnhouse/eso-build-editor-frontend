import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Card, Spin, Divider, Avatar } from 'antd'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { EditOutlined, SelectOutlined } from '@ant-design/icons'
import { IBuildRevision } from '../build/BuildStateContext'
import Header from './Header'
import { Wrapper, Container, StyledCard, Description } from './StyledComponents'

export const BUILD_REVISIONS = gql`
  query buildRevisions(
    $where: BuildRevisionWhereInput
    $orderBy: BuildRevisionOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    buildRevisions(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      builds(first: 1, orderBy: updatedAt_DESC) {
        id
        owner {
          id
          name
        }
        name
        esoClass
        race
        description
        applicationArea
      }
    }
  }
`

const HorizontalBuildCards = () => {
  const { data, loading } = useQuery<{ buildRevisions: IBuildRevision[] }>(
    BUILD_REVISIONS
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
        <Header createPath='/buildEditor/0' allPath='/builds' title='Builds' />
      )}
      <Container direction={isMobile ? 'column' : 'row'}>
        {data?.buildRevisions
          .filter((revision: IBuildRevision) => revision.builds.length)
          .map((revision: IBuildRevision) => revision.builds[0])
          .map((item) => {
            return (
              <StyledCard
                isMobile={isMobile}
                actions={[
                  <EditOutlined
                    title='Edit'
                    key='build-edit'
                    onClick={handleClick(`/editBuild/${item?.id ?? ''}/0`)}
                  />,
                  <SelectOutlined
                    title='Open'
                    key='build-open'
                    onClick={handleClick(`/builds/${item?.id ?? ''}`)}
                  />,
                ]}
                key={item.id}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${item.esoClass}.png`}
                    />
                  }
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

export default HorizontalBuildCards
