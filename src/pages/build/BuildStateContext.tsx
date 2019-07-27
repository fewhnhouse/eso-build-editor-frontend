import React, { useReducer } from "react";
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
    case "DROP_ABILITY":
      const { barIndex, destinationIndex, skillId } = action.payload;
      const parsedIndex = parseInt(destinationIndex, 10);
      const parsedId = parseInt(skillId, 10);

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
