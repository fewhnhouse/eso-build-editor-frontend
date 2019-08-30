import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Button, Icon } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const Wrapper = styled(Flex)`
  display: flex;
  padding-top: 20px;
  flex-wrap: wrap;
`

const CardContainer = styled(Flex)`
  flex: 1;
  border-color: rgb(232, 232, 232);
  background: 'white';
  border-width: 2px;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  height: 300px;
  background-color: white;
  max-width: 400px;
`

const OverviewContainer = styled(Flex)`
  flex: 1;
  border-color: rgb(232, 232, 232);
  margin: auto;
  background: 'white';
  border-width: 2px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  max-width: 1200px;
`

const OverviewTab = styled(Flex)`
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  min-height: 100px;
  margin: 0px 10px;
`
const StyledTitle = styled.h1`
  margin-top: 20px;
  font-size: 50px;
`

const Content = styled.div`
  padding: 40px;
  overflow: auto;
  width: 100%;
`

export default () => {
  return (
    <>
      <Content>
        <StyledTitle>Welcome to FIST Build Editor</StyledTitle>
        <Text style={{ maxWidth: '400px' }}>
          Build Editor allows you to create and save builds and combine them to
          <br />
          complete raid setups - to be shared with friends, guilds and
          communities,
          <br /> or saved privately as you choose.
        </Text>
        <Divider />

        <Wrapper direction={'row'} align={'flex-start'}>
          <CardContainer direction={'column'} justify={'space-between'}>
            <Title level={3}>Builds</Title>
            <Text>Create, share, save and edit builds</Text>
            <Link style={{ width: '100%' }} to='/builds'>
              <Button style={{ width: '100%' }} size='large' type='primary'>
                Explore Builds
              </Button>
            </Link>
          </CardContainer>
          <CardContainer direction={'column'} justify={'space-between'}>
            <Title level={3}>Raids</Title>
            <Text>Create, share, save and edit raids</Text>
            <Link style={{ width: '100%' }} to='/raids'>
              <Button style={{ width: '100%' }} size='large' type='primary'>
                Explore Raids
              </Button>
            </Link>
          </CardContainer>
        </Wrapper>
        <Divider />
        <OverviewContainer justify='space-between' direction="column" align="center">
          <Title level={3}>Overview</Title>
          <Typography.Text>
            Build Editor offers a simple Web Interface to explore Sets, Skills,
            Mundus Stones and Consumables of The Elder Scrolls: Online.
            <br /> Just click on one of the Tabs to open detailled information
            about these topics.
          </Typography.Text>
          <Divider />

          <Flex direction='row' style={{ width: '100%', flexWrap: 'wrap' }}>
            <OverviewTab>
              <Icon style={{ margin: 20, fontSize: 30 }} type='user' />
              <Title level={4}>Sets</Title>
            </OverviewTab>
            <OverviewTab>
              <Icon style={{ margin: 20, fontSize: 30 }} type='user' />
              <Title level={4}>Skills</Title>
            </OverviewTab>
            <OverviewTab>
              <Icon style={{ margin: 20, fontSize: 30 }} type='user' />
              <Title level={4}>Consumables</Title>
            </OverviewTab>
            <OverviewTab>
              <Icon style={{ margin: 20, fontSize: 30 }} type='user' />
              <Title level={4}>Mundus Stones</Title>
            </OverviewTab>
          </Flex>
          <Divider />
          <Link to='/overview'>
            <Button size='large' type='primary' style={{ minWidth: 300 }}>
              Explore
            </Button>
          </Link>
        </OverviewContainer>
      </Content>
    </>
  )
}
