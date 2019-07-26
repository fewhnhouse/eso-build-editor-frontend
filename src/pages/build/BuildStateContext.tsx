import React from "react";
import { ISkill } from "./Sets/SecondPage";

export interface IBuildState {
  skills: ISkill[];
  selectedSkills: number[];
  abilityBarOne: number[];
  abilityBarTwo: number[];
}

export const defaultBuildState = {
  skills: [],
  selectedSkills: [],
  abilityBarOne: [],
  abilityBarTwo: []
};

interface IBuildAction {
  payload: any;
  type: string;
}
export const buildReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "SELECT_SKILL":
      return {
        ...state,
        selectedSkills: [...state.selectedSkills, action.payload]
      };
    case "UNSELECT_SKILL":
      return {
        ...state,
        selectedSkills: state.selectedSkills.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};

export const BuildContext = React.createContext<any>(defaultBuildState);
