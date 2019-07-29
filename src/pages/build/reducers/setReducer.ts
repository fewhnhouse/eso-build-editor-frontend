import { ISlot, IBuildAction, IBuildState, IStats } from "../BuildStateContext";
import { OptionProps, SelectValue } from "antd/lib/select";

interface ISelectPayload {
  value: SelectValue;
  index: number;
  type: "selectedGlyphs" | "selectedTraits";
}
export const setReducer = (state: IBuildState, action: IBuildAction) => {
  console.log(action, state);
  switch (action.type) {
    case "SET_ITEMSET":
      const { selectedSet } = action.payload;
      return {
        ...state,
        selectedSet: selectedSet
      };
    case "SET_WEAPON_TYPE":
      const { weaponType } = action.payload;
      return {
        ...state,
        weaponType,
        weapons: ["", ""],
        weaponStats: {
          selectedGlyphs: ["", ""],
          selectedTraits: ["", ""]
        }
      };
    case "SET_ARMOR_TYPE": {
      const { armorType } = action.payload;
      return {
        ...state,
        armorType
      };
    }
    case "SET_WEAPONS": {
      const { value, index } = action.payload;
      return {
        ...state,
        weapons: state.weapons.map((w, i) => (i === index ? value : w))
      };
    }

    case "SET_WEAPON_STATS": {
      const { value, index, type }: ISelectPayload = action.payload;
      return {
        ...state,
        weaponStats: updateStats(type, value, state.weaponStats, index)
      };
    }
    case "SET_ARMOR_STATS": {
      const { value, index, type }: ISelectPayload = action.payload;
      return {
        ...state,
        armorStats: updateStats(type, value, state.armorStats, index)
      };
    }
    case "SET_JEWELRY_STATS": {
      const { value, index, type }: ISelectPayload = action.payload;
      return {
        ...state,
        jewelryStats: updateStats(type, value, state.jewelryStats, index)
      };
    }
    default:
      return state;
  }
};

const updateStats = (
  type: "selectedGlyphs" | "selectedTraits",
  value: SelectValue,
  stateStats: IStats,
  index: number
) => {
  return {
    ...stateStats,
    [type]: stateStats[type].map((stat: any, i: number) =>
      i === index ? value : stat
    )
  };
};
