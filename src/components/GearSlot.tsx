import React from 'react'
import styled from 'styled-components'
import { Popover, Avatar, Card } from 'antd'
import {
  head,
  chest,
  legs,
  hands,
  belt,
  feet,
  shoulders,
  mainHand,
  offHand,
  quickslot,
  ring,
  neck,
} from '../assets/gear'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import GearCard from "../pages/build/GearCard"

export interface IGearSlotProps {
  slot: IGearSlot
  index: number
  droppable?: boolean
  disabled?: boolean
  draggable?: boolean
  id: string
}

export interface IGearSlot {
  slot: string
  set?: ISet
  icon?: string
}

const GearImg = styled.img`
  width: 64px;
  height: 64px;
`

const GearFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
  background-image: url(${(props: {
    hasIcon: boolean
    backgroundSource: string
  }) => (props.hasIcon ? '' : props.backgroundSource)});
  background-repeat: no-repeat;
`

export interface ISet {
  id: number
  name: string
  location: string
  type: string
  slug: string
  bonus_item_1: string | null
  bonus_item_2: string | null
  bonus_item_3: string | null
  bonus_item_4: string | null
  bonus_item_5: string | null
  has_jewels: number
  has_weapons: number
  has_heavy_armor: number
  has_light_armor: number
  has_medium_armor: number
  traits_needed: number | null
  pts: number
  eso_id: null | number
  [key: string]: string | null | number
}

const getImageSource = (slot: string) => {
  switch (slot) {
    case 'legs':
      return legs
    case 'head':
      return head
    case 'shoulders':
      return shoulders
    case 'waist':
      return belt
    case 'hands':
      return hands
    case 'feet':
      return feet
    case 'chest':
      return chest
    case 'ring1':
      return ring
    case 'ring2':
      return ring
    case 'neck':
      return neck
    case 'mainHand':
      return mainHand
    case 'offHand':
      return offHand
    case 'quickslot':
      return quickslot
    default:
      return ''
  }
}

export default ({
  slot,
  index,
  droppable,
  draggable,
  id,
  disabled,
}: IGearSlotProps) => {
  return (
    <div style={{ margin: '5px 10px 5px 10px' }}>
      {disabled ? (
        <GearFrame
          hasIcon={slot.icon !== undefined}
          backgroundSource={getImageSource(slot.slot)}
        >
          {slot.icon !== undefined ? (
            <Popover
              placement={'top'}
              title={slot.set ? slot.set.name : 'Title'}
              content={<GearCard index={index} id={id} slot={slot} />}
            >
              <GearImg src={slot.icon} />
            </Popover>
          ) : null}
        </GearFrame>
      ) : (
        <Droppable
          isDropDisabled={!droppable}
          droppableId={`${id}-${slot.slot}-droppable-${index}`}
        >
          {(provided, snapshot) => (
            <GearFrame
              hasIcon={slot.icon !== undefined}
              ref={provided.innerRef}
              {...provided.droppableProps}
              backgroundSource={getImageSource(slot.slot)}
            >
              {provided.placeholder}
              <Draggable
                isDragDisabled={!draggable}
                draggableId={`${id}-${slot.slot}-draggable-${index}`}
                index={index}
              >
                {(provided, snapshot) =>
                  slot.icon !== undefined ? (
                    <Popover
                      placement={'top'}
                      title={slot.set ? slot.set.name : 'Title'}
                      content={<GearCard index={index} id={id} slot={slot} />}
                    >
                      <GearImg
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        src={slot.icon}
                      />
                    </Popover>
                  ) : (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )
                }
              </Draggable>
            </GearFrame>
          )}
        </Droppable>
      )}
    </div>
  )
}
