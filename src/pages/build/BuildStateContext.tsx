import React from "react"; // { useReducer }
import { ISkill } from "./Sets/SecondPage";

export interface IBuildState {
  skills: ISkill[];
  selectedSkills: { id: number; index: number }[];
  abilityBarOne: { id: number; index: number }[];
  abilityBarTwo: { id: number; index: number }[];
  selectedUltimate: number;
}

export const defaultBuildState = {
  skills: [],
  selectedUltimate: 0,
  selectedSkills: [
    { id: 0, index: 0 },
    { id: 0, index: 1 },
    { id: 0, index: 2 },
    { id: 0, index: 3 },
    { id: 0, index: 4 }
  ],
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
  ]
};

interface IBuildAction {
  payload: any;
  type: string;
}
export const buildReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
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
        if (destinationBar === "abilityBar1") {
          const hasSkill = state.abilityBarOne.find(
            slot => slot.id === parsedSourceId
          );
          if (hasSkill) {
            return {
              ...state
            };
          }
        } else if (destinationBar === "abilityBar2") {
          const hasSkill = state.abilityBarTwo.find(
            slot => slot.id === parsedSourceId
          );
          if (hasSkill) {
            return {
              ...state
            };
          }
        }
      }
      if (sourceBar === "abilityBar1" && destinationBar === "abilityBar1") {
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
        sourceBar === "abilityBar1" &&
        destinationBar === "abilityBar2"
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
        sourceBar === "abilityBar2" &&
        destinationBar === "abilityBar2"
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
        sourceBar === "abilityBar2" &&
        destinationBar === "abilityBar1"
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
      return {
        ...state,
        selectedSkills: state.selectedSkills.map(slot =>
          slot.id === baseId ? { id: morphId, index: slot.index } : slot
        )
      };
    }
    case "UNSELECT_MORPH": {
      const { baseId, morphId } = action.payload;

      return {
        ...state,
        selectedSkills: state.selectedSkills.map(slot =>
          slot.id === morphId ? { id: baseId, index: slot.index } : slot
        )
      };
    }
    case "SWAP_MORPH": {
      const { oldMorphId, newMorphId } = action.payload;

      return {
        ...state,
        selectedSkills: state.selectedSkills.map(slot =>
          slot.id === oldMorphId ? { id: newMorphId, index: slot.index } : slot
        )
      };
    }
    case "SET_SELECTED_ULTIMATE": {
      return {
        ...state,
        selectedUltimate: action.payload
      };
    }

    case "SET_SELECTED_SKILLS":
      return {
        ...state,
        selectedSkills: action.payload
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
