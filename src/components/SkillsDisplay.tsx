import React, { useEffect } from 'react'
import { ISkill } from './SkillSlot'
import { Divider, Empty } from 'antd'
import SkillCard, { DisplaySkillCard } from './SkillCard'
import { useTrail, animated } from 'react-spring'
import { defaultUltimate } from '../pages/build/Skills/Skills'
import styled from 'styled-components'

const AbilityContainer = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding: 40px;
`

interface ISkillDisplay {
  skillLine: number
  baseUltimate: ISkill
  baseActives: ISkill[]
  morphedActives: ISkill[]
  morphs: ISkill[]
  passives: ISkill[]
  interactive?: boolean
}

export default ({
  skillLine,
  baseUltimate,
  baseActives,
  morphedActives,
  morphs,
  passives,
  interactive,
}: ISkillDisplay) => {
  const [trail, set]: any = useTrail(baseActives.length, () => ({
    opacity: 0,
    transform: 'translate(0px, -40px)',
  }))

  useEffect(() => {
    const timeout = setTimeout(() => {
      set({ opacity: 1, transform: 'translate(0px, 0px)' })
    }, 300)
    return () => clearTimeout(timeout)
  }, [baseActives, set])

  return skillLine !== 0 ? (
    <AbilityContainer>
      <Divider>Ultimate</Divider>
      {baseUltimate &&
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
  )
}
