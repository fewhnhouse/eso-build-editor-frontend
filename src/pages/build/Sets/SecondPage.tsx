import React, { useEffect, useState } from "react";
import { Card, Divider } from "antd";
import styled from "styled-components";
import { abilityFrame } from "../../../assets/misc";
import axios from "axios";
import { ClickParam } from "antd/lib/menu";
import skills from "../../../skills.json";
import SkillCard from "./SkillCard";
import Menu from "./Menu";

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

const AbilityContainer = styled.div`
  flex: 2;
  overflow: auto;
  padding: 40px;
`;

const AbilityBarContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px;

  background: white;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

export interface ISkill {
  cast_time: string;
  cost: string;
  effect_1: string;
  effect_2: string | null;
  icon: string;
  id: number;
  name: string;
  parent: number | null;
  pts: number;
  range: string | null;
  skillline: number;
  slug: string;
  target: string;
  type: number;
  unlocks_at: number;
}
export default () => {
  // const [skills, setSkills] = useState([]);
  const [skillLine, setSkillLine] = useState(16);
  useEffect(() => {
    /*
    axios
      .get("/skills", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(({ data }) => {
        console.log(data);
        setSkills(data);
      });
      */
  }, []);
  const handleClick = (e: ClickParam) => {
    setSkillLine(parseInt(e.key, 10));
  };

  //TODO: Change to ISkill once data is fetched from network instead of locally
  const filteredSkills: any[] = skills.filter(
    (skill: any) => skill.skillline === skillLine
  );

  const actives = filteredSkills.filter((skill: any) => skill.type === 1);
  const baseActives = actives.filter((skill: any) => skill.parent === null);
  const morphedActives = actives.filter((skill: any) => skill.parent !== null);
  const passives = filteredSkills.filter((skill: any) => skill.type === 2);
  const ultimates = filteredSkills.filter((skill: any) => skill.type === 3);
  const morphedUltimates = ultimates.filter(
    (skill: any) => skill.parent !== null
  );
  const baseUltimates = ultimates.filter((skill: any) => skill.parent === null);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Menu handleClick={handleClick} />
      <Content>
        <AbilityContainer>
          <Divider>Ultimate</Divider>
          <ul>
            {baseUltimates.map(base => {
              const morphs = morphedUltimates.filter(
                ultimate => ultimate.parent === base.id
              );
              return (
                <SkillCard skill={base} morph1={morphs[0]} morph2={morphs[1]} />
              );
            })}
          </ul>
          <Divider>Active</Divider>
          <ul>
            {baseActives.map(base => {
              const morphs = morphedActives.filter(
                morph => morph.parent === base.id
              );
              return (
                <SkillCard skill={base} morph1={morphs[0]} morph2={morphs[1]} />
              );
            })}
          </ul>

          <Divider>Passive</Divider>
          <ul>
            {passives.map(el => (
              <SkillCard passive skill={el} morph1={el} morph2={el} />
            ))}
          </ul>
        </AbilityContainer>
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
      </Content>
    </div>
  );
};
