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
  const [state, dispatch] = useContext(BuildContext);
  const [baseActives, setBaseActives] = useState<ISkill[]>([]);
  const [morphedActives, setMorphedActives] = useState<ISkill[]>([]);
  const [passives, setPassives] = useState<ISkill[]>([]);
  const [baseUltimate, setBaseUltimate] = useState<ISkill>(defaultUltimate);
  const [morphedUltimates, setMorphedUltimates] = useState<ISkill[]>([]);

  useEffect(() => {
    console.log(state);
    localStorage.setItem("buildState", JSON.stringify(state));
  }, [state]);

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

  useEffect(() => {
    const selectedSkillLine: ISkill[] = skills.filter(
      (skill: ISkill) => skill.skillline === state!.skillLine
    );

    const actives = selectedSkillLine.filter(
      (skill: ISkill) => skill.type === 1
    );
    const passives = selectedSkillLine.filter(
      (skill: ISkill) => skill.type === 2
    );
    const ultimates = selectedSkillLine.filter(
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
      type: "SET_SELECTED_SKILLS_AND_ULTIMATE",
      payload: {
        selectedSkills: baseActives.map((skill: ISkill, index: number) => ({
          id: skill.id,
          index
        })),
        id: state!.skillLine,
        ultimate: baseUltimate ? baseUltimate!.id : 0
      }
    });
  }, [state!.skillLine, dispatch]);
  const morphs = morphedUltimates.filter(ultimate =>
    ultimate.parent === baseUltimate.id ? baseUltimate.id : 0
  );
  console.log(passives, baseActives, baseUltimate);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Menu />
      <Content>
        <AbilityContainer>
          <Divider>Ultimate</Divider>
          {baseUltimate && (
            <SkillCard
              ultimate
              skill={baseUltimate || baseActives[0]}
              morph1={morphs[0] || defaultUltimate}
              morph2={morphs[1] || defaultUltimate}
            />
          )}
          <Divider>Actives</Divider>
          {baseActives.length > 0 && (
            <>
              {baseActives.map((base, index) => {
                console.log(base);
                const morphs = morphedActives.filter(
                  morph => morph.parent === base.id
                );
                return (
                  <SkillCard
                    key={index}
                    skill={base}
                    morph1={morphs[0]}
                    morph2={morphs[1]}
                  />
                );
              })}
            </>
          )}

          <Divider>Passives</Divider>
          <>
            {passives.map((el, key) => (
              <SkillCard key={key} passive skill={el} morph1={el} morph2={el} />
            ))}
          </>
        </AbilityContainer>
        {baseActives.length > 0 && <AbilityBar />}
      </Content>
    </div>
  );
};
