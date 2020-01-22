import React, { useContext } from 'react'
import styled from 'styled-components'
import { Popover, Typography, Button } from 'antd'
import { useDrag, useDrop } from 'react-dnd'
import {
  BuildContext,
  Slot,
  ISetSelection,
} from '../../pages/build/BuildStateContext'
import { GearCardContent } from './GearSlotCard'
import Flex from '../Flex'
import { getImageSource, getGearSlot, getWeaponType } from './util'

export const GearImg = styled.img`
  width: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '62px' : '46px'};
  height: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '62px' : '46px'};
`

interface IGearFrameProps {
  hasIcon: boolean
  canDrop?: boolean
  backgroundSource: string
  size: 'normal' | 'small'
}

export const GearFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props: IGearFrameProps) =>
    props.size === 'normal' ? '64px' : '48px'};
  height: ${(props: IGearFrameProps) =>
    props.size === 'normal' ? '64px' : '48px'};
  border: 2px solid;
  border-color: ${(props: IGearFrameProps) =>
    props.canDrop ? '#27ae60' : 'rgba(0, 0, 0, 0.45)'};
  border-radius: ${props => props.theme.borderRadius};
  background-image: url(${(props: IGearFrameProps) =>
    props.hasIcon ? '' : props.backgroundSource});
  background-repeat: no-repeat;
`

export const TextPrimary = styled(Typography.Text)`
  width: ${props => props.theme.widths.mini};
  text-align: left;
`

export const TextSecondary = styled(Typography.Text)`
  font-size: 12px;
  width: ${props => props.theme.widths.mini};
  text-align: left;
`

export const InnerDisplay = styled(Flex)`
  height: 100%;
  margin-left: ${props => props.theme.margins.small};
`

const StyledButton = styled(Button)`
  margin-top: ${props => props.theme.margins.mini};
  position: absolute;
  right: 5px;
  bottom: 5px;
`

const StyledGearWrapper = styled.div`
  margin: ${props =>
    `${props.theme.margins.mini} ${props.theme.margins.small}`};
`

export const DisplayCard = styled.div`
  padding: ${props => props.theme.paddings.mini};
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: ${props => props.theme.widths.small};
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: ${props => props.theme.borderRadius};
  margin: ${props => props.theme.margins.small};
  position: relative;
`

export interface ISet {
  id: string
  setId: number
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

export interface IGearSlotProps {
  slot: ISetSelection
  droppable?: boolean
  group: string
  extended?: boolean
  setSelectionCount: number
  size?: 'normal' | 'small'
}

export default ({
  slot,
  droppable,
  group,
  size = 'normal',
  extended,
  setSelectionCount,
}: IGearSlotProps) => {
  const [, dispatch] = useContext(BuildContext)

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: slot.slot,
      set: slot.selectedSet,
      icon: slot.icon,
      weaponType: slot.weaponType,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [{ canDrop }, drop] = useDrop({
    accept: [
      slot.slot,
      ...(slot.slot === Slot.mainHand || slot.slot === Slot.offHand
        ? [Slot.eitherHand]
        : []),
    ],
    drop: (item: any, monitor) => {
      dispatch!({
        type: 'DROP_SET_ITEM',
        payload: {
          set: item.set,
          icon: item.icon,
          slot: slot.slot,
          weaponType: item.weaponType,
          group,
        },
      })
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
    }),
  })

  const handleSlotClick = () => {
    dispatch!({
      type: 'DROP_SET_ITEM',
      payload: {
        set: slot.selectedSet,
        icon: slot.icon,
        slot: slot.slot,
        weaponType: slot.weaponType,
        group,
      },
    })
  }
  return extended ? (
    <DisplayCard>
      <GearFrame
        size={size}
        canDrop={droppable && canDrop}
        hasIcon={slot.selectedSet !== null && slot.selectedSet !== undefined}
        ref={droppable ? drop : undefined}
        backgroundSource={`${
          process.env.REACT_APP_IMAGE_SERVICE
        }/gear/slots/${getImageSource(slot.slot)}`}
      >
        {slot.selectedSet && isDragging ? (
          <GearImg size={size} ref={drag} src={getGearSlot(slot)} />
        ) : slot.selectedSet ? (
          <Popover
            placement={'top'}
            mouseEnterDelay={0.5}
            content={
              <GearCardContent
                setSelectionCount={setSelectionCount}
                gear={slot}
              />
            }
          >
            <GearImg size={size} ref={drag} src={getGearSlot(slot)} />
          </Popover>
        ) : (
          <div />
        )}
      </GearFrame>
      <InnerDisplay
        direction='column'
        justify='space-between'
        align='flex-start'
      >
        <TextPrimary ellipsis strong>
          {slot.selectedSet ? slot.selectedSet.name : 'Set not selected.'}
        </TextPrimary>
        {!droppable && (
          <TextSecondary ellipsis type='secondary'>
            {getWeaponType(slot.weaponType)}
          </TextSecondary>
        )}
        {droppable ? (
          <>
            <TextSecondary ellipsis type='secondary'>
              {slot.glyph ? slot.glyph.type : 'Glyph not selected.'}
            </TextSecondary>
            <TextSecondary ellipsis type='secondary'>
              {slot.trait ? slot.trait.type : 'Trait not selected.'}
            </TextSecondary>
          </>
        ) : (
          <StyledButton
            onClick={handleSlotClick}
            size='small'
            ghost
            type='primary'
          >
            Slot
          </StyledButton>
        )}
      </InnerDisplay>
    </DisplayCard>
  ) : (
    <StyledGearWrapper>
      <GearFrame
        size={size}
        canDrop={droppable && canDrop}
        hasIcon={slot.selectedSet !== null && slot.selectedSet !== undefined}
        ref={droppable ? drop : undefined}
        backgroundSource={`${
          process.env.REACT_APP_IMAGE_SERVICE
        }/gear/slots/${getImageSource(slot.slot)}`}
      >
        {slot.selectedSet && isDragging ? (
          <GearImg size={size} ref={drag} src={getGearSlot(slot)} />
        ) : slot.selectedSet ? (
          <Popover
            placement={'top'}
            mouseEnterDelay={0.5}
            content={
              <GearCardContent
                setSelectionCount={setSelectionCount}
                gear={slot}
              />
            }
          >
            <GearImg size={size} ref={drag} src={getGearSlot(slot)} />
          </Popover>
        ) : (
          <div />
        )}
      </GearFrame>
    </StyledGearWrapper>
  )
}
