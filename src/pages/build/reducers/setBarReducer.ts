import { ISkill } from "../../../components/SkillSlot";
import { ISlot, IBuildAction, IBuildState } from "../BuildStateContext";
import { selectIcon, actualNeck, actualRing } from "../../../assets/gear";

export const setBarReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "DROP_SET_ITEM":
      const {
        id,
        slot,
        group
      }: { id: string; slot: string; group: string } = action.payload;
      const set = state.sets.find(set => set.id === parseInt(id, 10));
      if (group === "jewelry") {
        return {
          ...state,
          jewelrySelection: state.jewelrySelection.map(jewelry =>
            jewelry.slot === slot
              ? {
                  set,
                  slot,
                  icon: slot === "neck" ? actualNeck : actualRing
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
                  icon:
                  slot === "mainHand" || slot === "twoHand"
                  ? state.weapons[0]
                        ? selectIcon(
                            state.weapons[0]
                              .toString()
                              .split(
                                state.weaponType === "twohanded"
                                  ? "two-"
                                  : "main-"
                              )[1]
                          )
                        : undefined
                      : state.weapons[1]
                      ? selectIcon(state.weapons[1].toString().split("off-")[1])
                      : undefined
                }
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
                  icon:
                    slot === "mainHand" || slot === "twoHand"
                      ? state.weapons[0]
                        ? selectIcon(
                            state.weapons[0]
                              .toString()
                              .split(
                                state.weaponType === "twohanded"
                                  ? "two-"
                                  : "main-"
                              )[1]
                          )
                        : undefined
                      : state.weapons[1]
                      ? selectIcon(state.weapons[1].toString().split("off-")[1])
                      : undefined
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
                  set,
                  slot,
                  icon: selectIcon(
                    state.armorType.split("armor")[0] +
                      slot.charAt(0).toUpperCase() +
                      slot.slice(1)
                  )
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
                  icon: selectIcon(
                    state.armorType.split("armor")[0] +
                      slot.charAt(0).toUpperCase() +
                      slot.slice(1)
                  )
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
