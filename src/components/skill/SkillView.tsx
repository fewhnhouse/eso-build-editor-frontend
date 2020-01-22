import React from 'react'
import styled from 'styled-components'
import { ABILITY_BAR_ONE } from '../../pages/build/Skills/AbilityBar'
import SkillSlot, { ISkill } from './SkillSlot'
import DisplaySlot from './DisplaySlot'
import { useTrail, animated } from 'react-spring'
import { ISkillSelection } from '../../pages/build/BuildStateContext'
import Flex from '../Flex'

export interface ISKillViewProps {
  skillSlots: ISkillSelection[]
  ultimate?: ISkill
  droppable?: boolean
  size?: 'small' | 'normal'
  id: string
  abilityBar?: number
  disabled?: boolean
}

const SkillView = styled(Flex)`
  max-width: ${(props: { size: 'small' | 'normal' }) =>
    props.size === 'normal' ? '400px' : '300px'};
  width: 100%;
`

const UltimateDisplaySlot = styled(DisplaySlot)`
  margin-left: ${props => props.theme.margins.small};
`

const UltimateSlot = styled(SkillSlot)`
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
    <SkillView size={size} justify='space-between'>
      <Flex>
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
      </Flex>

      {disabled ? (
        <UltimateDisplaySlot size={size} skill={ultimate} />
      ) : abilityBar === -1 ? (
        ultimate &&
        ultimate.skillId > 0 && (
          <UltimateSlot
            size={size}
            abilityBar={abilityBar}
            droppable={droppable}
            skill={ultimate}
            skillIndex={5}
          />
        )
      ) : (
        <UltimateSlot
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
