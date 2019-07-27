import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { Popover } from "antd";

interface IGearSlotProps {
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

//<GearSlot prop1={test}/>

export default ({ slot, title, content, tooltip }: IGearSlotProps) => {
  //const {slot, title, content} = props;
    return (
        <Popover
            placement={tooltip}
            title={title}
            content={content}
        >
            <GearImg src={slot} />
        </Popover>
    );
};
