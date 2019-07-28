import React from "react"; // { useReducer }
import { ISkill } from "./Sets/SecondPage";
import { ABILITY_BAR_ONE, ABILITY_BAR_TWO } from "./Sets/AbilityBar";

interface ISlot {
  id: number;
  index: number;
}
export interface IBuildState {
  skills: ISkill[];
  skillLine: number;
  selectedSkillLines: {
    id: number;
    selectedSkills: ISlot[];
    selectedUltimate: number;
  }[];
  abilityBarOne: ISlot[];
  abilityBarTwo: ISlot[];
  ultimateOne: ISlot;
  ultimateTwo: ISlot;
}

export const defaultBuildState = {
  skills: [],
  skillLine: 0,
  activeBar: [
    { id: 0, index: 0 },
    { id: 0, index: 1 },
    { id: 0, index: 2 },
    { id: 0, index: 3 },
    { id: 0, index: 4 }
  ],
  abilityBarOne: [
    { id: 0, index: 0 },
    { id: 0, index: 1 },
    { id: 0, index: 2 },
    { id: 0, index: 3 },
    { id: 0, index: 4 }
  ],
  abilityBarTwo: [
    { id: 0, index: 0 },
    { id: 0, index: 1 },
    { id: 0, index: 2 },
    { id: 0, index: 3 },
    { id: 0, index: 4 }
  ],
  ultimateOne: { id: 0, index: 5 },
  ultimateTwo: { id: 0, index: 5 },
  selectedSkillLines: []
};

interface IBuildAction {
  payload: any;
  type: string;
}
export const buildReducer = (state: IBuildState, action: IBuildAction) => {
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
    case "SELECT_MORPH": {
      const { baseId, morphId } = action.payload;
      console.log(state.ultimateOne);
      const morphMap = (slot: ISlot) =>
        slot.id === baseId ? { id: morphId, index: slot.index } : slot;
      return {
        ...state,
        abilityBarOne: state.abilityBarOne.map(morphMap),
        abilityBarTwo: state.abilityBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate === baseId
                    ? morphId
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne.id === baseId
            ? { id: morphId, index: 5 }
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo.id === baseId
            ? { id: morphId, index: 5 }
            : state.ultimateTwo
      };
    }
    case "UNSELECT_MORPH": {
      const { baseId, morphId } = action.payload;
      console.log(state.ultimateOne);
      const morphMap = (slot: ISlot) =>
        slot.id === morphId ? { id: baseId, index: slot.index } : slot;

      return {
        ...state,
        abilityBarOne: state.abilityBarOne.map(morphMap),
        abilityBarTwo: state.abilityBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate === morphId
                    ? baseId
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne.id === morphId
            ? { id: baseId, index: 5 }
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo.id === morphId
            ? { id: baseId, index: 5 }
            : state.ultimateTwo
      };
    }
    case "SWAP_MORPH": {
      const { oldMorphId, newMorphId } = action.payload;
      const morphMap = (slot: ISlot) =>
        slot.id === oldMorphId ? { id: newMorphId, index: slot.index } : slot;

      return {
        ...state,
        abilityBarOne: state.abilityBarOne.map(morphMap),
        abilityBarTwo: state.abilityBarTwo.map(morphMap),
        selectedSkillLines: state.selectedSkillLines.map(skillLine =>
          skillLine.id === state.skillLine
            ? {
                id: skillLine.id,
                selectedSkills: skillLine.selectedSkills.map(morphMap),
                selectedUltimate:
                  skillLine.selectedUltimate === oldMorphId
                    ? newMorphId
                    : skillLine.selectedUltimate
              }
            : skillLine
        ),
        ultimateOne:
          state.ultimateOne.id === oldMorphId
            ? { id: newMorphId, index: 5 }
            : state.ultimateOne,
        ultimateTwo:
          state.ultimateTwo.id === oldMorphId
            ? { id: newMorphId, index: 5 }
            : state.ultimateTwo
      };
    }

    case "SET_SELECTED_SKILLS_AND_ULTIMATE": {
      const { id, selectedSkills, ultimate } = action.payload;
      return {
        ...state,
        selectedSkills,
        selectedSkillLines: state.selectedSkillLines.find(
          skillLine => skillLine.id === id
        )
          ? [...state.selectedSkillLines]
          : [
              ...state.selectedSkillLines,
              { id, selectedSkills, selectedUltimate: ultimate }
            ]
      };
    }
    case "SET_SKILLLINE":
      const { skillLine } = action.payload;
      return {
        ...state,
        skillLine
      };
    case "SET_SKILLS":
      return {
        ...state,
        skills: action.payload
      };
    default:
      return state;
  }
};

export const BuildContext = React.createContext<
  Partial<[IBuildState, React.Dispatch<IBuildAction>]>
>([]);
