import React, { useContext, useEffect, useState } from "react";
import { List, Tag, AutoComplete, Divider, Button } from "antd";
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

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledIconBtn = styled(Button)`
  margin: 10px;
  height: 40px;
  width: 40px;
`;

export default () => {
  const specialBuffs: ISpecialBuff[] = [...specialDrinks, ...specialFood];
  const normalBuffs: (IDrink | IFood)[] = [...drinks, ...food];
  const [state, dispatch] = useContext(BuildContext);
  const handleClick = (buff: ISpecialBuff) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};
  useEffect(() => {
    /*
    axios
      .get("/skills", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(({ data }) => {
        console.log(data);
        setSkills(data);
      });
      */
  }, [dispatch]);

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
            <AutoComplete
              size="large"
              style={{ margin: "10px", width: "100%" }}
              placeholder="input here"
              optionLabelProp="value"
            />
          </Flex>
          <Flex
            direction="row"
            justify="center"
            align="center"
            style={{ margin: "0px 10px" }}
          >
            <CheckableTag checked={true}>Arena</CheckableTag>
            <CheckableTag checked={true}>Monster</CheckableTag>
            <CheckableTag checked={true}>PvP</CheckableTag>
            <CheckableTag checked={true}>Overland</CheckableTag>
            <CheckableTag checked={true}>Trial</CheckableTag>
            <CheckableTag checked={true}>Dungeon</CheckableTag>
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
            <CheckableTag checked={true}>Light</CheckableTag>
            <CheckableTag checked={true}>Medium</CheckableTag>
            <CheckableTag checked={true}>Heavy</CheckableTag>
            <CheckableTag checked={true}>Crafted</CheckableTag>
          </Flex>
        </Flex>

        <List
          style={{
            height: "100%",
            overflow: "auto",
            transition: "opacity 0.2s ease-in-out"
          }}
          dataSource={specialBuffs}
          renderItem={item => (
            <StyledListItem onClick={handleClick(item)}>
              <div style={{ width: 140, display: "flex" }}>
                <AttributeTag
                  hasHealth={item.buffDescription.includes("Health")}
                  hasMagicka={item.buffDescription.includes("Magicka")}
                  hasStamina={item.buffDescription.includes("Stamina")}
                />
                <BuffTypeTag
                  isSpecialDrink={
                    specialDrinks.find(
                      drink => drink.buffDescription === item.buffDescription
                    ) !== undefined
                  }
                  isSpecialFood={
                    specialFood.find(
                      food => food.buffDescription === item.buffDescription
                    ) !== undefined
                  }
                  isFood={
                    food.find(food => food.icon === item.icon) !== undefined
                  }
                  isDrink={
                    drinks.find(drink => drink.icon === item.icon) !== undefined
                  }
                />
                <QualityTag quality={4} />
              </div>
              <div
                style={{
                  textAlign: "left",
                  flex: 2
                }}
              >
                {item.name}
              </div>
            </StyledListItem>
          )}
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
