import React, { useState } from "react"
import styled from "styled-components";
import Flex from "../../components/Flex";
import { Card, Typography, Divider } from "antd";
import { IRaidState } from "../raid/RaidStateContext";
import { Redirect } from "react-router";

const { Title, Text } = Typography;

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 20px;
`
const RaidHeader = styled(Flex)`
  flex: 1;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
`
const RaidContent = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  max-height: 600px;
`
const LeftSide = styled(Flex)`
  flex: 1;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  height: 100%;
  background-color: white;
  min-width: 300px;
`
const RightSide = styled(Flex)`
  flex: 2;
  flex-wrap: wrap;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  height: 100%;
  background-color: white;
  overflow-y: scroll;
  min-width: 300px;
`
const CardList = styled(Flex)`
  flex-wrap: wrap;
`
const StyledCard = styled(Card)`
  width: 200px;
  margin: 10px;
  `

interface IRaidReviewDetailsProps {
    loadedData: IRaidState
}

const RaidReviewDetails = ({loadedData}: IRaidReviewDetailsProps) => {

  const {
      name,
      applicationArea,
      groupSize,
      description,
      roles
  } = loadedData;
  console.log(loadedData)

  const [path, setRedirect] = useState("");
  const handleClick = ( path: string) => {
      setRedirect(path);
  }

  if (path !== "") {
    return (
        <Redirect push to={`${path}`} />
    )
  } else {
    return (
      <Wrapper direction="column">
        <RaidHeader direction="row">
          <Title level={1}>Raid review</Title>
        </RaidHeader>
        <RaidContent direction="row" align="flex-start">
          <LeftSide align="left">
            <Title level={2} style={{textAlign: "center"}}>{name}</Title>
            <Title level={3}>Group size:</Title>
            <Text>{groupSize}</Text>
            <Title level={3}>Application area:</Title>
            <Text>{applicationArea}</Text>
            <Title level={3}>Description:</Title>
            <Text>{description}</Text>
          </LeftSide>
            <RightSide direction="row" justify="center">
              <Title level={2}>Builds</Title>
              {roles.map(role => {
                return (
                <>
                  <Divider>{role.roleName}</Divider>
                  <CardList direction="row">
                    {role.builds.map(build => {
                      return (
                        <StyledCard hoverable title={build.name} onClick={() => handleClick(`/buildreview/${build.id}`)}>
                          {build.name}<br />
                          {build.role}<br />
                          {build.description}
                        </StyledCard>
                      )
                    })}
                  </CardList>
                </>
                )
              })}
            </RightSide>
        </RaidContent>
      </Wrapper>
    )
  }
}
export default RaidReviewDetails;