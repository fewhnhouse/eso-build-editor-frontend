import React, { useEffect, useState, useContext } from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import Menu from './SkillMenu'
import { BuildContext } from '../BuildStateContext'
import AbilityBar from './AbilityBar'
import { ISkill } from '../../../components/SkillSlot'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import SkillsDisplay from '../../../components/SkillsDisplay'
import { skill } from '../../../util/fragments'

const Content = styled.div`
  width: 100%;
  display: flex;
`

const GET_SKILLS = gql`
  query {
    skills {
      ...Skill
    }
  }
  ${skill}
`

export const defaultUltimate: ISkill = {
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
  }, [state, edit])

  const { skillLine } = state!

  useEffect(() => {
    const selectedSkillLine: ISkill[] = skills.filter(
      (skill: ISkill) => skill.skillline === skillLine
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
        id: skillLine,
        ultimate: baseUltimate || undefined,
      },
    })
  }, [skillLine, dispatch, skills])
  const morphs = morphedUltimates.filter(ultimate =>
    ultimate.parent === baseUltimate.skillId ? baseUltimate.skillId : 0
  )

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
        <Menu
          context={BuildContext}
          collapsable
          singleClass
          style={{ maxWidth: 256 }}
        />
        <Content>
          <SkillsDisplay
            interactive
            morphedActives={morphedActives}
            morphs={morphs}
            baseActives={baseActives}
            baseUltimate={baseUltimate}
            passives={passives}
            skillLine={skillLine}
          />
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
