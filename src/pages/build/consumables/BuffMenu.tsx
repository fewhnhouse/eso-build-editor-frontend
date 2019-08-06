import React, { useContext, useState } from "react";
import { List, Tag, Divider, Card, Input } from "antd";
import styled from "styled-components";
import { BuildContext } from "../BuildStateContext";
import Flex from "../../../components/Flex";
import {
  specialDrinks,
  ISpecialBuff
} from "../../../assets/specialbuff/drinks";
import { specialFood } from "../../../assets/specialbuff/food";
import { drinks } from "../../../assets/drinks";
import { food } from "../../../assets/food";
import { useTrail, animated } from "react-spring";

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
    props.active ? "rgb(21, 136, 246)" : "rgb(232, 232, 232)"};
  background: ${(props: { active: boolean }) =>
    props.active ? "rgba(0,0,0,0.05)" : "white"};
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
    props.newEffect ? "#2ecc71" : "rgba(0, 0, 0, 0.45)"};
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
const getDrinkBuffDescription = (
  healthRec: number,
  magickaRec: number,
  staminaRec: number
) => {
  if (healthRec > 0 && magickaRec > 0 && staminaRec > 0) {
    return `Increase Health Recovery by ${healthRec}, Magicka Recovery by ${magickaRec} and Stamina Recovery by ${staminaRec}.`;
  } else if (healthRec > 0 && magickaRec > 0) {
    return `Increase Health Recovery by ${healthRec} and Magicka Recovery by ${magickaRec}.`;
  } else if (healthRec > 0 && staminaRec > 0) {
    return `Increase Health Recovery by ${healthRec} and Stamina Recovery by ${staminaRec}.`;
  } else if (healthRec > 0) {
    return `Increase Health Recovery by ${healthRec}.`;
  } else if (magickaRec > 0 && staminaRec > 0) {
    return `Increase Magicka Recovery by ${magickaRec} and Stamina Recovery by ${staminaRec}.`;
  } else if (magickaRec > 0) {
    return `Increase Magicka Recovery by ${magickaRec}.`;
  } else {
    return `Increase Stamina Recovery by ${staminaRec}.`;
  }
};

