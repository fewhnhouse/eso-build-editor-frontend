import React from 'react'
import styled from 'styled-components'
import { Typography, Collapse, Button, Icon, Card, List } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

`

const GET_BUILDS = gql`
  fragment SetSelection on SetSelection {
    icon
    slot
    type
    selectedSet {
      name
      location
      type
      bonus_item_1
      bonus_item_2
      bonus_item_3
      bonus_item_4
      bonus_item_5
      has_jewels
      has_weapons
      has_heavy_armor
      has_light_armor
      has_medium_armor
    }
    trait {
      type
      description
      icon
    }
    glyph {
      type
      description
      icon
    }
  }

  fragment Skill on Skill {
    name
    skillId
    icon
    range
    type
    cost
    effect_1
    effect_2
    target
  }

  fragment SkillSelection on SkillSelection {
    index
    skill {
      ...Skill
    }
  }
  query builds(
    $where: BuildWhereInput
    $orderBy: BuildOrderByInput
    $first: Int
    $last: Int
    $skip: Int
    $after: String
    $before: String
  ) {
    builds(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      skip: $skip
      after: $after
      before: $before
    ) {
      id
      name
      race
      esoClass
      frontbarSelection {
        ...SetSelection
      }
      backbarSelection {
        ...SetSelection
      }
      newBarOne {
        ...SkillSelection
      }
      newBarTwo {
        ...SkillSelection
      }
      ultimateOne {
        ...Skill
      }
      ultimateTwo {
        ...Skill
      }
      bigPieceSelection {
        ...SetSelection
      }
      smallPieceSelection {
        ...SetSelection
      }
      jewelrySelection {
        ...SetSelection
      }
    }
  }
`;

const userInformation = {
        user: "UserName",
        raidSetups: [
            {
                raidID: 1,
                setupName: "25man IC raid",
                description: "Multipurpose smallscale setup"
            },
            {
                raidID: 2,
                setupName: "Magplar duo",
                description: "Most useless PvP group"
            }
        ],
        builds: [
            {
                buildID: 1,
                buildName: "Wrobel's Revenge",
                description: "Guaranteed hatewhispers 24/7"
            }
        ]
    }

export default () => {

    const { loading, error, data } = useQuery(GET_BUILDS);
    const userBuilds = data && data.builds ? data.builds : "";

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
                        { data.builds ? 
                            <List
                                grid={{ gutter: 16, column: 2 }}
                                dataSource={userBuilds}
                                renderItem={ (item, index) => {
                                    const find = userBuilds[index];
                                    return (
                                        <List.Item style={{width: "250px"}}>
                                            <StyledCard key={find.id} title={find.name} hoverable>
                                                {find.race} {find.esoClass}
                                            </StyledCard>
                                        </List.Item>
                                    );
                                }}>
                            </List>
                            : "You have no saved builds yet." }
                    </Panel>
                    <Panel header="My raids" key="2">
                        {userInformation.builds ? 
                            <List
                                grid={{ gutter: 16, column: 2 }}
                                dataSource={userInformation.raidSetups}
                                renderItem={item => (
                                    <List.Item style={{width: "250px"}}>
                                        <StyledCard key={item.raidID} title={item.setupName} hoverable>
                                            {item.description}
                                        </StyledCard>
                                    </List.Item>
                                )}>
                            </List>
                        : "You have no saved raids yet." }
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