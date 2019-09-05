import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Button, Icon } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const Wrapper = styled(Flex)`
  display: flex;
  padding-top: ${props => props.theme.paddings.medium};
  flex-wrap: wrap;
`

const CardContainer = styled(Flex)`
  flex: 1;
  border-color: ${props => props.theme.mainBorderColor};
  background: 'white';
  border-width: 2px;
  border-radius: 10px;
  padding: ${props => props.theme.paddings.medium};
  margin: ${props => props.theme.paddings.medium};
  height: 300px;
  background-color: white;
  max-width: ${props => props.theme.widths.medium};
`

const OverviewContainer = styled(Flex)`
  flex: 1;
  border-color: ${props => props.theme.mainBorderColor};
  margin: auto;
  background: 'white';
  border-width: 2px;
  border-radius: 10px;
  padding: ${props => props.theme.paddings.medium};
  background-color: white;
  max-width: 1200px;
`

const OverviewTab = styled(Flex)`
  flex: 1;
  min-width: 200px;
  max-width: ${props => props.theme.widths.small};
  min-height: 100px;
  margin: 0px ${props => props.theme.margins.small};
`
const StyledTitle = styled.h1`
  margin-top: ${props => props.theme.widths.small};
  font-size: 50px;
`

const Content = styled.div`
  padding: ${props => props.theme.paddings.large};
  overflow: auto;
  width: 100%;
`

const StyledFlex = styled(Flex)`
  width: 100%;
`

const StyledIcon = styled(Icon)`
  margin: ${props => props.theme.margins.medium};
  font-size: 30px;
`

const StyledText = styled(Text)`
  max-width: ${props => props.theme.widths.medium};
`

const StyledLink = styled(Link)`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const StyledWideButton = styled(Button)`
  min-width: 300px;
`

export default () => {
  return (
    <Content>
      <StyledTitle>Welcome to FIST Build Editor</StyledTitle>
      <StyledText>
        Build Editor allows you to create and save builds and combine them to
        <br />
        complete raid setups - to be shared with friends, guilds and
        communities,
        <br /> or saved privately as you choose.
      </StyledText>
      <Divider />

      <Wrapper direction='row' align='flex-start' justify='center'>
        <CardContainer
          direction='column'
          justify='space-between'
          align='center'
        >
          <Title level={3}>Builds</Title>
          <Text>Create, share, save and edit builds</Text>
          <StyledLink to='/builds'>
            <StyledButton size='large' type='primary'>
              Explore Builds
            </StyledButton>
          </StyledLink>
        </CardContainer>
        <CardContainer
          direction='column'
          justify='space-between'
          align='center'
        >
          <Title level={3}>Raids</Title>
          <Text>Create, share, save and edit raids</Text>
          <StyledLink to='/raids'>
            <StyledButton size='large' type='primary'>
              Explore Raids
            </StyledButton>
          </StyledLink>
        </CardContainer>
      </Wrapper>
      <Divider />
      <OverviewContainer
        justify='space-between'
        direction='column'
        align='center'
      >
        <Title level={3}>Overview</Title>
        <Typography.Text>
          Build Editor offers a simple Web Interface to explore Sets, Skills,
          Mundus Stones and Consumables of The Elder Scrolls: Online.
          <br /> Just click on one of the Tabs to open detailled information
          about these topics.
        </Typography.Text>
        <Divider />

        <StyledFlex direction='row' wrap>
          <OverviewTab>
            <StyledIcon type='user' />
            <Title level={4}>Sets</Title>
          </OverviewTab>
          <OverviewTab>
            <StyledIcon type='user' />
            <Title level={4}>Skills</Title>
          </OverviewTab>
          <OverviewTab>
            <StyledIcon type='user' />
            <Title level={4}>Consumables</Title>
          </OverviewTab>
          <OverviewTab>
            <StyledIcon type='user' />
            <Title level={4}>Mundus Stones</Title>
          </OverviewTab>
        </StyledFlex>
        <Divider />
        <Link to='/overview'>
          <StyledWideButton size='large' type='primary'>
            Explore
          </StyledWideButton>
        </Link>
      </OverviewContainer>
    </Content>
  )
}
