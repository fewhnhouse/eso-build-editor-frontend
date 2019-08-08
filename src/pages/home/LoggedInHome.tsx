import React from 'react'
import styled from 'styled-components'
import { Typography, Button, Icon, Card, List } from 'antd'
import Flex from '../../components/Flex'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import UserHomeCard from './UserHomeCard';

const { Title, Text } = Typography;

const Wrapper = styled(Flex)``

const LeftSide = styled(Flex)`
  flex: 1;
  justify-content: center;
`

const Center = styled(Flex)`
  flex: 1;
  justify-content: center;
`

const RightSide = styled(Flex)`
  flex: 1;
  background-color: lightgrey;
`

const StyledCard = styled(Card)`
    width: 400px;
    margin-left: 20px;
    margin-right: 20px;
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
            <LeftSide direction={"column"} justify={"center"} align={""}>
                <Title level={2}>My builds ({userBuilds.length})</Title>
                { data.builds ? 
                    <UserHomeCard userBuilds={data.builds} />
                : "You have no saved builds yet." }
            </LeftSide>
            <Center direction={"column"} justify={"center"} align={""}>
                <Title level={2}>My raids ({userInformation.raidSetups.length})</Title>
                    {userInformation.builds ? 
                        <List style={{maxHeight: "500px", overflowY: "scroll"}}
                            dataSource={userInformation.raidSetups}
                            renderItem={item => (
                                <List.Item style={{justifyContent: "center"}}>
                                    <StyledCard key={item.raidID} title={item.setupName} hoverable>
                                        {item.description}
                                    </StyledCard>
                                </List.Item>
                            )}>
                        </List>
                    : "You have no saved raids yet." }
            </Center>
            <RightSide direction={"column"} justify={""} align={""}>
                <Title level={2}>Discovery</Title>
                <Title level={2}>Activity</Title>
            </RightSide>
        </Wrapper>
    )
}