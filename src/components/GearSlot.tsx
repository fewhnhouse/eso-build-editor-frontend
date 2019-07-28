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
import { Droppable, Draggable } from "react-beautiful-dnd";
import { diamond } from "../assets/traits";

export interface IGearSlotProps {
  slot: IGearSlot;
  index: number;
  droppable?: boolean;
  id: string;
}

export interface IGearSlot {
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
  width: 64px;
  height: 64px;
`;

const GearFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
  background-image: url(${(props: { backgroundSource: string }) =>
    props.backgroundSource});
  background-repeat: no-repeat;
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

export default ({ slot, index, droppable, id }: IGearSlotProps) => {
  //const {slot, title, content} = props;
  return (
    <div style={{ margin: "5px 10px 5px 10px" }}>
      <Droppable
        isDropDisabled={!droppable}
        droppableId={`${id}-${slot}-droppable-${index}`}
      >
        {(provided, snapshot) => (
          <GearFrame
            ref={provided.innerRef}
            {...provided.droppableProps}
            backgroundSource={getImageSource(slot.slot)}
          >
            {provided.placeholder}
            <Draggable
              isDragDisabled={false}
              draggableId={`${id}-${slot}-draggable-${index}`}
              index={index}
            >
              {(provided, snapshot) =>
                slot !== undefined ? (
                  <Popover
                    placement={"top"}
                    title={slot.title}
                    content={slot.content}
                  >
                    <GearImg
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      src={diamond}
                    />
                  </Popover>
                ) : (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )
              }
            </Draggable>
          </GearFrame>
        )}
      </Droppable>
    </div>
  );
};
