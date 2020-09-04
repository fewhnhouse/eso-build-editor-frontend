import {
  Slot,
  ISetSelection,
  IModification,
  ArmorType,
  SetTab,
} from './../BuildStateContext'
import { IBuildAction, IBuildState } from '../BuildStateContext'
import { ISet } from '../../../components/gear/GearSlot'

interface ISelectPayload {
  value: IModification
  slots: Slot[]
  type: 'selectedGlyphs' | 'selectedTraits'
  itemType: 'bigPieces' | 'smallPieces' | 'frontbar' | 'backbar'
}

export const setReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case 'SET_SETS':
      const { sets } = action.payload
      return {
        ...state,
        sets,
      }
    case 'SET_BUFF':
      const { buff } = action.payload
      return {
        ...state,
        buff,
      }
    case 'SET_MUNDUS':
      const { mundusStone } = action.payload
      return {
        ...state,
        mundusStone,
      }
    case 'SET_ITEMSET':
      const { selectedSet }: { selectedSet: ISet } = action.payload
      const { armorType } = state
      const swapArmor =
        (armorType === ArmorType.lightArmor &&
          selectedSet.has_light_armor === 0) ||
        (armorType === ArmorType.mediumArmor &&
          selectedSet.has_medium_armor === 0) ||
        (armorType === ArmorType.heavyArmor &&
          selectedSet.has_heavy_armor === 0)
      const hasWeapons = selectedSet.has_weapons
      const hasArmor =
        selectedSet.has_heavy_armor ||
        selectedSet.has_medium_armor ||
        selectedSet.has_light_armor
      return {
        ...state,
        selectedSet,
        armorType: swapArmor
          ? selectedSet.has_medium_armor === 1
            ? ArmorType.mediumArmor
            : selectedSet.has_heavy_armor === 1
            ? ArmorType.heavyArmor
            : ArmorType.lightArmor
          : state.armorType,
        setTabKey: hasWeapons
          ? SetTab.frontbar
          : hasArmor
          ? SetTab.armor
          : SetTab.jewelry,
      }
    case 'SET_WEAPON_TYPE':
      const { weaponType } = action.payload
      return {
        ...state,
        weaponType,
      }
    case 'SET_ARMOR_TYPE': {
      const { armorType } = action.payload
      return {
        ...state,
        armorType,
      }
    }
    case 'SET_WEAPONS': {
      const { value, index } = action.payload
      return {
        ...state,
        weapons: state.weapons.map((w, i) => (i === index ? value : w)),
      }
    }

    case 'SET_WEAPON_STATS': {
      const { value, slots, type, itemType }: ISelectPayload = action.payload
      if (itemType === 'frontbar') {
        return {
          ...state,
          frontbarSelection: updateStats(
            type,
            value,
            state.frontbarSelection,
            slots
          ),
        }
      } else {
        return {
          ...state,
          backbarSelection: updateStats(
            type,
            value,
            state.backbarSelection,
            slots
          ),
        }
      }
    }
    case 'SET_ARMOR_STATS': {
      const { value, slots, type, itemType }: ISelectPayload = action.payload
      if (itemType === 'bigPieces') {
        return {
          ...state,
          bigPieceSelection: updateStats(
            type,
            value,
            state.bigPieceSelection,
            slots
          ),
        }
      } else {
        return {
          ...state,
          smallPieceSelection: updateStats(
            type,
            value,
            state.smallPieceSelection,
            slots
          ),
        }
      }
    }
    case 'SET_JEWELRY_STATS': {
      const { value, slots, type }: ISelectPayload = action.payload
      return {
        ...state,
        jewelrySelection: updateStats(
          type,
          value,
          state.jewelrySelection,
          slots
        ),
      }
    }
    case 'SET_SET_TAB_KEY': {
      const { setTabKey } = action.payload
      return {
        ...state,
        setTabKey,
      }
    }
    default:
      return state
  }
}

const updateStats = (
  type: 'selectedGlyphs' | 'selectedTraits',
  value: IModification,
  stateStats: ISetSelection[],
  slots: Slot[]
) => {
  return stateStats.map((stat) =>
    slots.includes(stat.slot)
      ? {
          ...stat,
          glyph: type === 'selectedGlyphs' ? value : stat.glyph,
          trait: type === 'selectedTraits' ? value : stat.trait,
        }
      : stat
  )
}
