import React, { useEffect, useContext } from 'react'
import { ISkill } from './SkillSlot'
import { Divider, Empty, Spin } from 'antd'
import SkillCard, { DisplaySkillCard } from './SkillCard'
import { useTrail, animated } from 'react-spring'
import { defaultUltimate } from '../../pages/build/Skills/Skills'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { useQuery } from 'react-apollo'
import { ITheme } from '../theme'
import { skill } from '../../util/fragments'
import gql from 'graphql-tag'
import Flex from '../Flex'
import { BuildContext } from '../../pages/build/BuildStateContext'

const AbilityContainer = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? '0px' : props.theme.paddings.large};
`

const StyledEmpty = styled(Empty)`
  display: flex;
  justify-content: center;
  flex: 2;
  flex-direction: column;
  align-items: center;
`

interface ISkillDisplay {
  skillline: number
  interactive?: boolean
}

const GET_SKILLS = gql`
  query skills($skillline: Int!) {
    skills(where: { skillline: $skillline }) {
      ...Skill
    }
  }
  ${skill}
`
interface ISkillListProps {
  interactive: boolean
  skills: ISkill[]
  skillline: number
}
const SkillList = ({ interactive, skills, skillline }: ISkillListProps) => {
  const [, dispatch] = useContext(BuildContext)

  const actives = skills.filter(skill => skill.type === 1)
  const passives = skills.filter(skill => skill.type === 2)
  const ultimates = skills.filter(skill => skill.type === 3)

  const baseActives = actives.filter(skill => skill.parent === null)

  const morphedActives = actives.filter(skill => skill.parent !== null)
  const morphedUltimates = ultimates.filter(skill => skill.parent !== null)
  const baseUltimate =
    ultimates.find(skill => skill.parent === null) || defaultUltimate

  const morphs = morphedUltimates.filter(ultimate =>
    ultimate.parent === baseUltimate.skillId ? baseUltimate.skillId : 0
  )
  const [trail, set]: any = useTrail(baseActives.length, () => ({
    opacity: 0,
    transform: 'translate(0px, -40px)',
  }))

  useEffect(() => {
    if (interactive) {
      const baseActives = skills.filter(
        skill => skill.type === 1 && skill.parent === null
      )

      dispatch!({
        type: 'SET_SELECTED_SKILLS_AND_ULTIMATE',
        payload: {
          selectedSkills: baseActives.map((skill: ISkill, index: number) => ({
            skill,
            index,
          })),
          id: skillline,
          ultimate: baseUltimate || undefined,
        },
      })
    }
  }, [interactive, dispatch, baseUltimate, skillline, skills])

  const isMobile = useMediaQuery({ maxWidth: 800 })

  const sortSkills = (skill1: ISkill, skill2: ISkill) =>
    skill1.unlocks_at && skill2.unlocks_at
      ? skill1.unlocks_at > skill2.unlocks_at
        ? 1
        : -1
      : 0

  baseActives.sort(sortSkills)

  passives.sort(sortSkills)

  useEffect(() => {
    const timeout = setTimeout(() => {
      set({ opacity: 1, transform: 'translate(0px, 0px)' })
    }, 300)
    return () => clearTimeout(timeout)
  }, [baseActives, set])

  return (
    <AbilityContainer isMobile={isMobile}>
      <Divider>Ultimate</Divider>
      {baseUltimate &&
        baseUltimate.skillId !== 0 &&
        (interactive ? (
          <SkillCard
            ultimate
            skill={baseUltimate || baseActives[0]}
            morph1={morphs[0] || defaultUltimate}
            morph2={morphs[1] || defaultUltimate}
          />
        ) : (
          <DisplaySkillCard
            ultimate
            skill={baseUltimate || baseActives[0]}
            morph1={morphs[0] || defaultUltimate}
            morph2={morphs[1] || defaultUltimate}
          />
        ))}
      <Divider>Actives</Divider>
      {baseActives.length > 0 && (
        <>
          {trail.map(({ opacity, transform }: any, index: number) => {
            const morphs = morphedActives.filter(
              morph => morph.parent === baseActives[index].skillId
            )
            return (
              <animated.div
                key={baseActives[index].id || index}
                style={{ opacity, transform }}
              >
                {interactive ? (
                  <SkillCard
                    key={baseActives[index].id || `baseActive-${index}`}
                    skill={baseActives[index]}
                    morph1={morphs[0]}
                    morph2={morphs[1]}
                  />
                ) : (
                  <DisplaySkillCard
                    key={baseActives[index].id || `baseActive-${index}`}
                    skill={baseActives[index]}
                    morph1={morphs[0]}
                    morph2={morphs[1]}
                  />
                )}
              </animated.div>
            )
          })}
        </>
      )}

      <Divider>Passives</Divider>
      <>
        {passives.map((el, index) =>
          interactive ? (
            <SkillCard
              key={el.id || `passive-${index}`}
              passive
              skill={el}
              morph1={el}
              morph2={el}
            />
          ) : (
            <DisplaySkillCard
              key={el.id || `passive-${index}`}
              passive
              skill={el}
              morph1={el}
              morph2={el}
            />
          )
        )}
      </>
    </AbilityContainer>
  )
}

export default ({ skillline, interactive }: ISkillDisplay) => {
  const { loading, error, data } = useQuery(GET_SKILLS, {
    variables: { skillline },
  })

  if (error) {
    return <div>Error.</div>
  }
  if (loading) {
    return (
      <Flex fluid justify='center'>
        <Spin />
      </Flex>
    )
  }
  return data && skillline !== 0 ? (
    <SkillList
      interactive={interactive || false}
      skills={data.skills || []}
      skillline={skillline}
    />
  ) : (
    <StyledEmpty>Select a Skill Line to get started.</StyledEmpty>
  )
}
