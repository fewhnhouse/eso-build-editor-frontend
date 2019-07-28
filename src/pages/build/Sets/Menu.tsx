import React from "react";
import { List, Tag, AutoComplete, Divider } from "antd";
import styled from "styled-components";
import sets from "../../../sets.json";
import { ISet } from "../../../components/GearSlot.jsx";

const { Item } = List;
const { CheckableTag } = Tag;

const ListContainer = styled.div`
  width: 500px;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledListItem = styled(Item)`
  display: flex;
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTag = styled(Tag)`
  min-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ({
  handleClick
}: {
  handleClick: (
    set: ISet
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <ListContainer>
      <AutoComplete
        size="large"
        style={{ margin: "10px" }}
        placeholder="input here"
        optionLabelProp="value"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CheckableTag checked={true}>Arena</CheckableTag>
        <CheckableTag checked={true}>Monster</CheckableTag>
        <CheckableTag checked={true}>PvP</CheckableTag>
        <CheckableTag checked={true}>Overland</CheckableTag>
        <CheckableTag checked={true}>Trial</CheckableTag>
        <CheckableTag checked={true}>Dungeon</CheckableTag>
      </div>
      <Divider style={{ margin: "10px 0px" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CheckableTag checked={true}>Light</CheckableTag>
        <CheckableTag checked={true}>Medium</CheckableTag>
        <CheckableTag checked={true}>Heavy</CheckableTag>
        <CheckableTag checked={true}>Crafted</CheckableTag>
      </div>
      <Divider style={{ margin: "5px 0px" }} />

      <List
        style={{ height: "100%", overflow: "auto" }}
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
            <div style={{ textAlign: "left", flex: 2 }}>{item.name}</div>
          </StyledListItem>
        )}
      />
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
