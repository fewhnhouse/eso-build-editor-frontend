import { IBuildAction, IBuildState, Slot, SlotType, WeaponType, OnehandedWeapon, TwohandedWeapon } from "../BuildStateContext";
import { ISet } from "../../../components/GearSlot";

export const setBarReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "DROP_SET_ITEM":
      const {
        set,
        slot,
        group,
        icon,
        type,
        weaponType
      }: {
        set: ISet;
        slot: Slot;
        group: string;
        icon: string;
        type: SlotType;
        weaponType: OnehandedWeapon | TwohandedWeapon | undefined
      } = action.payload;
      console.log(weaponType)
      if (group === "jewelry") {
        return {
          ...state,
          jewelrySelection: state.jewelrySelection.map(jewelry =>
            jewelry.slot === slot
              ? {
                selectedSet: set,
                slot,
                icon,
                glyph: jewelry.glyph,
                trait: jewelry.trait
              }
              : jewelry
          )
        };
      } else if (group === "frontbar") {
        if (state.weaponType === WeaponType.twohanded) {
          return {
            ...state,
            frontbarSelection: state.frontbarSelection.map(frontbar =>
              frontbar.slot === slot
                ? {
                  selectedSet: set,
                  slot,
                  icon,
                  type: state.weaponType,
                  glyph: frontbar.glyph,
                  trait: frontbar.trait,
                  weaponType
                }
                : {
                  selectedSet: undefined,
                  slot: frontbar.slot,
                  type: undefined,
                  icon: undefined,
                  trait: undefined,
                  glyph: undefined,
                  weaponType: undefined
                }
            )
          };
        }
        return {
          ...state,
          frontbarSelection: state.frontbarSelection.map(frontbar =>
            frontbar.slot === slot
              ? {
                selectedSet: set,
                slot,
                icon,
                type: state.weaponType,
                glyph: frontbar.glyph,
                trait: frontbar.trait,
                weaponType
              }
              : frontbar
          )
        };
      } else if (group === "backbar") {
        if (state.weaponType === WeaponType.twohanded) {
          return {
            ...state,
            backbarSelection: state.backbarSelection.map(backbar =>
              backbar.slot === slot
                ? {
                  selectedSet: set,
                  slot,
                  icon,
                  type: state.weaponType,
                  glyph: backbar.glyph,
                  trait: backbar.trait,
                  weaponType
                }
                : {
                  selectedSet: undefined,
                  slot: backbar.slot,
                  type: undefined,
                  icon: undefined,
                  trait: undefined,
                  glyph: undefined,
                  weaponType: undefined
                }
            )
          };
        }
        return {
          ...state,
          backbarSelection: state.backbarSelection.map(backbar =>
            backbar.slot === slot
              ? {
                selectedSet: set,
                slot,
                icon,
                type: state.weaponType,
                glyph: backbar.glyph,
                trait: backbar.trait,
                weaponType
              }
              : backbar
          )
        };
      } else if (group === "bigpieces") {
        return {
          ...state,
          bigPieceSelection: state.bigPieceSelection.map(bigPiece =>
            bigPiece.slot === slot
              ? {
                selectedSet: set,
                slot,
                icon,
                type: state.armorType,
                glyph: bigPiece.glyph,
                trait: bigPiece.trait
              }
              : bigPiece
          )
        };
      } else if (group === "smallpieces") {
        return {
          ...state,
          smallPieceSelection: state.smallPieceSelection.map(smallPiece =>
            smallPiece.slot === slot
              ? {
                selectedSet: set,
                slot,
                icon,
                type: state.armorType,
                glyph: smallPiece.glyph,
                trait: smallPiece.trait
              }
              : smallPiece
          )
        };
      }
      return {
        ...state
      };
    default:
      return state;
  }
};
