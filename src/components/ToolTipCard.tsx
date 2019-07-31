import React, { useContext } from "react";
import { Card, Divider, Popover } from "antd";
import styled from "styled-components";
import { BuildContext } from "../pages/build/BuildStateContext";
import { IGearSlot, IGearSlotProps } from "../components/GearSlot";

interface ToolTipCard {
    title: string,
    image: string,
    description: string,
    detailType?: number,
    detailCost?: string,
    detailRange?: string | null
}

const ToolTip = styled.div`
    display: flex;
    position: relative;
    width: 400px;
`
const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
`;
const AvatarContainer = styled.div`
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    padding-right: 16px;
`;
const Description = styled.div`
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
`;
const Title = styled.div`
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
`;

export default
({
    title, image, description,
    detailType, detailCost, detailRange }:
    ToolTipCard
) => {
    return (
        <ToolTip>
            <AvatarContainer>
                <MyAvatar
                    title={title}
                    src={image}
                />
            </AvatarContainer>
            <Title>{title}</Title>
            <Description>
                {detailType} {detailCost} {detailRange}
                <Divider />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {description}
                </div>
            </Description>
        </ToolTip>
    )
}