import React, { useContext, useState } from 'react'
import { List, Card, Input, Spin } from 'antd'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import Meta from 'antd/lib/card/Meta'
import { useTrail, animated } from 'react-spring'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'
import { Redirect } from 'react-router'
import { ITheme } from '../../../components/theme'

const ListContainer = styled.div`
  flex: 1;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean; theme: ITheme }) =>
    props.active ? 'rgb(21, 136, 246)' : props.theme.mainBorderColor};
  background: ${(props: { active: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  margin: ${props => props.theme.margins.small};
`

const Icon = styled.img`
  width: ${props => props.theme.icon.width};
  height: ${props => props.theme.icon.height};
  border-radius: ${props => props.theme.icon.borderRadius};
`

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.margins.mini};
`

const StyledFlex = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px;
  padding: ${props => props.theme.paddings.mini};
  transition: opacity 0.2s ease-in-out;
`

const StyledInnerFlex = styled(Flex)`
  width: 100%;
`

const StyledInput = styled(Input)`
  margin: ${props => props.theme.margins.small};
  width: 100%;
`

const StyledList = styled(List)`
  height: 100%;
  transition: opacity 0.2s ease-in-out;
`

interface IMundusData {
  id?: string
  name: string
  effect: string
  value: string
  icon: string
}

const GET_MUNDUS_STONES = gql`
  query {
    mundusStones {
      id
      name
      effect
      value
      icon
      aldmeri
      daggerfall
      ebonheart
    }
  }
`
export default ({ context }: { context: React.Context<any> }) => {
  const { data, loading, error } = useQuery<
    { mundusStones: IMundusData[] },
    {}
  >(GET_MUNDUS_STONES)

  if (loading) {
    return (
      <ListContainer>
        <StyledSpin />
      </ListContainer>
    )
  }
  if (error) {
    return <div>Error.</div>
  }
  if (data) {
    return <MundusList context={context} data={data} />
  }
  return null
}

const MundusList = ({
  data,
  context,
}: {
  data: { mundusStones: IMundusData[] }
  context: React.Context<any>
}) => {
  const [state, dispatch] = useContext(context)
  const { mundusStone } = state!

  const [searchText, setSearchText] = useState('')
  const [redirect, setRedirect] = useState('')
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const handleClick = (mundusStone: IMundusData) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isMobile) {
      setRedirect(mundusStone.id || '')
    } else {
      dispatch!({ type: 'SET_MUNDUS', payload: { mundusStone } })
    }
  }
  const filteredMundusStones = data.mundusStones.filter(mundus =>
    mundus.name.toLowerCase().includes(searchText.toLowerCase())
  )
  const trail = useTrail(filteredMundusStones.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 2000, friction: 200 },
  })
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <ListContainer>
      {redirect && <Redirect to={`/overview/mundus/${redirect}`} push />}
      <>
        <StyledFlex direction='column' justify='center' align='center'>
          <StyledInnerFlex direction='row' justify='center' align='flex-start'>
            <StyledInput
              placeholder='Search for Mundus Stones'
              allowClear
              value={searchText}
              onChange={handleSearchChange}
              size='large'
              type='text'
            />
          </StyledInnerFlex>
        </StyledFlex>
        <Scrollbars autoHide>
          <StyledList
            dataSource={trail}
            renderItem={(style: any, index) => {
              const item = filteredMundusStones[index]
              console.log(item)
              return (
                <animated.div style={style}>
                  <StyledCard
                    active={item.name === (mundusStone && mundusStone.name)}
                    hoverable
                    onClick={handleClick(item)}
                  >
                    <Meta
                      avatar={
                        <Icon
                          src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${item.icon}`}
                        />
                      }
                      title={item.name}
                      description={
                        <span>{item.effect + ' by ' + item.value}</span>
                      }
                    />
                  </StyledCard>
                </animated.div>
              )
            }}
          />
        </Scrollbars>
      </>
    </ListContainer>
  )
}
