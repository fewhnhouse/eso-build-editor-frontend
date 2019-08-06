import React, { useContext, useState } from 'react';
import { List, Tag, Divider, Card, Input } from 'antd';
import styled from 'styled-components';
import { ISpecialBuff } from '../../../assets/specialbuff/drinks';
import { useTrail, animated } from 'react-spring';
import { RaidContext } from '../RaidStateContext';
import Flex from '../../../components/Flex';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SkillView from '../../../components/SkillView';
import {
  ABILITY_BAR_TWO,
  ABILITY_BAR_ONE,
} from '../../build/Skills/AbilityBar';
import { DisplaySlot } from '../../../components/SkillSlot';

const { CheckableTag } = Tag;

const ListContainer = styled.div`
  flex: 1;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`;

const AvatarContainer = styled.div`
  padding-right: 16px;
`;

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean }) =>
    props.active ? 'rgb(21, 136, 246)' : 'rgb(232, 232, 232)'};
  background: ${(props: { active: boolean }) =>
    props.active ? 'rgba(0,0,0,0.05)' : 'white'};
  border-width: 2px;
  margin: 10px;
`;

const StyledTag = styled(Tag)`
  min-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0.45);
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const AbilityBar = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const GET_BUILDS = gql`
  fragment SetSelection on SetSelection {
    icon
    slot
    selectedSet {
      name
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
export default () => {
  const [, dispatch] = useContext(RaidContext);
  const { loading, error, data } = useQuery(GET_BUILDS);
  console.log(loading, error, data);

  const handleClick = (buff: ISpecialBuff) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch!({ type: 'SET_BUFF', payload: { buff } });
  };
  const [searchText, setSearchText] = useState('');
  const filteredBuilds =
    data && data.builds
      ? data.builds.filter((build: any) =>
          build.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];
  const trail = useTrail(filteredBuilds.length, {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(0px, -40px)',
    },
    config: { mass: 1, tension: 2000, friction: 300 },
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <ListContainer>
      <>
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px 0px',
            padding: '5px',
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          <Flex
            direction="row"
            justify="center"
            align="flex-start"
            style={{ width: '100%' }}
          >
            <Input
              placeholder="Search for Builds"
              allowClear
              value={searchText}
              onChange={handleSearchChange}
              size="large"
              type="text"
              style={{ margin: '10px', width: '100%' }}
            />
          </Flex>
          <Flex
            direction="row"
            justify="center"
            align="center"
            style={{ margin: '0px 10px' }}
          >
            <CheckableTag checked={true}>Dragonknight</CheckableTag>
            <CheckableTag checked={true}>Warden</CheckableTag>
            <CheckableTag checked={true}>Necromancer</CheckableTag>
            <CheckableTag checked={true}>Templar</CheckableTag>
            <CheckableTag checked={true}>Sorcerer</CheckableTag>
            <CheckableTag checked={true}>Nightblade</CheckableTag>
          </Flex>
          <Divider
            style={{
              margin: '10px 0px',
            }}
          />
          <Flex
            direction="row"
            justify="center"
            align="center"
            style={{ margin: '0px 10px' }}
          >
            <CheckableTag checked={true}>Damage Dealer</CheckableTag>
            <CheckableTag checked={true}>Healer</CheckableTag>
            <CheckableTag checked={true}>Tank</CheckableTag>
            <CheckableTag checked={true}>Support</CheckableTag>
          </Flex>
        </Flex>

        <List
          loading={loading}
          style={{
            height: '100%',
            overflow: 'auto',
          }}
          dataSource={trail}
          renderItem={(style: any, index) => {
            const item = filteredBuilds[index];
            return (
              <animated.div style={style}>
                <StyledCard
                  hoverable
                  active={item.name === 'asd'}
                  onClick={handleClick(item)}
                >
                  <div style={{ display: 'flex', maxWidth: 400 }}>
                    <AvatarContainer>
                      <MyAvatar title={item.name} src={item.icon} />
                    </AvatarContainer>
                    <div>
                      <Title>{item.name}</Title>

                      <Divider style={{ margin: '5px 0px' }} />
                      <AbilityBar>
                        <SkillView
                          id={ABILITY_BAR_ONE}
                          disabled
                          skillSlots={item.newBarOne}
                        />
                        <DisplaySlot
                          style={{ marginLeft: 10 }}
                          skill={item.ultimateOne || undefined}
                        />
                      </AbilityBar>
                      <AbilityBar>
                        <SkillView
                          id={ABILITY_BAR_TWO}
                          disabled
                          skillSlots={item.newBarTwo}
                        />
                        <DisplaySlot
                          style={{ marginLeft: 10 }}
                          skill={item.ultimateTwo || undefined}
                        />
                      </AbilityBar>

                      <div
                        style={{
                          width: 140,
                          display: 'flex',
                          margin: '10px 0px',
                        }}
                      >
                        {/*tags*/}
                      </div>
                      <Description>{item.esoClass}</Description>
                      <Description>{item.race}</Description>
                    </div>
                  </div>
                </StyledCard>
              </animated.div>
            );
          }}
        />
      </>
    </ListContainer>
  );
};

interface IAttributeTagProps {
  hasMagicka: boolean;
  hasStamina: boolean;
  hasHealth: boolean;
}

const AttributeTag = ({
  hasMagicka,
  hasStamina,
  hasHealth,
}: IAttributeTagProps) => {
  if (hasMagicka && hasStamina && hasHealth) {
    return <StyledTag color="purple">All</StyledTag>;
  } else if (hasHealth) {
    return <StyledTag color="red">Health</StyledTag>;
  } else if (hasStamina) {
    return <StyledTag color="green">Stamina</StyledTag>;
  } else {
    return <StyledTag color="blue">Magicka</StyledTag>;
  }
};

interface IBuffTagProps {
  isFood: boolean;
  isDrink: boolean;
  isSpecialFood: boolean;
  isSpecialDrink: boolean;
}
const BuffTypeTag = ({
  isFood,
  isDrink,
  isSpecialFood,
  isSpecialDrink,
}: IBuffTagProps) => {
  if (isFood) {
    return <StyledTag color="purple">Food</StyledTag>;
  } else if (isDrink) {
    return <StyledTag color="red">Drink</StyledTag>;
  } else if (isSpecialFood) {
    return <StyledTag color="green">Special Food</StyledTag>;
  } else {
    return <StyledTag color="blue">Special Drink</StyledTag>;
  }
};

const QualityTag = ({ quality }: { quality: number }) => {
  if (quality === 1) {
    return <StyledTag color="green">Standard</StyledTag>;
  } else if (quality === 2) {
    return <StyledTag color="blue">Difficult</StyledTag>;
  } else if (quality === 3) {
    return <StyledTag color="purple">Complex</StyledTag>;
  } else {
    return <StyledTag color="yellow">Legendary</StyledTag>;
  }
};
