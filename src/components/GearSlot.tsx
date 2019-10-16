import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Popover, Typography, Button, Modal } from 'antd'
import { useDrag, useDrop } from 'react-dnd'
import {
  BuildContext,
  Slot,
  ISetSelection,
  ArmorType,
  WeaponType,
  OnehandedWeapon,
  TwohandedWeapon,
  SetType,
} from '../pages/build/BuildStateContext'
import { useMediaQuery } from 'react-responsive'
import { GearCardContent } from './GearCard'
import { specialWeaponSets } from '../pages/build/Sets/SetBar'
import Flex from './Flex'

const GearImg = styled.img`
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

const GearFrame = styled.div`
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

const TextPrimary = styled(Typography.Text)`
  width: ${props => props.theme.widths.mini};
  text-align: left;
`

const TextSecondary = styled(Typography.Text)`
  font-size: 12px;
  width: ${props => props.theme.widths.mini};
  text-align: left;
`

const InnerDisplay = styled(Flex)`
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
  margin: ${props => props.theme.margins.mini}
    ${props => props.theme.margins.small} ${props => props.theme.margins.mini}
    ${props => props.theme.margins.small};
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

const getImageSource = (
  slot: Slot | OnehandedWeapon | TwohandedWeapon | undefined
) => {
  switch (slot) {
    case Slot.mainHand:
      return 'mainhand.png'
    case Slot.offHand:
      return 'offhand.png'
    case Slot.legs:
      return 'legs.png'
    case Slot.head:
      return 'head.png'
    case Slot.shoulders:
      return 'shoulders.png'
    case Slot.waist:
      return 'waist.png'
    case Slot.hands:
      return 'hands.png'
    case Slot.feet:
      return 'feet.png'
    case Slot.chest:
      return 'chest.png'
    case Slot.ring:
      return 'ring.png'
    case Slot.ring1:
      return 'ring.png'
    case Slot.ring2:
      return 'ring.png'
    case Slot.neck:
      return 'neck.png'
    case OnehandedWeapon.dagger:
      return 'dagger.png'
    case OnehandedWeapon.shield:
      return 'shield.png'
    case OnehandedWeapon.axe:
      return 'axe.png'
    case OnehandedWeapon.mace:
      return 'hammer.png'
    case OnehandedWeapon.sword:
      return 'sword.png'
    case TwohandedWeapon.axe:
      return 'axe.png'
    case TwohandedWeapon.bow:
      return 'bow.png'
    case TwohandedWeapon.fireStaff:
      return 'staff.png'
    case TwohandedWeapon.iceStaff:
      return 'staff.png'
    case TwohandedWeapon.lightningStaff:
      return 'staff.png'
    case TwohandedWeapon.mace:
      return 'hammer.png'
    case TwohandedWeapon.restorationStaff:
      return 'staff.png'
    case TwohandedWeapon.sword:
      return 'sword.png'
    default:
      return ''
  }
}

const getGearSlot = (slot: ISetSelection) => {
  if (!slot.type) {
    return `${
      process.env.REACT_APP_IMAGE_SERVICE
    }/gear/jewelry/${getImageSource(slot.slot)}`
  }
  if (slot.selectedSet) {
    if (slot.selectedSet.type === SetType.undaunted) {
      return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/undaunted/${
        slot.selectedSet.slug
      }_${getImageSource(slot.slot)}`
    } else if (
      specialWeaponSets.find(
        set => slot.selectedSet && slot.selectedSet.name.includes(set.name)
      )
    ) {
      if (slot.selectedSet.name.includes('Perfected')) {
        slot.selectedSet.slug = slot.selectedSet.slug.split('-perfected-')[0]
      }
      return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/weaponSets/${
        slot.selectedSet.slug
      }_${getImageSource(slot.weaponType)}`
    }
  }
  if (slot.type === WeaponType.onehanded) {
    return `${
      process.env.REACT_APP_IMAGE_SERVICE
    }/gear/onehanded/${getImageSource(slot.weaponType)}`
  } else if (slot.type === WeaponType.twohanded) {
    return `${
      process.env.REACT_APP_IMAGE_SERVICE
    }/gear/twohanded/${getImageSource(slot.weaponType)}`
  } else if (slot.type === ArmorType.lightArmor) {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/light/${getImageSource(
      slot.slot
    )}`
  } else if (slot.type === ArmorType.mediumArmor) {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/medium/${getImageSource(
      slot.slot
    )}`
  } else if (slot.type === ArmorType.heavyArmor) {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/heavy/${getImageSource(
      slot.slot
    )}`
  } else {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/heavy/${getImageSource(
      slot.slot
    )}`
  }
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
        <TextSecondary ellipsis type='secondary'>
          {getWeaponType(slot.weaponType)}
        </TextSecondary>
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

const DisplayCard = styled.div`
  padding: ${props => props.theme.paddings.mini};
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: ${props => props.theme.widths.small};
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: ${props => props.theme.borderRadius};
  margin: ${props => props.theme.margins.small};
  position: relative;
`

export const getItemType = (
  type: ArmorType | WeaponType | 'jewelry' | undefined
) => {
  switch (type) {
    case ArmorType.heavyArmor:
      return 'Heavy'
    case ArmorType.mediumArmor:
      return 'Medium'
    case ArmorType.lightArmor:
      return 'Light'
    case WeaponType.onehanded:
      return '1H'
    case WeaponType.twohanded:
      return '2H'
    default:
      return ''
  }
}

const InnerSpan = styled.span`
  color: ${(props: { color: string }) => props.color};
`

export const getWeaponType = (
  weaponType: OnehandedWeapon | TwohandedWeapon | undefined
) => {
  switch (weaponType) {
    case OnehandedWeapon.axe:
      return 'Axe'
    case TwohandedWeapon.axe:
      return 'Axe'
    case OnehandedWeapon.mace:
      return 'Mace'
    case TwohandedWeapon.mace:
      return 'Mace'
    case OnehandedWeapon.sword:
      return 'Sword'
    case TwohandedWeapon.sword:
      return 'Sword'
    case OnehandedWeapon.dagger:
      return 'Dagger'
    case OnehandedWeapon.shield:
      return 'Shield'
    case TwohandedWeapon.bow:
      return 'Bow'
    case TwohandedWeapon.fireStaff:
      return 'Fire Staff'
    case TwohandedWeapon.iceStaff:
      return 'Ice Staff'
    case TwohandedWeapon.lightningStaff:
      return 'Lightning Staff'
    case TwohandedWeapon.restorationStaff:
      return 'Restoration Staff'

    default:
      return ''
  }
}

const getTypeColor = (type: ArmorType | WeaponType | 'jewelry' | undefined) => {
  if (type === ArmorType.lightArmor) {
    return '#2980b9'
  } else if (type === ArmorType.mediumArmor) {
    return '#27ae60'
  } else if (type === ArmorType.heavyArmor) {
    return '#c0392b'
  } else {
    return 'rgba(0, 0, 0, 0.65)'
  }
}

interface IContentProps {
  slot: ISetSelection
  setSelectionCount: number
}
const MobileContent = ({ slot, setSelectionCount }: IContentProps) => {
  const [visible, setVisible] = useState(false)
  const toggleModal = () => {
    setVisible(visible => !visible)
  }
  return (
    <GearFrame
      onClick={toggleModal}
      size={'small'}
      hasIcon={slot.icon !== undefined}
      backgroundSource={getImageSource(slot.slot)}
    >
      <Modal
        bodyStyle={{ display: 'flex', justifyContent: 'center', margin: 0 }}
        visible={visible}
        footer={null}
        title='Set Details'
      >
        <GearCardContent setSelectionCount={setSelectionCount} gear={slot} />
      </Modal>
      {slot.selectedSet !== null && slot.selectedSet !== undefined ? (
        <GearImg size={'small'} src={getGearSlot(slot)} />
      ) : null}
    </GearFrame>
  )
}

const DesktopContent = ({ slot, setSelectionCount }: IContentProps) => {
  return (
    <Popover
      mouseEnterDelay={0.5}
      placement='left'
      content={
        <GearCardContent setSelectionCount={setSelectionCount} gear={slot} />
      }
    >
      <GearFrame
        size={'small'}
        hasIcon={slot.icon !== undefined}
        backgroundSource={getImageSource(slot.slot)}
      >
        {slot.selectedSet !== null && slot.selectedSet !== undefined ? (
          <GearImg size={'small'} src={getGearSlot(slot)} />
        ) : null}
      </GearFrame>
    </Popover>
  )
}
export const DisplaySlot = ({
  slot,
  setSelectionCount,
  size,
}: {
  slot: ISetSelection
  setSelectionCount: number
  size: 'normal' | 'small'
}) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <DisplayCard>
      {isMobile ? (
        <MobileContent slot={slot} setSelectionCount={setSelectionCount} />
      ) : (
        <DesktopContent slot={slot} setSelectionCount={setSelectionCount} />
      )}
      <InnerDisplay
        direction='column'
        justify='space-between'
        align='flex-start'
      >
        <TextPrimary ellipsis strong>
          {slot.selectedSet ? slot.selectedSet.name : 'Set not selected.'}
        </TextPrimary>
        <TextPrimary ellipsis strong>
          <InnerSpan color={getTypeColor(slot.type)}>
            {getItemType(slot.type)}
          </InnerSpan>
          {slot.weaponType ? '-' : ''} {getWeaponType(slot.weaponType)}
        </TextPrimary>

        <TextSecondary ellipsis type='secondary'>
          {slot.glyph ? slot.glyph.type : 'Glyph not selected.'}
        </TextSecondary>
        <TextSecondary ellipsis type='secondary'>
          {slot.trait ? slot.trait.type : 'Trait not selected.'}
        </TextSecondary>
      </InnerDisplay>
    </DisplayCard>
  )
}
