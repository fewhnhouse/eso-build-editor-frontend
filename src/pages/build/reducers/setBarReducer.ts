import { IBuildAction, IBuildState, Slot } from "../BuildStateContext";
import { ISet } from "../../../components/GearSlot";

export const setBarReducer = (state: IBuildState, action: IBuildAction) => {
  console.log(state);
  switch (action.type) {
    case "DROP_SET_ITEM":
      const {
        set,
        slot,
        group,
        icon,
        type
      }: {
        set: ISet;
        slot: Slot;
        group: string;
        icon: string;
        type: string;
      } = action.payload;
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
        if (type === Slot.mainHand && state.weaponType === "twohanded") {
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
                    trait: frontbar.trait
                  }
                : {
                    selectedSet: undefined,
                    slot: frontbar.slot,
                    type: undefined,
                    icon: undefined,
                    trait: undefined,
                    glyph: undefined
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
                  trait: frontbar.trait
                }
              : frontbar
          )
        };
      } else if (group === "backbar") {
        if (type === Slot.mainHand && state.weaponType === "twohanded") {
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
                    trait: backbar.trait
                  }
                : {
                    selectedSet: undefined,
                    slot: backbar.slot,
                    type: undefined,
                    icon: undefined,
                    trait: undefined,
                    glyph: undefined
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
                  trait: backbar.trait
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
