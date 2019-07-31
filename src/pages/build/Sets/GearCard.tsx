import React, { useContext } from "react";
import { Card, Divider, Popover } from "antd";
import styled from "styled-components";

import { BuildContext } from "../BuildStateContext";
import { IGearSlot, IGearSlotProps } from "../../../components/GearSlot";

interface IGearCard extends IGearSlotProps {
    
}

{/**** MOVE THESE STYLES TO GLOBAL STYLES ****/}
const ToolTip = styled.div`
  display: "flex";
  width: 400px;
  position: relative;
`

const MyAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
`;

const AvatarContainer = styled.div`
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

export default (gearProp: IGearCard) => {
    return (
        <ToolTip>
            <AvatarContainer>
            <MyAvatar
                title={gearProp.slot.set ? gearProp.slot.set.type : "Title"}
                src={gearProp.slot.icon}
            />
            </AvatarContainer>
            <Description>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {gearProp.slot.set ? gearProp.slot.set.slug : "Set"}
            </div>
            </Description>
        </ToolTip>
    )}

