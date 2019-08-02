import React, { useContext, useEffect, useState } from "react";
import { List, Tag, AutoComplete, Divider, Button, Card, Input } from "antd";
import styled from "styled-components";
import { ISet } from "../../../components/GearSlot";
import { BuildContext } from "../BuildStateContext";
import Flex from "../../../components/Flex";
import {
  specialDrinks,
  ISpecialBuff
} from "../../../assets/specialbuff/drinks";
import { specialFood } from "../../../assets/specialbuff/food";
import { drinks, IDrink } from "../../../assets/drinks";
import { food, IFood } from "../../../assets/food";
import { mundusStones, IMundus } from "../../../assets/mundus";
import Meta from "antd/lib/card/Meta";
import { useTrail, animated } from "react-spring";

const { Item } = List;
const { CheckableTag } = Tag;

const ListContainer = styled.div`
  flex: 1;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease-in-out;
`;

const StyledListItem = styled(Item)`
  cursor: pointer;
  display: flex;
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 5px;
  border-radius: 4px;
  padding: 10px 5px;
  &:hover > div {
    font-weight: 500;
  }
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
`;

const StyledCard = styled(Card)`
  border-color: ${(props: { active: boolean }) =>
    props.active ? "rgb(21, 136, 246)" : "rgb(232, 232, 232)"};
  background: ${(props: { active: boolean }) =>
    props.active ? "rgba(0,0,0,0.05)" : "white"};
  border-width: 2px;
  margin: 10px;
`;

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
`;
export default () => {
  const [state, dispatch] = useContext(BuildContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const { mundus } = state!;
  const handleClick = (mundus: IMundus) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch!({ type: "SET_MUNDUS", payload: { mundus } });
  };
  const [searchText, setSearchText] = useState("");
  const filteredMundusStones = mundusStones.filter(mundus =>
    mundus.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const trail = useTrail(filteredMundusStones.length, {
    opacity: 1,
    transform: "translate(0px, 0px)",
    from: {
      opacity: 0,
      transform: "translate(0px, -40px)"
    },
    config: { mass: 1, tension: 2000, friction: 200 }

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
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 6px 0px",
            padding: "5px",
            transition: "opacity 0.2s ease-in-out"
          }}
        >
          <Flex
            direction="row"
            justify="center"
            align="flex-start"
            style={{ width: "100%" }}
          >
            <Input
              placeholder="Search for Sets"
              allowClear
              value={searchText}
              onChange={handleSearchChange}
              size="large"
              type="text"
              style={{ margin: "10px", width: "100%" }}
            />
          </Flex>
        </Flex>

        <List
          style={{
            height: "100%",
            overflow: "auto",
            transition: "opacity 0.2s ease-in-out"
          }}
          dataSource={trail}
          renderItem={(style: any, index) => {
            const item = filteredMundusStones[index];
            return (
              <animated.div style={style}>
                <StyledCard
                  active={item.id === (mundus && mundus.id)}
                  hoverable
                  onClick={handleClick(item)}
                >
                  <Meta
                    avatar={<MyAvatar src={item.icon} />}
                    title={item.name}
                    description={item.effect + " by " + item.value}
                  />
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
  hasHealth
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
  isSpecialDrink
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
