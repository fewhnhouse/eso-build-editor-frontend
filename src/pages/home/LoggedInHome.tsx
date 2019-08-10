import React, { useState } from 'react'
import styled from 'styled-components'
import { Typography, Button, Divider, Input } from 'antd'
import Flex from '../../components/Flex'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import UserHomeCard from './UserHomeCard'
import { Redirect } from 'react-router'

const { Search } = Input
const { Title } = Typography

const OuterWrapper = styled(Flex)`
  width: 100%;
`
const Wrapper = styled(Flex)`
  padding: 40px;
  flex-wrap: wrap;
`

const LeftSide = styled(Flex)`
  justify-content: center;
  flex: 1;
  min-height: 300px;
`

const Center = styled(Flex)`
  justify-content: center;
  flex: 1;
  min-height: 300px;
`
const InputContainer = styled(Flex)`
  width: 100%;
  min-height: 150px;
  padding: 20px;
  background: blue;
`

const ListCard = styled.div`
  width: 60%;
  min-width: 300px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  min-height: 300px;
`

const RightSide = styled(Flex)`
  height: 100%;
  flex: 1;
`

const RightWrapper = styled.div`
  height: 100%;
  box-shadow: -5px 0px 2px -2px rgba(0, 0, 0, 0.2);
  min-width: 300px;
`

const StyledTitle = styled(Flex)`
  background-color: #e8e8e8;
  margin-bottom: 0;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const CardTitle = styled(Title)`
  display: flex;
  margin-bottom: 0;
  width: 100%;
  justify-content: space-between;
`

const InnerContainer = styled(Flex)`
  width: 100%;
  overflow: auto;
`
const StyledSearch = styled(Search)``

const ME = gql`
  query {
    me {
      name
      builds {
        id
        name
        esoClass
        race
        applicationArea
      }
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(ME)
  const [redirect, setRedirect] = useState('')

  const handleCreateClick = (path: string) => () => {
    setRedirect(path)
  }
  if (redirect !== '') {
    return <Redirect to={redirect} push />
  }
  return (
    <OuterWrapper
      direction='row'
      justify='space-between'
      align='center'
      wrap
      fluid
    >
      <InnerContainer
        direction='column'
        justify='center'
        align='center'
        wrap
        fluid
      >
        <InputContainer direction='row' align='center' justify='center'>
          <Input placeholder='Search for raids' style={{ width: 400 }} />
        </InputContainer>
        <Wrapper direction={'row'} justify='center' align='center' wrap fluid>
          <LeftSide direction={'column'} justify={'center'} align='center'>
            <ListCard>
              <StyledTitle direction={'column'} justify='center' align='center'>
                <CardTitle level={3}>
                  MY BUILDS
                  <Button type='primary' ghost={true} onClick={handleCreateClick("/build/0")}>
                    Create
                  </Button>
                </CardTitle>
                <StyledSearch placeholder='Search for builds' />
              </StyledTitle>
              {data && data.me ? (
                <UserHomeCard userBuilds={data.me.builds} />
              ) : (
                'You have no saved builds yet.'
              )}
            </ListCard>
          </LeftSide>
          <Center direction={'column'} justify={'center'} align={''}>
            <ListCard>
              <StyledTitle direction={'column'} justify={''} align={''}>
                <CardTitle level={3}>
                  MY RAIDS
                  <Button type='primary' ghost={true} onClick={handleCreateClick("/raid/0")}>
                    Create
                  </Button>
                </CardTitle>
                <StyledSearch placeholder='Search for raids' />
              </StyledTitle>
              {data && data.me ? (
                <UserHomeCard userBuilds={data.me.builds} />
              ) : (
                'You have no saved builds yet.'
              )}
            </ListCard>
          </Center>
        </Wrapper>
      </InnerContainer>
      <RightSide direction={'column'} justify={'flex-start'} align={'flex-end'}>
        <RightWrapper>
          <div style={{ height: '30%' }}>
            <Title level={4} style={{ paddingTop: '20px' }}>
              DISCOVERY
            </Title>
          </div>
          <Divider />
          <div>
            <Title level={4}>ACTIVITY</Title>
          </div>
        </RightWrapper>
      </RightSide>
    </OuterWrapper>
  )
}
