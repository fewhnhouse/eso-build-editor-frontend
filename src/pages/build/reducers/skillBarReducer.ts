import { IBuildState } from "./../BuildStateContext";
import { ABILITY_BAR_TWO } from "../Skills/AbilityBar";
import { ISkill } from "../../../components/SkillSlot";
import { ISlot, IBuildAction } from "../BuildStateContext";
import { ABILITY_BAR_ONE } from "../Skills/AbilityBar";

export const skillBarReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "DROP_ULTIMATE": {
      const { skill, barIndex } = action.payload;
      console.log(skill, barIndex);
      if (barIndex === 0) {
        return {
          ...state,
          ultimateOne: skill
        };
      } else if (barIndex === 1) {
        return {
          ...state,
          ultimateTwo: skill
        };
      }
    }
    case "REMOVE_ULTIMATE": {
      const { barIndex } = action.payload;

      if (barIndex === 0) {
        return {
          ...state,
          ultimateOne: undefined
        };
      } else if (barIndex === 1) {
        return {
          ...state,
          ultimateTwo: undefined
        };
      }
    }
    case "SWAP_ULTIMATE": {
      const { barIndex, sourceSkill, destinationSkill } = action.payload;
      if (barIndex === 0) {
        return {
          ...state,
          ultimateOne: destinationSkill,
          ultimateTwo: sourceSkill
        };
      } else {
        return {
          ...state,
          ultimateOne: sourceSkill,
          ultimateTwo: destinationSkill
        };
      }
    }
    case "REMOVE_ABILITY": {
      const { skill, barIndex } = action.payload;

      if (barIndex === 0) {
        return {
          ...state,
          newBarOne: [...state.newBarOne].map(slot =>
            slot.skill && slot.skill.id === skill.id
              ? { skill: undefined, index: slot.index }
              : slot
          )
        };
      } else {
        return {
          ...state,
          newBarTwo: [...state.newBarTwo].map(slot =>
            slot.skill && slot.skill.id === skill.id
              ? { skill: undefined, index: slot.index }
              : slot
          )
        };
      }
    }
    case "DROP_ABILITY": {
      const { barIndex, destinationIndex, skill } = action.payload;
      if (
        (barIndex === 0 &&
          state.newBarOne.find(
            slot => slot.skill && slot.skill.id === skill.id
          )) ||
        (barIndex === 1 &&
          state.newBarTwo.find(
            slot => slot.skill && slot.skill.id === skill.id
          ))
      ) {
        return { ...state };
      }
      if (barIndex === 0) {
        return {
          ...state,
          newBarOne: state.newBarOne.map(slot =>
            slot.index === destinationIndex
              ? { index: slot.index, skill }
              : slot
          )
        };
      } else {
        return {
          ...state,
          newBarTwo: state.newBarTwo.map(slot =>
            slot.index === destinationIndex
              ? { index: slot.index, skill }
              : slot
          )
        };
      }
    }

    case "SWAP_ABILITY_SAME": {
      const {
        barIndex,
        sourceIndex,
        destinationIndex,
        sourceSkill,
        destinationSkill
      } = action.payload;
      return barIndex === 0
        ? {
            ...state,
            newBarOne: state.newBarOne.map(slot =>
              slot.index === sourceIndex
                ? { index: slot.index, skill: destinationSkill }
                : slot.index === destinationIndex
                ? { index: slot.index, skill: sourceSkill }
                : slot
            )
          }
        : {
            ...state,
            newBarTwo: state.newBarTwo.map(slot =>
              slot.index === sourceIndex
                ? { index: slot.index, skill: destinationSkill }
                : slot.index === destinationIndex
                ? { index: slot.index, skill: sourceSkill }
                : slot
            )
          };
    }

    case "SWAP_ABILITY_DIFFERENT": {
      const {
        sourceIndex,
        sourceBarIndex,
        sourceSkill,
        destinationIndex,
        destinationBarIndex,
        destinationSkill
      } = action.payload;
      const hasDestinationSkill =
        state.newBarOne.find(
          slot =>
            slot.skill &&
            (sourceBarIndex === 1
              ? slot.skill.id === sourceSkill.id
              : slot.skill.id === destinationSkill && destinationSkill.id)
        ) ||
        state.newBarTwo.find(
          slot =>
            slot.skill &&
            (sourceBarIndex === 1
              ? slot.skill.id === destinationSkill && destinationSkill.id
              : slot.skill.id === sourceSkill.id)
        );
      if (hasDestinationSkill) return { ...state };
      return {
        ...state,
        newBarOne: state.newBarOne.map(slot => {
          if (sourceBarIndex === 0) {
            return slot.index === sourceIndex
              ? { index: slot.index, skill: destinationSkill }
              : slot;
          } else {
            return slot.index === destinationIndex
              ? { index: slot.index, skill: sourceSkill }
              : slot;
          }
        }),
        newBarTwo: state.newBarTwo.map(slot => {
          if (sourceBarIndex === 1) {
            return slot.index === sourceIndex
              ? { index: slot.index, skill: destinationSkill }
              : slot;
          } else {
            return slot.index === destinationIndex
              ? { index: slot.index, skill: sourceSkill }
              : slot;
          }
        })
      };
    }

    default:
      return state;
  }
};
