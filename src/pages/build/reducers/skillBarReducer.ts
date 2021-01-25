import { IBuildState } from './../BuildStateContext'
import { IBuildAction } from '../BuildStateContext'

export const skillBarReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case 'DROP_ULTIMATE': {
      const { skill, barIndex } = action.payload
      if (barIndex === 0) {
        return {
          ...state,
          ultimateOne: skill,
        }
      } else if (barIndex === 1) {
        return {
          ...state,
          ultimateTwo: skill,
        }
      } else {
        return {
          ...state,
        }
      }
    }
    case 'REMOVE_ULTIMATE': {
      const { barIndex } = action.payload
      if (barIndex === 0) {
        return {
          ...state,
          ultimateOne: undefined,
        }
      } else if (barIndex === 1) {
        return {
          ...state,
          ultimateTwo: undefined,
        }
      } else {
        return { ...state }
      }
    }
    case 'SWAP_ULTIMATE': {
      const { barIndex, sourceSkill, destinationSkill } = action.payload
      if (barIndex === 0) {
        return {
          ...state,
          ultimateOne: destinationSkill,
          ultimateTwo: sourceSkill,
        }
      } else {
        return {
          ...state,
          ultimateOne: sourceSkill,
          ultimateTwo: destinationSkill,
        }
      }
    }
    case 'REMOVE_ABILITY': {
      const { skill, barIndex } = action.payload

      if (barIndex === 0) {
        return {
          ...state,
          newBarOne: [...state.newBarOne].map((slot) =>
            slot.skill && slot.skill.skillId === skill.skillId
              ? { skill: undefined, id: undefined, index: slot.index }
              : slot
          ),
        }
      } else {
        return {
          ...state,
          newBarTwo: [...state.newBarTwo].map((slot) =>
            slot.skill && slot.skill.skillId === skill.skillId
              ? { skill: undefined, id: undefined, index: slot.index }
              : slot
          ),
        }
      }
    }
    case 'DROP_ABILITY': {
      const { barIndex, destinationIndex, skill } = action.payload
      if (
        (barIndex === 0 &&
          state.newBarOne.find(
            (slot) => slot.skill && slot.skill.skillId === skill.skillId
          )) ||
        (barIndex === 1 &&
          state.newBarTwo.find(
            (slot) => slot.skill && slot.skill.skillId === skill.skillId
          ))
      ) {
        return { ...state }
      }
      if (barIndex === 0) {
        return {
          ...state,
          newBarOne: state.newBarOne.map((slot) =>
            slot.index === destinationIndex
              ? { index: slot.index, id: slot.id, skill }
              : slot
          ),
        }
      } else {
        return {
          ...state,
          newBarTwo: state.newBarTwo.map((slot) =>
            slot.index === destinationIndex
              ? { index: slot.index, id: slot.id, skill }
              : slot
          ),
        }
      }
    }

    case 'SWAP_ABILITY_SAME': {
      const {
        barIndex,
        sourceIndex,
        destinationIndex,
        sourceSkill,
        destinationSkill,
      } = action.payload
      return barIndex === 0
        ? {
            ...state,
            newBarOne: state.newBarOne.map((slot) =>
              slot.index === sourceIndex
                ? { index: slot.index, id: slot.id, skill: destinationSkill }
                : slot.index === destinationIndex
                ? { index: slot.index, id: slot.id, skill: sourceSkill }
                : slot
            ),
          }
        : {
            ...state,
            newBarTwo: state.newBarTwo.map((slot) =>
              slot.index === sourceIndex
                ? { index: slot.index, id: slot.id, skill: destinationSkill }
                : slot.index === destinationIndex
                ? { index: slot.index, id: slot.id, skill: sourceSkill }
                : slot
            ),
          }
    }

    case 'SWAP_ABILITY_DIFFERENT': {
      const {
        sourceIndex,
        sourceBarIndex,
        sourceSkill,
        destinationIndex,
        destinationSkill,
      } = action.payload
      const hasDestinationSkill =
        state.newBarOne.find(
          (slot) =>
            slot.skill &&
            (sourceBarIndex === 1
              ? slot.skill.skillId === sourceSkill.skillId
              : slot.skill.skillId === destinationSkill &&
                destinationSkill.skillId)
        ) ||
        state.newBarTwo.find(
          (slot) =>
            slot.skill &&
            (sourceBarIndex === 1
              ? slot.skill.skillId === destinationSkill &&
                destinationSkill.skillId
              : slot.skill.skillId === sourceSkill.skillId)
        )
      if (hasDestinationSkill) return { ...state }
      return {
        ...state,
        newBarOne: state.newBarOne.map((slot) => {
          if (sourceBarIndex === 0) {
            return slot.index === sourceIndex
              ? { index: slot.index, id: slot.id, skill: destinationSkill }
              : slot
          } else {
            return slot.index === destinationIndex
              ? { index: slot.index, id: slot.id, skill: sourceSkill }
              : slot
          }
        }),
        newBarTwo: state.newBarTwo.map((slot) => {
          if (sourceBarIndex === 1) {
            return slot.index === sourceIndex
              ? { index: slot.index, id: slot.id, skill: destinationSkill }
              : slot
          } else {
            return slot.index === destinationIndex
              ? { index: slot.index, id: slot.id, skill: sourceSkill }
              : slot
          }
        }),
      }
    }
    case 'SET_HAS_TRASH': {
      const { hasTrash } = action.payload
      return {
        ...state,
        hasTrash,
      }
    }
    default:
      return state
  }
}
