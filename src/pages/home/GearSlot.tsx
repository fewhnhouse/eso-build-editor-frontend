import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { chooseRace, chooseClass } from "../../util/utils";
import { Divider, Tooltip, Popover } from "antd";
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
} from "../../assets/gear";

interface IGearSlotProps {
  slot: string;
  title: string;
  content: string;
  place:
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

//<GearSlot prop1={test}/>

export default ({ slot, title, content, place }: IGearSlotProps) => {
  //const {slot, title, content} = props;
    return (
        <Popover
            placement={place}
            title={title}
            content={content}
        >
            <GearImg src={slot} />
        </Popover>
    );
};
