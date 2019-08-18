import React from 'react'
import styled from 'styled-components'
import { ABILITY_BAR_ONE } from '../pages/build/Skills/AbilityBar'
import NewSkillSlot, { DisplaySlot, ISkill } from './SkillSlot'
import { useTrail, animated } from 'react-spring'
import { ISkillSelection } from '../pages/build/BuildStateContext'

export interface ISKillViewProps {
  skillSlots: ISkillSelection[]
  ultimate?: ISkill
  droppable?: boolean
  id: string
  abilityBar?: number
  disabled?: boolean
}

const SkillView = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
`

export default ({
  skillSlots,
  ultimate,
  droppable,
  id,
  abilityBar,
  disabled
}: ISKillViewProps) => {
  const pos = (id: string) => {
    if (id === ABILITY_BAR_ONE) {
      return 'top'
    } else return 'bottom'
  }
  const trail = useTrail(skillSlots.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    from: { opacity: 0 }
  })

  return (
    <SkillView>
      {trail.map(({ opacity }: any, index: number) => (
        <animated.div key={index} style={{ opacity }}>
          {disabled ? (
            <DisplaySlot skill={skillSlots[index].skill} />
          ) : (
            <NewSkillSlot
              id={skillSlots[index].id}
              abilityBar={abilityBar}
              droppable={droppable}
              skillIndex={skillSlots[index].index}
              tooltipPos={pos(id)}
              skill={skillSlots[index] ? skillSlots[index].skill : undefined}
            />
          )}
        </animated.div>
      ))}
      {ultimate ? (
        <animated.div>
          {disabled ? (
            <DisplaySlot skill={ultimate} />
          ) : (
            <NewSkillSlot
              id={ultimate.id}
              abilityBar={abilityBar}
              droppable={droppable}
              skillIndex={skillSlots[6].index}
              tooltipPos={pos(id)}
              skill={ultimate}
            />
          )}
        </animated.div>
      ) : (
        ''
      )}
    </SkillView>
  )
}
