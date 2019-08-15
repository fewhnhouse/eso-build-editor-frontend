import React, { useEffect, useState, useContext } from 'react'
import { Divider, Empty, Spin } from 'antd'
import styled from 'styled-components'
import SkillCard from './SkillCard'
import Menu from './Menu'
import { BuildContext } from '../BuildStateContext'
import AbilityBar from './AbilityBar'
import { ISkill } from '../../../components/SkillSlot'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { useTrail, animated } from 'react-spring'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const AbilityContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding: 40px;
`

const Content = styled.div`
  width: 100%;
  display: flex;
`

const GET_SKILLS = gql`
  query {
    skills {
      id
      name
      skillline
      parent
      type
      effect_1
      effect_2
      cost
      icon
      cast_time
      target
      range
      skillId
    }
  }
`

const defaultUltimate: ISkill = {
  cast_time: '0',
  cost: '0',
  effect_1: '0',
  effect_2: null,
  icon: 'null',
  id: '0',
  skillId: 0,
  name: 'name',
  parent: null,
  pts: 0,
  range: null,
  skillline: 0,
  slug: '',
  target: null,
  type: 3,
  unlocks_at: null,
}

const Skills = ({ skills, edit }: { skills: ISkill[]; edit: boolean }) => {
  // const [skills, setSkills] = useState([]);
  const [state, dispatch] = useContext(BuildContext)
  const [baseActives, setBaseActives] = useState<ISkill[]>([])
  const [morphedActives, setMorphedActives] = useState<ISkill[]>([])
  const [passives, setPassives] = useState<ISkill[]>([])
  const [baseUltimate, setBaseUltimate] = useState<ISkill>(defaultUltimate)
  const [morphedUltimates, setMorphedUltimates] = useState<ISkill[]>([])

  useEffect(() => {
    if (!edit) {
      localStorage.setItem('buildState', JSON.stringify(state))
    }
  }, [state])

  const { skillLine } = state!

  useEffect(() => {
    const selectedSkillLine: ISkill[] = skills.filter(
      (skill: ISkill) => skill.skillline === state!.skillLine
    )
    const actives = selectedSkillLine.filter(
      (skill: ISkill) => skill.type === 1
    )
    const passives = selectedSkillLine.filter(
      (skill: ISkill) => skill.type === 2
    )
    const ultimates = selectedSkillLine.filter(
      (skill: ISkill) => skill.type === 3
    )

    const baseActives = actives.filter((skill: ISkill) => skill.parent === null)

    const morphedActives = actives.filter(
      (skill: ISkill) => skill.parent !== null
    )
    const morphedUltimates = ultimates.filter(
      (skill: ISkill) => skill.parent !== null
    )
    const baseUltimate = ultimates.find(
      (skill: ISkill) => skill.parent === null
    )
    setMorphedActives(morphedActives)
    setMorphedUltimates(morphedUltimates)
    setBaseActives(baseActives)
    setBaseUltimate(baseUltimate!)
    setPassives(passives)
    dispatch!({
      type: 'SET_SELECTED_SKILLS_AND_ULTIMATE',
      payload: {
        selectedSkills: baseActives.map((skill: ISkill, index: number) => ({
          skill,
          index,
        })),
        id: state!.skillLine,
        ultimate: baseUltimate || undefined,
      },
    })
  }, [skillLine, dispatch])
  const morphs = morphedUltimates.filter(ultimate =>
    ultimate.parent === baseUltimate.skillId ? baseUltimate.skillId : 0
  )

  const [trail, set]: any = useTrail(baseActives.length, () => ({
    opacity: 0,
    transform: 'translate(0px, -40px)',
  }))

  useEffect(() => {
    setTimeout(() => {
      set({ opacity: 1, transform: 'translate(0px, 0px)' })
    }, 300)
  }, [baseActives])

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Menu />
        <Content>
          {state!.skillLine !== 0 ? (
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
                  {trail.map(({ opacity, transform }: any, index: number) => {
                    const morphs = morphedActives.filter(
                      morph => morph.parent === baseActives[index].skillId
                    )
                    return (
                      <animated.div style={{ opacity, transform }}>
                        <SkillCard
                          key={index}
                          skill={baseActives[index]}
                          morph1={morphs[0]}
                          morph2={morphs[1]}
                        />
                      </animated.div>
                    )
                  })}
                </>
              )}

              <Divider>Passives</Divider>
              <>
                {passives.map((el, key) => (
                  <SkillCard
                    key={key}
                    passive
                    skill={el}
                    morph1={el}
                    morph2={el}
                  />
                ))}
              </>
            </AbilityContainer>
          ) : (
            <Empty
              style={{
                display: 'flex',
                justifyContent: 'center',
                flex: 2,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              Select a Skill Line to get started.
            </Empty>
          )}
          {baseActives.length > 0 && <AbilityBar />}
        </Content>
      </div>
    </DndProvider>
  )
}
export default ({ edit }: { edit: boolean }) => {
  const { loading, error, data } = useQuery(GET_SKILLS)
  if (loading) {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Spin style={{ marginTop: 10 }} />
      </div>
    )
  }
  if (error) {
    return <div>Error.</div>
  }
  if (data && data.skills) {
    return <Skills skills={data.skills} edit={edit} />
  }
  return null
}
