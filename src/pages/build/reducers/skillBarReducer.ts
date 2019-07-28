import { IBuildState } from "./../BuildStateContext";
import { ABILITY_BAR_TWO } from "../Skills/AbilityBar";
import { ISkill } from "../../../components/SkillSlot";
import { ISlot, IBuildAction } from "../BuildStateContext";
import { ABILITY_BAR_ONE } from "../Skills/AbilityBar";

export const skillBarReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "DROP_ULTIMATE": {
      const { skillId, barIndex } = action.payload;
      const parsedBarIndex = parseInt(barIndex, 10);
      const parsedId = parseInt(skillId, 10);

      if (parsedBarIndex === 0) {
        return {
          ...state,
          ultimateOne: { id: parsedId, index: 5 }
        };
      } else if (parsedBarIndex === 1) {
        return {
          ...state,
          ultimateTwo: { id: parsedId, index: 5 }
        };
      }
    }
    case "REMOVE_ULTIMATE": {
      const { barIndex } = action.payload;
      const parsedBarIndex = parseInt(barIndex, 10);

      if (parsedBarIndex === 0) {
        return {
          ...state,
          ultimateOne: { id: 0, index: 5 }
        };
      } else if (parsedBarIndex === 1) {
        return {
          ...state,
          ultimateTwo: { id: 0, index: 5 }
        };
      }
    }
    case "SWAP_ULTIMATE": {
      const { barIndex, sourceId, destinationId } = action.payload;
      const parsedDestinationId = parseInt(destinationId, 10);
      const parsedSourceId = parseInt(sourceId, 10);
      const parsedBarIndex = parseInt(barIndex, 10);
      if (parsedBarIndex === 1) {
        return {
          ...state,
          ultimateOne: { id: parsedDestinationId, index: 5 },
          ultimateTwo: { id: parsedSourceId, index: 5 }
        };
      } else {
        return {
          ...state,
          ultimateOne: { id: parsedSourceId, index: 5 },
          ultimateTwo: { id: parsedDestinationId, index: 5 }
        };
      }
    }
    case "REMOVE_ABILITY": {
      const { skillId, barIndex } = action.payload;
      const parsedBarIndex = parseInt(barIndex, 10);
      const parsedId = parseInt(skillId, 10);

      if (parsedBarIndex === 0) {
        return {
          ...state,
          abilityBarOne: [...state.abilityBarOne].map(slot =>
            slot.id === parsedId ? { id: 0, index: slot.index } : slot
          )
        };
      } else {
        return {
          ...state,
          abilityBarTwo: [...state.abilityBarTwo].map(slot =>
            slot.id === parsedId ? { id: 0, index: slot.index } : slot
          )
        };
      }
    }
    case "DROP_ABILITY": {
      const { barIndex, destinationIndex, skillId } = action.payload;
      const parsedIndex = parseInt(destinationIndex, 10);
      const parsedId = parseInt(skillId, 10);
      if (
        (barIndex === 0 &&
          state.abilityBarOne.find(slot => slot.id === parsedId)) ||
        (barIndex === 1 &&
          state.abilityBarTwo.find(slot => slot.id === parsedId))
      ) {
        return { ...state };
      }
      if (barIndex === 0) {
        return {
          ...state,
          abilityBarOne: state.abilityBarOne.map((slot, index) =>
            slot.index === parsedIndex ? { index, id: parsedId } : slot
          )
        };
      } else {
        return {
          ...state,
          abilityBarTwo: state.abilityBarTwo.map((slot, index) =>
            slot.index === parsedIndex ? { index, id: parsedId } : slot
          )
        };
      }
    }

    case "SWAP_ABILITY": {
      const {
        sourceIndex,
        sourceBar,
        sourceId,
        destinationIndex,
        destinationBar,
        destinationId
      } = action.payload;
      const parsedDestinationIndex = parseInt(destinationIndex, 10);
      const parsedSourceIndex = parseInt(sourceIndex, 10);
      const parsedDestinationId = parseInt(destinationId, 10);
      const parsedSourceId = parseInt(sourceId, 10);
      if (sourceBar !== destinationBar) {
        if (destinationBar === ABILITY_BAR_ONE) {
          const sourceHasDestinationSkill = state.abilityBarTwo.find(
            slot => slot.id === parsedDestinationId && slot.id !== 0
          );

          const destinationHasSourceSkill = state.abilityBarOne.find(
            slot => slot.id === parsedSourceId && slot.id !== 0
          );

          if (
            sourceHasDestinationSkill !== undefined ||
            destinationHasSourceSkill !== undefined
          ) {
            return {
              ...state
            };
          }
        } else if (destinationBar === ABILITY_BAR_TWO) {
          const sourceHasDestinationSkill = state.abilityBarOne.find(
            slot => slot.id === parsedDestinationId && slot.id !== 0
          );

          const destinationHasSourceSkill = state.abilityBarTwo.find(
            slot => slot.id === parsedSourceId && slot.id !== 0
          );

          if (
            sourceHasDestinationSkill !== undefined ||
            destinationHasSourceSkill !== undefined
          ) {
            return {
              ...state
            };
          }
        }
      }
      if (sourceBar === ABILITY_BAR_ONE && destinationBar === ABILITY_BAR_ONE) {
        const abilityBarOne = state.abilityBarOne.map(slot => {
          if (slot.index === parsedDestinationIndex) {
            return { index: slot.index, id: parsedSourceId };
          } else if (slot.index === parsedSourceIndex) {
            return { index: slot.index, id: parsedDestinationId };
          } else {
            return slot;
          }
        });
        return {
          ...state,
          abilityBarOne
        };
      } else if (
        sourceBar === ABILITY_BAR_ONE &&
        destinationBar === ABILITY_BAR_TWO
      ) {
        const abilityBarOne = state.abilityBarOne.map(slot => {
          if (slot.index === parsedSourceIndex) {
            return { index: slot.index, id: parsedDestinationId };
          } else {
            return slot;
          }
        });
        const abilityBarTwo = state.abilityBarTwo.map(slot => {
          if (slot.index === parsedDestinationIndex) {
            return { index: slot.index, id: parsedSourceId };
          } else {
            return slot;
          }
        });

        return {
          ...state,
          abilityBarOne,
          abilityBarTwo
        };
      } else if (
        sourceBar === ABILITY_BAR_TWO &&
        destinationBar === ABILITY_BAR_TWO
      ) {
        const abilityBarTwo = state.abilityBarTwo.map(slot => {
          if (slot.index === parsedDestinationIndex) {
            return { index: slot.index, id: parsedSourceId };
          } else if (slot.index === parsedSourceIndex) {
            return { index: slot.index, id: parsedDestinationId };
          } else {
            return slot;
          }
        });
        return { ...state, abilityBarTwo };
      } else if (
        sourceBar === ABILITY_BAR_TWO &&
        destinationBar === ABILITY_BAR_ONE
      ) {
        const abilityBarOne = state.abilityBarOne.map(slot => {
          if (slot.index === parsedDestinationIndex) {
            return { index: slot.index, id: parsedSourceId };
          } else {
            return slot;
          }
        });
        const abilityBarTwo = state.abilityBarTwo.map(slot => {
          if (slot.index === parsedSourceIndex) {
            return { index: slot.index, id: parsedDestinationId };
          } else {
            return slot;
          }
        });
        return {
          ...state,
          abilityBarOne,
          abilityBarTwo
        };
      }
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
