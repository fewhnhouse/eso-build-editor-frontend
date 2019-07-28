import React from "react";
import styled from "styled-components";
import { Popover } from "antd";
import {
  head,
  chest,
  legs,
  hands,
  belt,
  feet,
  shoulders,
  mainHand,
  offHand,
  quickslot,
  ring,
  neck
} from "../assets/gear";

export interface IGearSlotProps {
  slot: string;
  title: string;
  content: string;
  tooltip:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom"
    | undefined;
}

const GearImg = styled.img`
  width: 50px;
  height: 50px;
`;

const getImageSource = (slot: string) => {
  switch (slot) {
    case "legs":
      return legs;
    case "head":
      return head;
    case "shoulders":
      return shoulders;
    case "belt":
      return belt;
    case "hands":
      return hands;
    case "feet":
      return feet;
    case "chest":
      return chest;
    case "ring":
      return ring;
    case "neck":
      return neck;
    case "mainHand":
      return mainHand;
    case "offHand":
      return offHand;
    case "quickslot":
      return quickslot;
    default:
      return "";
  }
};
//<GearSlot prop1={test}/>

const breakRow = (tooltip: string | undefined) => {
  switch (tooltip) {
    case "left":
      return false;
    case "right":
      return true;
    case "top":
      return true;
    case "bottom":
      return false;
    default:
      return false;
  }
};

export default ({ slot, title, content, tooltip }: IGearSlotProps) => {
  //const {slot, title, content} = props;
  return (
    <Popover placement={tooltip} title={title} content={content}>
      <GearImg src={getImageSource(slot)} />
      {breakRow(tooltip) ? <br /> : ""}
    </Popover>
  );
};
