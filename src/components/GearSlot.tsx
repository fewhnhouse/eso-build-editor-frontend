import React, { useContext } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';

import { useDrag, useDrop } from 'react-dnd';
import {
  BuildContext,
  Slot,
  ISetSelection,
  ArmorType,
  WeaponType,
  OnehandedWeapon,
  TwohandedWeapon,
} from '../pages/build/BuildStateContext';
import { GearCardContent } from './GearCard';

const GearImg = styled.img`
  width: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '64px' : '48px'};
  height: ${(props: { size: 'normal' | 'small' }) =>
    props.size === 'normal' ? '64px' : '48px'};
`;

interface IGearFrameProps {
  hasIcon: boolean;
  canDrop?: boolean;
  backgroundSource: string;
  size: 'normal' | 'small';
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
  border-radius: 4px;
  background-image: url(${(props: IGearFrameProps) =>
    props.hasIcon ? '' : props.backgroundSource});
  background-repeat: no-repeat;
`;

export interface ISet {
  id: string;
  setId: number;
  name: string;
  location: string;
  type: string;
  slug: string;
  bonus_item_1: string | null;
  bonus_item_2: string | null;
  bonus_item_3: string | null;
  bonus_item_4: string | null;
  bonus_item_5: string | null;
  has_jewels: number;
  has_weapons: number;
  has_heavy_armor: number;
  has_light_armor: number;
  has_medium_armor: number;
  traits_needed: number | null;
  pts: number;
  eso_id: null | number;
  [key: string]: string | null | number;
}

const getImageSource = (
  slot: Slot | OnehandedWeapon | TwohandedWeapon | undefined
) => {
  switch (slot) {
    case Slot.mainHand:
      return 'mainhand.png';
    case Slot.offHand:
      return 'offhand.png';
    case Slot.legs:
      return 'legs.png';
    case Slot.head:
      return 'head.png';
    case Slot.shoulders:
      return 'shoulders.png';
    case Slot.waist:
      return 'waist.png';
    case Slot.hands:
      return 'hands.png';
    case Slot.feet:
      return 'feet.png';
    case Slot.chest:
      return 'chest.png';
    case Slot.ring:
      return 'ring.png';
    case Slot.ring1:
      return 'ring.png';
    case Slot.ring2:
      return 'ring.png';
    case Slot.neck:
      return 'neck.png';
    case OnehandedWeapon.dagger:
      return 'dagger.png';
    case OnehandedWeapon.shield:
      return 'shield.png';
    case OnehandedWeapon.axe:
      return 'axe.png';
    case OnehandedWeapon.mace:
      return 'hammer.png';
    case OnehandedWeapon.sword:
      return 'sword.png';
    case TwohandedWeapon.axe:
      return 'axe.png';
    case TwohandedWeapon.bow:
      return 'bow.png';
    case TwohandedWeapon.fireStaff:
      return 'staff.png';
    case TwohandedWeapon.iceStaff:
      return 'staff.png';
    case TwohandedWeapon.lightningStaff:
      return 'staff.png';
    case TwohandedWeapon.mace:
      return 'hammer.png';
    case TwohandedWeapon.restorationStaff:
      return 'staff.png';
    case TwohandedWeapon.sword:
      return 'sword.png';
    default:
      return '';
  }
};

const getGearSlot = (slot: ISetSelection) => {
  if (!slot.type) {
    return `${
      process.env.REACT_APP_IMAGE_SERVICE
    }/gear/jewelry/${getImageSource(slot.slot)}`;
  }
  if (slot.type === WeaponType.onehanded) {
    return `${
      process.env.REACT_APP_IMAGE_SERVICE
    }/gear/onehanded/${getImageSource(slot.weaponType)}`;
  } else if (slot.type === WeaponType.twohanded) {
    return `${
      process.env.REACT_APP_IMAGE_SERVICE
    }/gear/twohanded/${getImageSource(slot.weaponType)}`;
  } else if (slot.type === ArmorType.lightArmor) {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/light/${getImageSource(
      slot.slot
    )}`;
  } else if (slot.type === ArmorType.mediumArmor) {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/medium/${getImageSource(
      slot.slot
    )}`;
  } else if (slot.type === ArmorType.heavyArmor) {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/heavy/${getImageSource(
      slot.slot
    )}`;
  } else {
    return `${process.env.REACT_APP_IMAGE_SERVICE}/gear/heavy/${getImageSource(
      slot.slot
    )}`;
  }
};

export interface IGearSlotProps {
  slot: ISetSelection;
  droppable?: boolean;
  group: string;
  size?: 'normal' | 'small';
}

export interface IDragProps {
  slot: ISetSelection;
  group: string;
}

export default ({
  slot,
  droppable,
  group,
  size = 'normal',
}: IGearSlotProps) => {
  const [, dispatch] = useContext(BuildContext);

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
  });

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
          type: item.type,
          weaponType: item.weaponType,
          group,
        },
      });
    },
    collect: monitor => ({
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div style={{ margin: '5px 10px 5px 10px' }}>
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
            content={<GearCardContent gear={slot} />}
          >
            <GearImg size={size} ref={drag} src={getGearSlot(slot)} />
          </Popover>
        ) : (
          <div />
        )}
      </GearFrame>
    </div>
  );
};

export const DisplaySlot = ({
  slot,
  size,
}: {
  slot: ISetSelection;
  size: 'normal' | 'small';
}) => {
  return (
    <GearFrame
      size={size}
      hasIcon={slot.icon !== undefined}
      backgroundSource={getImageSource(slot.slot)}
    >
      {slot.selectedSet !== null && slot.selectedSet !== undefined ? (
        <Popover
          mouseEnterDelay={0.5}
          placement="left"
          content={<GearCardContent gear={slot} />}
        >
          <GearImg size={size} src={getGearSlot(slot)} />
        </Popover>
      ) : null}
    </GearFrame>
  );
};
