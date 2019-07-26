import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { Popover } from "antd";
import { abilityFrame } from "../assets/misc";
import { drink } from "../assets/deco";
import SkillFrame from "./SkillFrame";

const SkillBars = styled.div`
    display: flex;
    flex-direction: row;
    width: 320px;
`;

export default () => {
  return (
    <SkillBars>
      <SkillFrame />
      <SkillFrame />
      <SkillFrame />
      <SkillFrame />
      <SkillFrame />
    </SkillBars>
  );
};
