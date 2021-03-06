import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Popover } from 'antd'
import { abilityFrame } from '../../assets/misc'
import { SkillCardContent } from './SkillCard'
import { BuildContext } from '../../pages/build/BuildStateContext'
import { useDrag, useDrop } from 'react-dnd'

interface ISkillSlotProps {
  id?: string
  droppable?: boolean
  skillIndex: number
  style?: React.CSSProperties
  abilityBar?: number
  size?: 'small' | 'normal'
  skill?: ISkill
  tooltipPos?: 'top' | 'bottom' | undefined
}

export interface ISkill {
  cast_time: string
  cost?: string
  effect_1: string
  effect_2: string | null
  icon: string
  id?: string
  skillId: number
  name: string
  parent: number | null
  pts: number
  range: string | null
  skillline: number
  slug: string
  target: string | null
  type: number
  unlocks_at: number | null
}

export const SkillFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '64px' : '48px'};
  height: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '64px' : '48px'};
  margin: 0;
  background-image: url(${abilityFrame});
  background-repeat: no-repeat;
`

export const SkillImg = styled.img`
  width: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '59px' : '43px'};
  height: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '59px' : '43px'};
`

export default ({
  droppable,
  id,
  skillIndex,
  skill,
  tooltipPos,
  abilityBar,
  style,
  size = 'normal',
}: ISkillSlotProps) => {
  const [, dispatch] = useContext(BuildContext)
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: skillIndex === 5 ? 'ultimate' : 'skill',
      skill,
      index: skillIndex,
      abilityBar,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  useEffect(() => {
    dispatch!({
      type: 'SET_HAS_TRASH',
      payload: {
        hasTrash: isDragging,
      },
    })
  }, [isDragging, dispatch])
  const [, drop] = useDrop({
    accept: skillIndex === 5 ? 'ultimate' : 'skill',
    drop: (item: any) => {
      if (item.type === 'ultimate') {
        if (item.abilityBar === -1) {
          dispatch!({
            type: 'DROP_ULTIMATE',
            payload: {
              barIndex: abilityBar,
              skill: item.skill,
            },
          })
        } else {
          dispatch!({
            type: 'SWAP_ULTIMATE',
            payload: {
              barIndex: item.abilityBar,
              destinationSkill: skill,
              sourceSkill: item.skill,
            },
          })
        }
      } else {
        if (item.abilityBar === abilityBar) {
          dispatch!({
            type: 'SWAP_ABILITY_SAME',
            payload: {
              barIndex: item.abilityBar,
              destinationIndex: item.index,
              destinationSkill: item.skill,
              sourceIndex: skillIndex,
              sourceSkill: skill,
            },
          })
        } else if (item.abilityBar !== -1 && item.abilityBar !== abilityBar) {
          dispatch!({
            type: 'SWAP_ABILITY_DIFFERENT',
            payload: {
              sourceBarIndex: item.abilityBar,
              destinationBarIndex: abilityBar,
              destinationIndex: skillIndex,
              destinationSkill: skill,
              sourceIndex: item.index,
              sourceSkill: item.skill,
            },
          })
        } else {
          dispatch!({
            type: 'DROP_ABILITY',
            payload: {
              barIndex: abilityBar,
              destinationIndex: skillIndex,
              skill: item.skill,
            },
          })
        }
      }
    },
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <SkillFrame size={size} ref={droppable ? drop : undefined} style={style}>
      {skill !== undefined && skill !== null && !isDragging ? (
        <Popover
          mouseEnterDelay={0.5}
          placement={tooltipPos}
          content={<SkillCardContent skill={skill} />}
        >
          <SkillImg
            size={size}
            ref={drag}
            src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${skill.icon}`}
          />
        </Popover>
      ) : skill !== undefined && skill !== null ? (
        <SkillImg
          size={size}
          ref={drag}
          src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${skill.icon}`}
        />
      ) : (
        <div />
      )}
    </SkillFrame>
  )
}
