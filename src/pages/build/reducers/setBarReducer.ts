import { IBuildAction, IBuildState } from "../BuildStateContext";
import { ISet } from "../../../components/GearSlot";

export const setBarReducer = (state: IBuildState, action: IBuildAction) => {
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
        slot: string;
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
                  set,
                  slot,
                  icon
                }
              : jewelry
          )
        };
      } else if (group === "frontbar") {
        return {
          ...state,
          frontbarSelection: state.frontbarSelection.map(frontbar =>
            frontbar.slot === slot
              ? {
                  set,
                  slot,
                  icon
                }
              : type === "mainHand" && frontbar.slot === "offHand"
              ? { set: undefined, slot: frontbar.slot, icon: undefined }
              : frontbar
          )
        };
      } else if (group === "backbar") {
        return {
          ...state,
          backbarSelection: state.backbarSelection.map(backbar =>
            backbar.slot === slot
              ? {
                  set,
                  slot,
                  icon
                }
              : type === "mainHand" && backbar.slot === "offHand"
              ? { set: undefined, slot: backbar.slot, icon: undefined }
              : backbar
          )
        };
      } else if (group === "bigpieces") {
        return {
          ...state,
          bigPieceSelection: state.bigPieceSelection.map(bigPiece =>
            bigPiece.slot === slot
              ? {
                  set,
                  slot,
                  icon
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
                  set,
                  slot,
                  icon
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
