import React from 'react'
import styled from 'styled-components'
import { ABILITY_BAR_ONE } from '../pages/build/Skills/AbilityBar'
import SkillSlot, { DisplaySlot, ISkill } from './SkillSlot'
import { useTrail, animated } from 'react-spring'
import { ISkillSelection } from '../pages/build/BuildStateContext'

export interface ISKillViewProps {
  skillSlots: ISkillSelection[]
  ultimate?: ISkill
  droppable?: boolean
  size?: 'small' | 'normal'
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

const StyledDisplaySlot = styled(DisplaySlot)`
  margin-left: ${props => props.theme.margins.small};
`

const StyledSkillSlot = styled(SkillSlot)`
  margin-left: ${props => props.theme.margins.small};
`

export default ({
  skillSlots,
  ultimate,
  droppable,
  id,
  abilityBar,
  size = 'normal',
  disabled,
}: ISKillViewProps) => {
  const pos = (id: string) => {
    if (id === ABILITY_BAR_ONE) {
      return 'top'
    } else return 'bottom'
  }
  const trail = useTrail(skillSlots.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    from: { opacity: 0 },
  })
  return (
    <SkillView>
      {trail.map(({ opacity }: any, index: number) => (
        <animated.div key={index} style={{ opacity }}>
          {disabled ? (
            <DisplaySlot size={size} skill={skillSlots[index].skill} />
          ) : (
            <SkillSlot
              size={size}
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
      {disabled ? (
        <StyledDisplaySlot size={size} skill={ultimate} />
      ) : abilityBar === -1 ? (
        ultimate && (
          <StyledSkillSlot
            size={size}
            abilityBar={abilityBar}
            droppable={droppable}
            skill={ultimate}
            skillIndex={5}
          />
        )
      ) : (
        <StyledSkillSlot
          size={size}
          abilityBar={abilityBar}
          droppable={droppable}
          skill={ultimate}
          skillIndex={5}
        />
      )}
    </SkillView>
  )
}
