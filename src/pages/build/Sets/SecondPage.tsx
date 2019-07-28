import React, { useEffect, useState, useContext } from "react";
import { Divider } from "antd";
import styled from "styled-components";
import axios from "axios";
import { ClickParam } from "antd/lib/menu";
import skills from "../../../skills.json";
import SkillCard from "./SkillCard";
import Menu from "./Menu";
import { BuildContext } from "../BuildStateContext";
import AbilityBar from "./AbilityBar";

const AbilityContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding: 40px;
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
  target: string | null;
  type: number;
  unlocks_at: number | null;
}

const defaultUltimate: ISkill = {
  cast_time: "0",
  cost: "0",
  effect_1: "0",
  effect_2: null,
  icon: "null",
  id: 0,
  name: "name",
  parent: null,
  pts: 0,
  range: null,
  skillline: 0,
  slug: "",
  target: null,
  type: 3,
  unlocks_at: null
};
export default () => {
  // const [skills, setSkills] = useState([]);
  const [skillLine, setSkillLine] = useState(16);
  const [, dispatch] = useContext(BuildContext);
  const [baseActives, setBaseActives] = useState<ISkill[]>([]);
  const [morphedActives, setMorphedActives] = useState<ISkill[]>([]);
  const [passives, setPassives] = useState<ISkill[]>([]);
  const [baseUltimate, setBaseUltimate] = useState<ISkill>(defaultUltimate);
  const [morphedUltimates, setMorphedUltimates] = useState<ISkill[]>([]);

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
    dispatch!({ type: "SET_SKILLS", payload: skills });
  }, [dispatch]);
  const handleClick = (e: ClickParam) => {
    setSkillLine(parseInt(e.key, 10));
  };

  useEffect(() => {
    const filteredSkills: ISkill[] = skills.filter(
      (skill: ISkill) => skill.skillline === skillLine
    );

    const actives = filteredSkills.filter((skill: ISkill) => skill.type === 1);
    const passives = filteredSkills.filter((skill: ISkill) => skill.type === 2);
    const ultimates = filteredSkills.filter(
      (skill: ISkill) => skill.type === 3
    );

    const baseActives = actives.filter(
      (skill: ISkill) => skill.parent === null
    );

    const morphedActives = actives.filter(
      (skill: ISkill) => skill.parent !== null
    );
    const morphedUltimates = ultimates.filter(
      (skill: ISkill) => skill.parent !== null
    );
    const baseUltimate = ultimates.find(
      (skill: ISkill) => skill.parent === null
    );

    setMorphedActives(morphedActives);
    setMorphedUltimates(morphedUltimates);
    setBaseActives(baseActives);
    setBaseUltimate(baseUltimate!);
    setPassives(passives);
    dispatch!({
      type: "SET_SELECTED_SKILLS",
      payload: baseActives.map((skill: ISkill, index: number) => ({
        id: skill.id,
        index
      }))
    });
    dispatch!({
      type: "SET_SELECTED_ULTIMATE",
      payload: baseUltimate!.id
    });
  }, [skillLine, dispatch]);
  const morphs = morphedUltimates.filter(ultimate =>
    ultimate.parent === baseUltimate.id ? baseUltimate.id : 0
  );

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
            <SkillCard
              ultimate
              skill={baseUltimate || baseActives[0]}
              morph1={morphs[0] || defaultUltimate}
              morph2={morphs[1] || defaultUltimate}
            />
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
        <AbilityBar />
      </Content>
    </div>
  );
};
