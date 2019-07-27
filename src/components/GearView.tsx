import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import GearSlot, { IGearSlotProps } from "../components/GearSlot";

import { Typography, Divider } from "antd";

const GearView = styled.div``;

const { Title, Text } = Typography;

interface ISetup {
  name: string;
  data: IGearSlotProps[];
}

export default () => {
  const setups: ISetup[] = [
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
      name: "Weapons",
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
        },
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

  return (
    <GearView>
      {setups.map((setup: ISetup) => (
        <>
          <Title level={4}>{setup.name}</Title>
          {setup.data.map((slot: IGearSlotProps) => (
            <GearSlot
              slot={slot.slot}
              tooltip={slot.tooltip}
              title={slot.title}
              content={slot.content}
            />
          ))}
        </>
      ))}
    </GearView>
  );
};
