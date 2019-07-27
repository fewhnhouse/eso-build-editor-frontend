import React from "react";
import styled from "styled-components";
import { Divider, Card } from "antd";
import { abilityFrame } from "../../../assets/misc";
import skills from "../../../skills.json";

const AbilityBar = styled(Card)`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 500px;
`;

const Ability = styled.img`
  margin: 0px 10px;
`;

const AbilityBarContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;
`;

export default () => {
  return (
    <AbilityBarContainer>
      <Divider>Ultimate</Divider>
      <Ability src={abilityFrame} />

      <Divider>Active</Divider>
      <AbilityBar>
        {[1, 2, 3, 4, 5].map(e => (
          <Ability src={abilityFrame} />
        ))}
      </AbilityBar>
      <Divider>Ability Bar</Divider>

      <AbilityBar>
        {[1, 2, 3, 4, 5].map(e => (
          <Ability src={abilityFrame} />
        ))}
      </AbilityBar>
      <AbilityBar>
        {[1, 2, 3, 4, 5].map(e => (
          <Ability src={abilityFrame} />
        ))}
      </AbilityBar>
    </AbilityBarContainer>
  );
};
