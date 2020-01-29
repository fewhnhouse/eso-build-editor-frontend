import React, { useState } from 'react'
import styled from 'styled-components'
import { Typography, Divider, Button, Carousel } from 'antd'
import Flex from '../../components/Flex'
import { Link, Redirect } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { ayrenn, jorunn, emeric, ava, siege } from '../../assets/backgrounds'
import { ButtonProps } from 'antd/lib/button'

const { Title, Text } = Typography

const BlockText = styled(Text)`
  text-align: justify;
`

const GeneralContainer = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 0px ${props => props.theme.paddings.medium};
`

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
  background-color: white;
  max-width: ${props => props.theme.widths.medium};
  min-width: 300px;
`

const OverviewContainer = styled(Flex)`
  flex: 1;
  margin-top: 40px;
  background: 'white';
  padding: 40px ${props => props.theme.paddings.medium};
  background-color: white;
  width: 100%;
`

const StyledTitle = styled.h1`
  text-transform: uppercase;
  letter-spacing: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '2px' : '5px'};

  margin-top: ${props => props.theme.margins.small};
  font-size: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '30px' : '50px'};
`

const Content = styled.div`
  height: calc(100vh - 66px);
  overflow: auto;
  width: 100vw;
`

const BackgroundImage = styled.div`
  background: url(${(props: { backgroundSrc: string }) => props.backgroundSrc});
  height: 80vh;
  background-size: cover;
  width: 100%;
`

const StyledFlex = styled(Flex)`
  width: 100%;
`

const StyledLink = styled(Link)`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  background: ${props => props.theme.colors.grey.dark};
  padding: ${props => props.theme.paddings.small};
`

const StyledOverviewBtn = styled(Button)`
  width: 140px;
  margin: ${props => props.theme.margins.small};
`
const OverviewButton = ({ children, ...props }: ButtonProps) => (
  <StyledOverviewBtn size='large' {...props}>
    {children}
  </StyledOverviewBtn>
)

export default () => {
  const [redirect, setRedirect] = useState('')
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (redirect) {
    return <Redirect push to={redirect} />
  }

  const handleBtnClick = (path: string) => () => {
    setRedirect(path)
  }
  return (
    <Content>
      <Carousel autoplay style={{ height: '80vh', width: '100vw' }}>
        <BackgroundImage backgroundSrc={ayrenn} />
        <BackgroundImage backgroundSrc={jorunn} />
        <BackgroundImage backgroundSrc={emeric} />
        <BackgroundImage backgroundSrc={ava} />
        <BackgroundImage backgroundSrc={siege} />
      </Carousel>
      <div>
        <GeneralContainer>
          <StyledTitle isMobile={isMobile}>ESO BUILD EDITOR</StyledTitle>
          <BlockText>
            Build Editor allows you to create builds for{' '}
            <b>The Elder Scrolls: Online</b> and combine them to complete raid
            setups - to be shared with friends, guilds and communities, or saved
            privately as you choose.
          </BlockText>
        </GeneralContainer>
        <Divider />

        <Wrapper direction='row' align='flex-start' wrap justify='center'>
          <CardContainer
            direction='column'
            justify='space-between'
            align='center'
          >
            <Title level={3}>Builds</Title>
            <BlockText>
              ESO Build Editor allows you to create Builds for{' '}
              <b>The Elder Scrolls: Online</b>, offering a way to intuitively
              add Item Sets, Skills, Buff Food, Mundus Stones and more to your
              builds. EBE does this while also offering ways to edit these
              builds with advanced revisioning and forking features. You can
              also share these builds with your friends, expose them to the
              public or make sure noone but you can find out your top secret
              build.
            </BlockText>
            <Divider />

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
            <BlockText>
              ESO Build Editor allows to group your builds into raids of varying
              sizes, offering categorization to keep your data organized. You
              can create 4-man Battleground Setups, 8-man Midscale Cyrodiil
              Raids or full 12-man PvE Endgame Raid Setups - the choice is
              yours. ESO Build Editor allows you to share these raids to others
              to ensure your guild members are always up to date and know what
              to run!
            </BlockText>
            <Divider />
            <StyledLink to='/raids'>
              <StyledButton size='large' type='primary'>
                Explore Raids
              </StyledButton>
            </StyledLink>
          </CardContainer>
        </Wrapper>
        <OverviewContainer
          justify='space-between'
          direction='column'
          align='center'
        >
          <GeneralContainer>
            <Title level={3}>ESO Overview</Title>
            <BlockText>
              Build Editor offers a simple Web Interface to explore Sets,
              Skills, Mundus Stones and Consumables of{' '}
              <b>The Elder Scrolls: Online</b>. All the information you need, is
              available for you to explore and is always kept up to date by the
              ESO Build Editor creators. You can easily see when the information
              was last updated to verify that everything is up to date.
            </BlockText>
          </GeneralContainer>
          <Divider />

          <StyledFlex
            direction='row'
            wrap
            justify='space-between'
            align='center'
          >
            <OverviewButton onClick={handleBtnClick('/overview/2')}>
              Sets
            </OverviewButton>
            <OverviewButton onClick={handleBtnClick('/overview/3')}>
              Skills
            </OverviewButton>
            <OverviewButton onClick={handleBtnClick('/overview/0')}>
              Consumables
            </OverviewButton>
            <OverviewButton onClick={handleBtnClick('/overview/1')}>
              Mundus Stones
            </OverviewButton>
          </StyledFlex>
        </OverviewContainer>
      </div>
      <Footer>
        <Flex fluid align='flex-end' justify='flex-end' direction='column'>
          <Link to='/tos'>Terms of Service</Link>
          <Link to='/privacy'>Privacy Policy</Link>
        </Flex>
      </Footer>
    </Content>
  )
}
