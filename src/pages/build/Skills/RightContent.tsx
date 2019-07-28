import React, { useCallback } from "react";
import styled from "styled-components";
import { Divider } from "antd";
import GearView from "../../../components/GearView";
import { DragDropContext } from "react-beautiful-dnd";
import { IGearSlot } from "../../../components/GearSlot";

const OuterContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px;

  background: white;
`;

export interface IGearSetup {
  name: string;
  data: IGearSlot[];
}

const setups: IGearSetup[] = [
  {
    name: "Apparel",
    data: [
      {
        slot: "head",
        tooltip: "top",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "shoulders",
        tooltip: "left",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "chest",
        tooltip: "right",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "belt",
        tooltip: "left",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "hands",
        tooltip: "right",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "legs",
        tooltip: "left",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "feet",
        tooltip: "right",
        title: "OP DLC set",
        content: "Set information here"
      }
    ]
  },
  {
    name: "Accessories",
    data: [
      {
        slot: "neck",
        tooltip: "left",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "ring",
        tooltip: "bottom",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "ring",
        tooltip: "right",
        title: "OP DLC set",
        content: "Set information here"
      }
    ]
  },
  {
    name: "Frontbar",
    data: [
      {
        slot: "mainHand",
        tooltip: "left",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "offHand",
        tooltip: "right",
        title: "OP DLC set",
        content: "Set information here"
      }
    ]
  },
  {
    name: "Backbar",
    data: [
      {
        slot: "mainHand",
        tooltip: "left",
        title: "OP DLC set",
        content: "Set information here"
      },
      {
        slot: "offHand",
        tooltip: "right",
        title: "OP DLC set",
        content: "Set information here"
      }
    ]
  }
];

export default () => {
  const onBeforeDragStart = useCallback(() => {}, []);

  const onDragStart = useCallback(start => {}, []);
  const onDragUpdate = useCallback(update => {}, []);
  const onDragEnd = useCallback(end => {}, []);
  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <OuterContainer>
        <Divider>Active Selection</Divider>
        <GearView
          setups={setups.filter(setup => setup.name === "Apparel")}
          id={1}
        />

        <Divider>Setup</Divider>
        <GearView setups={setups} id={2} />
      </OuterContainer>
    </DragDropContext>
  );
};