const getFoodBuffDescription = (
  maxHealth: number,
  maxMagicka: number,
  maxStamina: number
) => {
  if (maxHealth > 0 && maxMagicka > 0 && maxStamina > 0) {
    return `Increase Health Recovery by ${maxHealth}, Magicka Recovery by ${maxMagicka} and Stamina Recovery by ${maxStamina}.`;
  } else if (maxHealth > 0 && maxMagicka > 0) {
    return `Increase Health Recovery by ${maxHealth} and Magicka Recovery by ${maxMagicka}.`;
  } else if (maxHealth > 0 && maxStamina > 0) {
    return `Increase Health Recovery by ${maxHealth} and Stamina Recovery by ${maxStamina}.`;
  } else if (maxHealth > 0) {
    return `Increase Health Recovery by ${maxHealth}.`;
  } else if (maxMagicka > 0 && maxStamina > 0) {
    return `Increase Magicka Recovery by ${maxMagicka} and Stamina Recovery by ${maxStamina}.`;
  } else if (maxMagicka > 0) {
    return `Increase Magicka Recovery by ${maxMagicka}.`;
  } else {
    return `Increase Stamina Recovery by ${maxStamina}.`;
  }
};
export default () => {
  const specialBuffs: ISpecialBuff[] = [...specialDrinks, ...specialFood];
  const convertedDrinks: ISpecialBuff[] = drinks.map(drink => ({
    name: drink.name,
    buffDescription: getDrinkBuffDescription(
      drink.healthRec,
      drink.magickaRec,
      drink.staminaRec
    ),
    description: "",
    icon: drink.icon,
    duration: drink.duration,
    notes: "",
    quality: drink.quality,
    type: drink.type
  }));
  const convertedFood: ISpecialBuff[] = food.map(food => ({
    name: food.name,
    buffDescription: getFoodBuffDescription(
      food.maxHealth,
      food.maxMagicka,
      food.maxStamina
    ),
    description: "",
    icon: food.icon,
    duration: food.duration,
    notes: "",
    quality: food.quality,
    type: food.type
  }));
  const allBuffs = [...specialBuffs, ...convertedFood, ...convertedDrinks];

  const [state, dispatch] = useContext(BuildContext);
  const { buff } = state!;
  const handleClick = (buff: ISpecialBuff) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch!({ type: "SET_BUFF", payload: { buff } });
  };
  const [searchText, setSearchText] = useState("");
  const filteredBuffs = allBuffs.filter(buff =>
    buff.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const trail = useTrail(filteredBuffs.length, {
    opacity: 1,
    transform: "translate(0px, 0px)",
    from: {
      opacity: 0,
      transform: "translate(0px, -40px)"
    },
    config: { mass: 1, tension: 2000, friction: 300 }
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
              placeholder="Search for Food"
              allowClear
              value={searchText}
              onChange={handleSearchChange}
              size="large"
              type="text"
              style={{ margin: "10px", width: "100%" }}
            />
          </Flex>
          <Flex
            direction="row"
            justify="center"
            align="center"
            style={{ margin: "0px 10px" }}
          >
            <CheckableTag checked={true}>Health Recovery</CheckableTag>
            <CheckableTag checked={true}>Magicka Recovery</CheckableTag>
            <CheckableTag checked={true}>Stamina Recovery</CheckableTag>
            <CheckableTag checked={true}>Max Health</CheckableTag>
            <CheckableTag checked={true}>Max Magicka</CheckableTag>
            <CheckableTag checked={true}>Max Stamina</CheckableTag>
          </Flex>
          <Divider
            style={{
              margin: "10px 0px"
            }}
          />
          <Flex
            direction="row"
            justify="center"
            align="center"
            style={{ margin: "0px 10px" }}
          >
            <CheckableTag checked={true}>Standard</CheckableTag>
            <CheckableTag checked={true}>Difficult</CheckableTag>
            <CheckableTag checked={true}>Complex</CheckableTag>
            <CheckableTag checked={true}>Legendary</CheckableTag>
          </Flex>
        </Flex>

        <List
          style={{
            height: "100%",
            overflow: "auto"
          }}
          dataSource={trail}
          renderItem={(style: any, index) => {
            const item = filteredBuffs[index];
            return (
              <animated.div style={style}>
                <StyledCard
                  hoverable
                  active={item.name === (buff && buff.name)}
                  onClick={handleClick(item)}
                >
                  <div style={{ display: "flex", maxWidth: 400 }}>
                    <AvatarContainer>
                      <MyAvatar title={item.name} src={item.icon} />
                    </AvatarContainer>
                    <div>
                      <Title>{item.name}</Title>

                      <Divider style={{ margin: "5px 0px" }} />
                      <div
                        style={{
                          width: 140,
                          display: "flex",
                          margin: "10px 0px"
                        }}
                      >
                        <AttributeTag
                          hasHealth={item.buffDescription.includes("Health")}
                          hasMagicka={item.buffDescription.includes("Magicka")}
                          hasStamina={item.buffDescription.includes("Stamina")}
                        />
                        <BuffTypeTag
                          isSpecialDrink={
                            specialDrinks.find(
                              drink =>
                                drink.buffDescription === item.buffDescription
                            ) !== undefined
                          }
                          isSpecialFood={
                            specialFood.find(
                              food =>
                                food.buffDescription === item.buffDescription
                            ) !== undefined
                          }
                          isFood={
                            food.find(food => food.icon === item.icon) !==
                            undefined
                          }
                          isDrink={
                            drinks.find(drink => drink.icon === item.icon) !==
                            undefined
                          }
                        />
                        <QualityTag quality={item.quality} />
                      </div>
                      <Description>{item.buffDescription}</Description>
                      {item.description && (
                        <>
                          <Divider style={{ margin: "5px 0px" }} />
                          <Description
                            style={{ fontStyle: "italic" }}
                            newEffect
                          >
                            {item.description}
                          </Description>
                        </>
                      )}
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
