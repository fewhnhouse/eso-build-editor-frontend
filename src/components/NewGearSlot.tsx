import React, { useContext, useState, useEffect } from "react";
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
import { useDrag, useDrop, DragObjectWithType } from "react-dnd";
import { BuildContext } from "../pages/build/BuildStateContext";

export interface IGearSlot {
  slot: string;
  set?: ISet;
  icon?: string;
}

const GearImg = styled.img`
  width: 64px;
  height: 64px;
`;

interface IGearFrameProps {
  hasIcon: boolean;
  canDrop?: boolean;
  backgroundSource: string;
}

const GearFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid;
  border-color: ${(props: IGearFrameProps) =>
    props.canDrop ? "#27ae60" : "rgba(0, 0, 0, 0.45)"};
  border-radius: 4px;
  background-image: url(${(props: IGearFrameProps) =>
    props.hasIcon ? "" : props.backgroundSource});
  background-repeat: no-repeat;
`;

export interface ISet {
  id: number;
  name: string;
  location: string;
  type: string;
  slug: string;
  bonus_item_1: string | null;
  bonus_item_2: string | null;
  bonus_item_3: string | null;
  bonus_item_4: string | null;
  bonus_item_5: string | null;
  has_jewels: number;
  has_weapons: number;
  has_heavy_armor: number;
  has_light_armor: number;
  has_medium_armor: number;
  traits_needed: number | null;
  pts: number;
  eso_id: null | number;
  [key: string]: string | null | number;
}

const getImageSource = (slot: string) => {
  switch (slot) {
    case "legs":
      return legs;
    case "head":
      return head;
    case "shoulders":
      return shoulders;
    case "waist":
      return belt;
    case "hands":
      return hands;
    case "feet":
      return feet;
    case "chest":
      return chest;
    case "ring1":
      return ring;
    case "ring2":
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

export interface IGearSlotProps {
  slot: IGearSlot;
  droppable?: boolean;
  draggable?: boolean;
  disabled?: boolean;
  group: string;
}

export interface IDragProps {
  slot: IGearSlot;
  group: string;
}
export const DragComponent = ({ slot, group }: IDragProps) => {
  const [, dispatch] = useContext(BuildContext);

  const [{ isDragging, didDrop }, drag] = useDrag({
    item: { type: slot.slot, set: slot.set, icon: slot.icon },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop()
    })
  });

  return (
    <div style={{ margin: "5px 10px 5px 10px" }}>
      <GearFrame
        canDrop={false}
        hasIcon={slot.icon !== undefined}
        backgroundSource={getImageSource(slot.slot)}
      >
        {slot.icon !== undefined ? (
          <Popover
            placement={"top"}
            title={slot.set ? slot.set.name : "Title"}
            content={"content"}
          >
            <GearImg ref={drag} src={slot.icon} />
          </Popover>
        ) : (
          <div />
        )}
      </GearFrame>
    </div>
  );
};

export const DropComponent = ({ slot, group }: IDragProps) => {
  const [, dispatch] = useContext(BuildContext);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [
      slot.slot,
      ...(slot.slot === "mainHand" || slot.slot === "offHand"
        ? ["eitherHand"]
        : [])
    ],
    drop: (item: any, monitor) => {
      console.log("drop", item, group);

      dispatch!({
        type: "DROP_SET_ITEM",
        payload: {
          set: item.set,
          icon: item.icon,
          slot: slot.slot,
          type: item.type,
          group
        }
      });
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div style={{ margin: "5px 10px 5px 10px" }}>
      <GearFrame
        canDrop={true}
        hasIcon={slot.icon !== undefined}
        ref={drop}
        backgroundSource={getImageSource(slot.slot)}
      >
        {slot.icon !== undefined ? (
          <Popover
            placement={"top"}
            title={slot.set ? slot.set.name : "Title"}
            content={"content"}
          >
            <GearImg src={slot.icon} />
          </Popover>
        ) : (
          <div />
        )}
      </GearFrame>
    </div>
  );
};

export const DnDComponent = ({
  slot,
  droppable,
  draggable,
  disabled,
  group
}: IGearSlotProps) => {
  const [, dispatch] = useContext(BuildContext);

  const [{ isDragging, didDrop }, drag] = useDrag({
    item: { type: slot.slot, set: slot.set, icon: slot.icon },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop()
    })
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [
      slot.slot,
      ...(slot.slot === "mainHand" || slot.slot === "offHand"
        ? ["eitherHand"]
        : [])
    ],
    drop: (item: any, monitor) => {
      console.log("drop", item, group);

      dispatch!({
        type: "DROP_SET_ITEM",
        payload: {
          set: item.set,
          icon: item.icon,
          slot: slot.slot,
          type: item.type,
          group
        }
      });
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver()
    })
  });

  //const {slot, title, content} = props;
  return disabled ? (
    <DisplaySlot slot={slot} />
  ) : (
    <div style={{ margin: "5px 10px 5px 10px" }}>
      <GearFrame
        canDrop={droppable && canDrop}
        hasIcon={slot.icon !== undefined}
        ref={drop}
        backgroundSource={getImageSource(slot.slot)}
      >
        {slot.icon !== undefined ? (
          <Popover
            placement={"top"}
            title={slot.set ? slot.set.name : "Title"}
            content={"content"}
          >
            <GearImg ref={drag} src={slot.icon} />
          </Popover>
        ) : (
          <div />
        )}
      </GearFrame>
    </div>
  );
};

const DisplaySlot = ({ slot }: { slot: IGearSlot }) => {
  return (
    <GearFrame
      hasIcon={slot.icon !== undefined}
      backgroundSource={getImageSource(slot.slot)}
    >
      {slot.icon !== undefined ? (
        <Popover
          placement={"top"}
          title={slot.set ? slot.set.name : "Title"}
          content={"content"}
        >
          <GearImg src={slot.icon} />
        </Popover>
      ) : null}
    </GearFrame>
  );
};
