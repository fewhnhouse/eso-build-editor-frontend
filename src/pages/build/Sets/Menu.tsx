import React, { useContext, useEffect, useState } from "react";
import { List, Tag, AutoComplete, Divider, Button } from "antd";
import styled from "styled-components";
import sets from "../../../sets.json";
import { ISet } from "../../../components/GearSlot";
import { BuildContext } from "../BuildStateContext";
import Flex from "../../../components/Flex";

const { Item } = List;
const { CheckableTag } = Tag;

const ListContainer = styled.div`
  width: ${(props: { collapsed: boolean }) =>
    props.collapsed ? "60px" : "450px"};
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
  const [collapsed, setCollapsed] = useState(false);
  const [state, dispatch] = useContext(BuildContext);
  useEffect(() => {
    if (state!.selectedSet) {
      setCollapsed(true);
    }
  }, [state!.selectedSet]);
  const handleIconClick = (collapse: boolean) => () => {
    setCollapsed(collapse);
  };
  const handleClick = (set: ISet) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch!({ type: "SET_ITEMSET", payload: { selectedSet: set } });
  };
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
    dispatch!({ type: "SET_SETS", payload: { sets } });
  }, [dispatch]);

  return (
    <ListContainer collapsed={collapsed}>
      {collapsed && (
        <StyledIconBtn
          type="primary"
          ghost
          style={{ marginTop: 10 }}
          onClick={handleIconClick(false)}
          icon="double-right"
        />
      )}
      <>
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 6px 0px",
            padding: "5px",
            opacity: collapsed ? 0 : 1,
            pointerEvents: collapsed ? "none" : "all",
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
            <StyledIconBtn
              type="primary"
              ghost
              style={{ marginTop: 10, marginRight: 10 }}
              onClick={handleIconClick(true)}
              icon="double-left"
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
            opacity: collapsed ? 0 : 1,
            pointerEvents: collapsed ? "none" : "all",
            transition: "opacity 0.2s ease-in-out"
          }}
          dataSource={sets}
          renderItem={item => (
            <StyledListItem onClick={handleClick(item)}>
              <div style={{ width: 140, display: "flex" }}>
                <ArmorTypeTag
                  hasHeavyArmor={item.has_heavy_armor === 1}
                  hasMediumArmor={item.has_medium_armor === 1}
                  hasLightArmor={item.has_light_armor === 1}
                  traitsNeeded={item.traits_needed !== null}
                />
                <StyledTag color="geekblue">{item.type}</StyledTag>
              </div>
              <div
                style={{
                  textAlign: "left",
                  flex: 2,
                  fontWeight:
                    state!.selectedSet && item.id === state!.selectedSet.id
                      ? 500
                      : 400
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

interface ISetTagProps {
  hasHeavyArmor: boolean;
  hasMediumArmor: boolean;
  hasLightArmor: boolean;
  traitsNeeded: boolean;
}

const ArmorTypeTag = ({
  hasHeavyArmor,
  hasMediumArmor,
  hasLightArmor,
  traitsNeeded
}: ISetTagProps) => {
  if (traitsNeeded) {
    return null;
  } else {
    if (hasHeavyArmor && hasMediumArmor && hasLightArmor) {
      return <StyledTag color="purple">All</StyledTag>;
    } else if (hasHeavyArmor) {
      return <StyledTag color="red">Heavy</StyledTag>;
    } else if (hasMediumArmor) {
      return <StyledTag color="green">Medium</StyledTag>;
    } else {
      return <StyledTag color="blue">Light</StyledTag>;
    }
  }
};
