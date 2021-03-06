import {
  IBuildAction,
  IBuildState,
  Slot,
  WeaponType,
  OnehandedWeapon,
  TwohandedWeapon,
  SetTab,
  ISetSelection,
} from '../BuildStateContext'
import { ISet } from '../../../components/gear/GearSlot'

const getActualSlot = (slot: Slot, barSelection: ISetSelection[]) => {
  if (slot === Slot.eitherHand) {
    if (barSelection[0].selectedSet && barSelection[1].selectedSet) {
      return Slot.mainHand
    } else if (barSelection[0].type === WeaponType.twohanded) {
      return Slot.mainHand
    } else if (barSelection[0].selectedSet && !barSelection[1].selectedSet) {
      return Slot.offHand
    } else {
      return Slot.mainHand
    }
  } else {
    return slot
  }
}
export const setBarReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case 'DROP_SET_ITEM': {
      const {
        set,
        slot,
        group,
        icon,
        weaponType,
      }: {
        set: ISet
        slot: Slot
        group: string
        icon: string
        weaponType: OnehandedWeapon | TwohandedWeapon | undefined
      } = action.payload
      const { setTabKey, frontbarSelection, backbarSelection } = state!
      if (setTabKey === SetTab.jewelry) {
        return {
          ...state,
          jewelrySelection: state.jewelrySelection.map((jewelry) =>
            jewelry.slot === slot
              ? {
                  selectedSet: set,
                  slot,
                  icon,
                  glyph: jewelry.glyph,
                  trait: jewelry.trait,
                  id: jewelry.id,
                }
              : jewelry
          ),
        }
      } else if (setTabKey === SetTab.frontbar) {
        const actualSlot = getActualSlot(slot, frontbarSelection)

        if (state.weaponType === WeaponType.twohanded) {
          return {
            ...state,
            frontbarSelection: state.frontbarSelection.map((frontbar) =>
              frontbar.slot === actualSlot
                ? {
                    selectedSet: set,
                    slot: actualSlot,
                    icon,
                    type: state.weaponType,
                    glyph: frontbar.glyph,
                    trait: frontbar.trait,
                    id: frontbar.id,
                    weaponType,
                  }
                : {
                    selectedSet: undefined,
                    slot: frontbar.slot,
                    type: undefined,
                    icon: undefined,
                    trait: undefined,
                    glyph: undefined,
                    weaponType: undefined,
                    id: undefined,
                  }
            ),
          }
        }
        return {
          ...state,
          frontbarSelection: state.frontbarSelection.map((frontbar) =>
            frontbar.slot === actualSlot
              ? {
                  selectedSet: set,
                  slot: actualSlot,
                  icon,
                  type: state.weaponType,
                  glyph: frontbar.glyph,
                  trait: frontbar.trait,
                  weaponType,
                  id: frontbar.id,
                }
              : frontbar
          ),
        }
      } else if (setTabKey === SetTab.backbar) {
        const actualSlot = getActualSlot(slot, backbarSelection)
        if (state.weaponType === WeaponType.twohanded) {
          return {
            ...state,
            backbarSelection: state.backbarSelection.map((backbar) =>
              backbar.slot === actualSlot
                ? {
                    selectedSet: set,
                    slot: actualSlot,
                    icon,
                    type: state.weaponType,
                    glyph: backbar.glyph,
                    trait: backbar.trait,
                    weaponType,
                    id: backbar.id,
                  }
                : {
                    selectedSet: undefined,
                    slot: backbar.slot,
                    type: undefined,
                    icon: undefined,
                    trait: undefined,
                    glyph: undefined,
                    weaponType: undefined,
                    id: undefined,
                  }
            ),
          }
        }
        return {
          ...state,
          backbarSelection: state.backbarSelection.map((backbar) =>
            backbar.slot === actualSlot
              ? {
                  selectedSet: set,
                  slot: actualSlot,
                  icon,
                  type: state.weaponType,
                  glyph: backbar.glyph,
                  trait: backbar.trait,
                  weaponType,
                  id: backbar.id,
                }
              : backbar.type === WeaponType.twohanded
              ? {
                  selectedSet: undefined,
                  slot: backbar.slot,
                  type: undefined,
                  icon: undefined,
                  trait: undefined,
                  glyph: undefined,
                  weaponType: undefined,
                  id: undefined,
                }
              : backbar
          ),
        }
      } else if (setTabKey === SetTab.armor && group === 'bigpieces') {
        return {
          ...state,
          bigPieceSelection: state.bigPieceSelection.map((bigPiece) =>
            bigPiece.slot === slot
              ? {
                  selectedSet: set,
                  slot,
                  icon,
                  type: state.armorType,
                  glyph: bigPiece.glyph,
                  trait: bigPiece.trait,
                  id: bigPiece.id,
                }
              : bigPiece
          ),
        }
      } else if (setTabKey === SetTab.armor && group === 'smallpieces') {
        return {
          ...state,
          smallPieceSelection: state.smallPieceSelection.map((smallPiece) =>
            smallPiece.slot === slot
              ? {
                  selectedSet: set,
                  slot,
                  icon,
                  type: state.armorType,
                  glyph: smallPiece.glyph,
                  trait: smallPiece.trait,
                  id: smallPiece.id,
                }
              : smallPiece
          ),
        }
      }
      return {
        ...state,
      }
    }

    default:
      return state
  }
}
