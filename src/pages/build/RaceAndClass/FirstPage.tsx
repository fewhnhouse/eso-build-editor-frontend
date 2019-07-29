import React, { useContext, useEffect } from "react";
import { Divider } from "antd";
import { chooseRace, chooseClass } from "../../../util/utils";
import styled from "styled-components";
import { EsoClassCard, RaceCard } from "./Card";
import { BuildContext } from "../BuildStateContext";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export default () => {
  const [state] = useContext(BuildContext);
  useEffect(() => {
    localStorage.setItem("buildState", JSON.stringify(state));
  }, [state]);
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
          <RaceCard title={race} imageSource={chooseRace(race)} />
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
          <EsoClassCard title={esoClass} imageSource={chooseClass(esoClass)} />
        ))}
      </CardContainer>
    </div>
  );
};
