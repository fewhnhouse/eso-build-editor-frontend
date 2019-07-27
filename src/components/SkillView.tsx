import React from "react";
import styled from "styled-components";
import SkillSlot from "./SkillSlot";

interface ISKillViewProps {
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

const SkillView = styled.div`
    display: flex;
    flex-direction: row;
    width: 320px;
`;

export default ({ tooltip }: ISKillViewProps) => {
  return (
    <SkillView>
      <SkillSlot tooltip={tooltip}/>
      <SkillSlot tooltip={tooltip}/>
      <SkillSlot tooltip={tooltip}/>
      <SkillSlot tooltip={tooltip}/>
      <SkillSlot tooltip={tooltip}/>
    </SkillView>
  );
};
