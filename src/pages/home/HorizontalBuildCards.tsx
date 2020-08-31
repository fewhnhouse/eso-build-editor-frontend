import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import gql from 'graphql-tag'
import { Card, Spin, Typography, Divider, Button, Avatar } from 'antd'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../../components/theme'
import { EditOutlined, SelectOutlined } from '@ant-design/icons'
import { IBuildRevision } from '../build/BuildStateContext'

const { Title } = Typography

const Wrapper = styled(Flex)`
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

const StyledCard = styled(Card)`
    min-width: 300px;
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
  const { data, loading } = useQuery<{ buildRevisions: IBuildRevision[] }>(BUILD_REVISIONS)

  const [redirect, setRedirect] = useState('')
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }

  const handleAddClick = () => {
    setRedirect(`/buildEditor/0`)
  }

  return (
    <Wrapper
      isMobile={isMobile}
      align='center'
      direction='column'
      justify={isMobile ? 'flex-start' : 'center'}
    >
      {loading && <Spin />}

      {!isMobile && (<>
        <HeaderContainer fluid justify="space-between">
          <Header level={3}>Builds</Header>
          <Button onClick={handleAddClick} size="large" type="primary">Create</Button>
        </HeaderContainer>
        <Divider />
      </>)}
      <GroupContainer direction={isMobile ? 'column' : 'row'}>

        {data?.buildRevisions
          .filter((revision) => revision.builds.length)
          .map((revision) => revision.builds[0])
          .map((item) => {
            console.log(item)
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
                  avatar={<Avatar
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${item.esoClass}.png`}
                  />}
                  title={item.name}
                  description={
                    <Description>{item.description}</Description>
                  }
                ></Card.Meta>
              </StyledCard>
            )
          })
        }
      </GroupContainer>
      {!isMobile && <Divider />}
    </Wrapper>
  )
}

export default HorizontalBuildCards
