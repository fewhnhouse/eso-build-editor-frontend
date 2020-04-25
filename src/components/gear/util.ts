import {
  OnehandedWeapon,
  TwohandedWeapon,
  ArmorType,
  Slot,
  WeaponType,
  ISetSelection,
  SetType,
} from '../../pages/build/BuildStateContext'
import { specialWeaponSets } from '../../pages/build/Sets/selectionDetails'
import { ISet } from './GearSlot'

export const getImageSource = (
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

export const getTypeColor = (
  type: ArmorType | WeaponType | 'jewelry' | undefined
) => {
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

export const getGearSlot = (slot: ISetSelection) => {
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

export const totalBonus = (set: ISet) => {
  if (set.bonus_item_5 !== null && set.bonus_item_4 !== null) {
    // 5 Piece Set
    return [2, 3, 4, 5]
  } else if (set.bonus_item_3 !== null) {
    // 3 Piece Set
    return [2, 3]
  } else if (set.bonus_item_1 !== null && set.bonus_item_2 !== null) {
    // Monster Set
    return [1, 2]
  } else if (set.bonus_item_1 !== null && set.bonus_item_2 === null) {
    //Mythic
    return [1]
  } else {
    // Arena Weapon
    return [2]
  }
}
