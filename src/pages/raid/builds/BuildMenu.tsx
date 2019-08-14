import React, { useContext, useState } from 'react';
import { List, Tag, Divider, Card, Input } from 'antd';
import styled from 'styled-components';
import { useTrail, animated } from 'react-spring';
import { RaidContext } from '../RaidStateContext';
import Flex from '../../../components/Flex';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import BuildCard from './BuildCard';

const { CheckableTag } = Tag;

const ListContainer = styled.div`
  width: 500px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`;

const StyledTag = styled(Tag)`
  min-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
export default () => {
  const [, dispatch] = useContext(RaidContext);
  const { loading, error, data } = useQuery(GET_BUILDS);

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
            style={{ margin: '0px 10px', overflow: 'auto' }}
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
                <BuildCard item={item} />
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
