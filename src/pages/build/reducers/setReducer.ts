import { ISlot, IBuildAction, IBuildState, IStats } from '../BuildStateContext'
import { OptionProps, SelectValue } from 'antd/lib/select'
import { ISet } from '../../../components/GearSlot'

interface ISelectPayload {
  value: SelectValue
  indices: number[]
  type: 'selectedGlyphs' | 'selectedTraits'
}

export const setReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case 'SET_SETS':
      const { sets } = action.payload
      return {
        ...state,
        sets,
      }
    case 'SET_ITEMSET':
      const { selectedSet }: { selectedSet: ISet } = action.payload
      const { armorType } = state
      const swapArmor =
        (armorType === 'lightarmor' && selectedSet.has_light_armor === 0) ||
        (armorType === 'mediumarmor' && selectedSet.has_medium_armor === 0) ||
        (armorType === 'heavyarmor' && selectedSet.has_heavy_armor === 0)
      const hasWeapons = selectedSet.has_weapons
      const hasJewels = selectedSet.has_jewels
      const hasArmor =
        selectedSet.has_heavy_armor ||
        selectedSet.has_medium_armor ||
        selectedSet.has_light_armor

      return {
        ...state,
        selectedSet: selectedSet,
        armorType: swapArmor
          ? selectedSet.has_medium_armor === 1
            ? 'mediumarmor'
            : selectedSet.has_heavy_armor === 1
            ? 'heavyarmor'
            : 'lightarmor'
          : state.armorType,
        setTabKey: hasWeapons ? 'weapons' : hasArmor ? 'armor' : 'jewelry',
      }
    case 'SET_WEAPON_TYPE':
      const { weaponType } = action.payload
      return {
        ...state,
        weaponType,
        weapons: ['', ''],
        weaponStats: {
          selectedGlyphs: ['', ''],
          selectedTraits: ['', ''],
        },
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
      const { value, indices, type }: ISelectPayload = action.payload
      return {
        ...state,
        weaponStats: updateStats(type, value, state.weaponStats, indices),
      }
    }
    case 'SET_ARMOR_STATS': {
      const { value, indices, type }: ISelectPayload = action.payload
      return {
        ...state,
        armorStats: updateStats(type, value, state.armorStats, indices),
      }
    }
    case 'SET_JEWELRY_STATS': {
      const { value, indices, type }: ISelectPayload = action.payload
      return {
        ...state,
        jewelryStats: updateStats(type, value, state.jewelryStats, indices),
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
  value: SelectValue,
  stateStats: IStats,
  indices: number[]
) => {
  return {
    ...stateStats,
    [type]: stateStats[type].map((stat: any, i: number) =>
      indices.includes(i) ? value : stat
    ),
  }
}
