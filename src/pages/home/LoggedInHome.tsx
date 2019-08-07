import React from 'react'
import styled from 'styled-components'
import { Typography, Collapse, Button, Icon, Card } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom';

const { Panel } = Collapse;
const { Title, Text } = Typography;

const Wrapper = styled(Flex)``

const LeftSide = styled(Flex)`
  flex: 1;
`

const Center = styled(Flex)`
  flex: 1;
  justify-content: normal;
`

const RightSide = styled(Flex)`
  flex: 1;
`

const StyledButton = styled(Button)`
    width: 300px;
    margin-top: 10px;
`

const StyledIcon = styled(Icon)`
    float: left;
    line-height: 1.5 !important;
`

const StyledCollapse = styled(Collapse)`
    width: 100%;
`

const StyledCard = styled(Card)`
    width: 250px;
    float: left;
    align-self: center;
`

const userInformation = {
        user: "UserName",
        raidSetups: [
            {
                setupName: "25man IC raid",
                description: "Multipurpose smallscale setup"
            },
            {
                setupName: "Magplar solo",
                description: "Most useless PvP build"
            }
        ],
        builds: [
            {
                buildName: "Wrobel's Revenge",
                description: "Guaranteed hatewhispers 24/7"
            }
        ]
    }

export default () => {
    return (
        <Wrapper direction={"row"} justify={"center"} align={"flex-start"} fluid>
            <LeftSide direction={"column"} justify={""} align={""}>
                <Title level={1}>Building</Title>
                <StyledButton size="large">
                    <StyledIcon type="plus" />
                    <Link to={"/build/0"}>Create a build</Link>
                </StyledButton>
                <StyledButton size="large">
                    <StyledIcon type="plus-square" />
                    <Link to={"/build/0"}>Create a raid setup</Link>
                </StyledButton>
                <StyledButton size="large">
                    <StyledIcon type="search" />
                    <Link to={"/build/0"}>Browse builds and setups</Link>
                </StyledButton>
            </LeftSide>
            <Center direction={"column"} justify={""} align={""}>
                <Title level={1}>Hello {userInformation.user}!</Title>
                <StyledCollapse>
                    <Panel header="My builds" key="1">
                        {userInformation.builds ? 
                            userInformation.builds.map( build => {
                                return (
                                    <StyledCard title={build.buildName} hoverable>
                                        {build.description}
                                    </StyledCard>
                                )
                        }): "You have no saved builds yet." }
                    </Panel>
                    <Panel header="My raids" key="2">
                        {userInformation.raidSetups ? 
                            userInformation.raidSetups.map( raid => {
                                return (
                                    <StyledCard title={raid.setupName} hoverable>
                                        {raid.description}
                                    </StyledCard>
                                )
                        }): "You have no saved raids yet." }
                    </Panel>
                </StyledCollapse>
            </Center>
            <RightSide direction={"column"} justify={""} align={""}>
                <Title level={1}>Build Editor news</Title>
                <Title level={2}>Latest in Build Editor</Title><br /> 
            </RightSide>
        </Wrapper>
    )
}