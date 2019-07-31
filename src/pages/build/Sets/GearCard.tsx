import React, { useContext } from "react";
import { Card, Divider, Popover } from "antd";
import styled from "styled-components";
import { BuildContext } from "../BuildStateContext";
import { IGearSlot, IGearSlotProps } from "../../../components/GearSlot";
import ToolTipCard from "../../../components/ToolTipCard";

interface IGearCard extends IGearSlotProps {}

export default ({ slot }: IGearCard) => {
    return (
        <ToolTipCard
          title={slot.set ? slot.set.name : "Undefined"}
          image={slot.icon ? slot.icon : "Undefined"}
          description={slot.set ? slot.set.slug : "Undefined"}
        />
    )}

