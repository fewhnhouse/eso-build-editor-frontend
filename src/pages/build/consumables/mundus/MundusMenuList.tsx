import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'
import { Redirect } from 'react-router'
import { ITheme } from '../../../../components/theme'
import { List, Card, Input } from 'antd'
import Flex from '../../../../components/Flex'
import { useTrail, animated } from 'react-spring'
import { ListContainer, IMundusData } from './MundusMenu'

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

const MundusMenuList = ({
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
              return (
                <animated.div style={style}>
                  <StyledCard
                    active={item.name === (mundusStone && mundusStone.name)}
                    hoverable
                    onClick={handleClick(item)}
                  >
                    <List.Item.Meta
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

export default MundusMenuList
