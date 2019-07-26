import React from "react";
import { Divider } from "antd";
import { chooseRace, chooseClass } from "../../util/utils";
import styled from "styled-components";
import Card from "./Card";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export default () => {
  return (
    <div>
      <Divider>Race</Divider>
      <CardContainer>
        {[
          "Altmer",
          "Dunmer",
          "Imperial",
          "Breton",
          "Khajiit",
          "Bosmer",
          "Orc",
          "Argonian",
          "Nord",
          "Redguard"
        ].map(race => (
          <Card title={race} imageSource={chooseRace(race)} />
        ))}
      </CardContainer>
      <Divider>Class</Divider>
      <CardContainer>
        {[
          "Necromancer",
          "Dragonknight",
          "Sorcerer",
          "Warden",
          "Nightblade",
          "Templar"
        ].map(esoClass => (
          <Card title={esoClass} imageSource={chooseClass(esoClass)} />
        ))}
      </CardContainer>
    </div>
  );
};
