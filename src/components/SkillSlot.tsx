import React, { useContext, useEffect, useState } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Popover, Modal } from 'antd'
import { abilityFrame } from '../assets/misc'
import { SkillCardContent } from './SkillCard'
import { BuildContext } from '../pages/build/BuildStateContext'
import { useDrag, useDrop } from 'react-dnd'
import { useMediaQuery } from 'react-responsive'

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
  cost: string
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

const SkillFrame = styled.div`
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

const SkillImg = styled.img`
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
    collect: monitor => ({
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
    collect: monitor => ({
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

const DesktopSlot = ({
  skill,
  size,
}: {
  skill: ISkill
  size: 'small' | 'normal'
}) => {
  return (
    <Popover
      placement={'top'}
      mouseEnterDelay={0.5}
      content={<SkillCardContent skill={skill} />}
    >
      <SkillImg
        size={size}
        src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${skill.icon}`}
      />
    </Popover>
  )
}

const MobileSlot = ({
  skill,
  size,
}: {
  skill: ISkill
  size: 'small' | 'normal'
}) => {
  const [visible, setVisible] = useState(false)
  const toggleModal = () => {
    setVisible(visible => !visible)
  }

  return (
    <>
      <Modal
        bodyStyle={{ display: 'flex', justifyContent: 'center', margin: 0 }}
        visible={visible}
        onCancel={toggleModal}
        footer={null}
        title='Skill Details'
      >
        <SkillCardContent skill={skill} />
      </Modal>
      <SkillImg
        onClick={toggleModal}
        size={size}
        src={`${process.env.REACT_APP_IMAGE_SERVICE}/skills/${skill.icon}`}
      />
    </>
  )
}

export const DisplaySlot = ({
  skill,
  style,
  size = 'small',
}: {
  skill?: ISkill
  style?: CSSProperties
  size?: 'small' | 'normal'
}) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return skill !== undefined && skill !== null ? (
    <SkillFrame size={size} style={style}>
      {isMobile ? (
        <MobileSlot skill={skill} size={size} />
      ) : (
        <DesktopSlot skill={skill} size={size} />
      )}
    </SkillFrame>
  ) : (
    <SkillFrame size={size} style={style} />
  )
}
