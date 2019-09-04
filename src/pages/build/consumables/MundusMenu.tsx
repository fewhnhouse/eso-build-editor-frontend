import React, { useContext, useState } from "react"
import { List, Card, Input, Spin } from "antd"
import styled from "styled-components"
import Flex from "../../../components/Flex"
import Meta from "antd/lib/card/Meta"
import { useTrail, animated } from "react-spring"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import Scrollbars from "react-custom-scrollbars"
import { useMediaQuery } from "react-responsive"
import { Redirect } from "react-router"

const ListContainer = styled.div`
  flex: 1;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean }) =>
    props.active ? "rgb(21, 136, 246)" : "rgb(232, 232, 232)"};
  background: ${(props: { active: boolean }) =>
    props.active ? "rgba(0,0,0,0.05)" : "white"};
  border-width: 2px;
  margin: 10px;
`

const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
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
  const { data, error, loading } = useQuery<
    { mundusStones: IMundusData[] },
    {}
  >(GET_MUNDUS_STONES)

  if (loading) {
    return (
      <ListContainer>
        <Spin style={{ marginTop: 5 }} />
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

  const [searchText, setSearchText] = useState("")
  const [redirect, setRedirect] = useState("")
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const handleClick = (mundusStone: IMundusData) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isMobile) {
      setRedirect(mundusStone.id || "")
    } else {
      dispatch!({ type: "SET_MUNDUS", payload: { mundusStone } })
    }
  }
  const filteredMundusStones = data.mundusStones.filter(mundus =>
    mundus.name.toLowerCase().includes(searchText.toLowerCase())
  )
  const trail = useTrail(filteredMundusStones.length, {
    opacity: 1,
    transform: "translate(0px, 0px)",
    from: {
      opacity: 0,
      transform: "translate(0px, -40px)",
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
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 6px 0px",
            padding: "5px",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <Flex
            direction="row"
            justify="center"
            align="flex-start"
            style={{ width: "100%" }}
          >
            <Input
              placeholder="Search for Mundus Stones"
              allowClear
              value={searchText}
              onChange={handleSearchChange}
              size="large"
              type="text"
              style={{ margin: "10px", width: "100%" }}
            />
          </Flex>
        </Flex>
        <Scrollbars autoHide>
          <List
            style={{
              height: "100%",
              transition: "opacity 0.2s ease-in-out",
            }}
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
                        <MyAvatar
                          src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${item.icon}`}
                        />
                      }
                      title={item.name}
                      description={
                        <span>{item.effect + " by " + item.value}</span>
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
