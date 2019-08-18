import React from 'react'
import styled from 'styled-components'
import { Typography, Divider, Input } from 'antd'
import Flex from '../../components/Flex'
import UserHomeCard from './UserHomeCard'
import { wcdt } from '../../assets/backgrounds/index'

const { Search } = Input
const { Title } = Typography

const OuterWrapper = styled(Flex)`
  width: 100%;
`
const Wrapper = styled(Flex)`
  padding: 40px;
  flex-wrap: wrap;
  width: 100%;
  z-index: 20;
  min-height: 100%;
  background: white;
  box-shadow: 0px -5px 5px 0px rgba(0, 0, 0, 0.35);
`

const InputContainer = styled(Flex)`
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 100px;
  min-height: 150px;
  padding: 20px;
`

const RightSide = styled(Flex)`
  height: 100%;
  z-index: 30;
  box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.35);
  flex: 1;
`

const RightWrapper = styled.div`
  height: 100%;
  box-shadow: -5px 0px 2px -2px rgba(0, 0, 0, 0.2);
  min-width: 300px;
`

const InnerContainer = styled(Flex)`
  width: 100%;
  padding-top: 50px;
  height: 100%;
  overflow: auto;
  background-image: url(${wcdt});
  background-size: cover;
`
const StyledSearch = styled(Search)`
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.35);
`

export default () => {
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
        <Wrapper direction={'row'} justify='center' align='center' wrap>
          <UserHomeCard isBuild />
          <UserHomeCard isBuild={false} />
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
