import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import gql from 'graphql-tag'
import { Card, Spin, Typography, Divider, Button } from 'antd'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../../components/theme'
import { EditOutlined, SelectOutlined } from '@ant-design/icons'
import { IRaid } from '../raid/RaidStateContext'

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

export const OWN_RAIDS = gql`
  query ownRaids(
    $where: RaidWhereInput
    $orderBy: RaidOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    ownRaids(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
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
`

const HorizontalRaidCards = () => {
  const { data, loading } = useQuery<{ ownRaids: IRaid[] }>(OWN_RAIDS)

  const [redirect, setRedirect] = useState('')
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }

  const handleAddClick = () => {
    setRedirect(`/raidEditor/0`)
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
        <>
          <HeaderContainer fluid justify='space-between'>
            <Header level={3}>Raids</Header>
            <Button onClick={handleAddClick} size='large' type='primary'>
              Create
            </Button>
          </HeaderContainer>
          <Divider />
        </>
      )}
      <GroupContainer direction={isMobile ? 'column' : 'row'}>
        {data?.ownRaids.map((item) => {
          console.log(item)
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
      </GroupContainer>
      {!isMobile && <Divider />}
    </Wrapper>
  )
}

export default HorizontalRaidCards
