import React from "react"; // { useReducer }
import { ISkill } from "../../components/SkillSlot";
import { skillReducer } from "./reducers/skillReducer";
import { skillBarReducer } from "./reducers/skillBarReducer";
import { number } from "prop-types";
import { ISet } from "../../components/GearSlot";
import { setReducer } from "./reducers/setReducer";
import { SelectValue } from "antd/lib/select";

export interface ISlot {
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
  selectedSet?: ISet;
  weaponType: string;
  weapons: SelectValue[];
  weaponStats: IStats;
  armorStats: IStats;
  jewelryStats: IStats;
}

export interface IStats {
  selectedGlyphs: SelectValue[];
  selectedTraits: SelectValue[];
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
  selectedSkillLines: [],
  selectedSet: undefined,
  weaponType: "onehanded",
  weapons: [],
  weaponStats: {
    selectedGlyphs: [],
    selectedTraits: []
  },
  armorStats: {
    selectedGlyphs: [],
    selectedTraits: []
  },
  jewelryStats: {
    selectedGlyphs: [],
    selectedTraits: []
  }
};

export interface IBuildAction {
  payload: any;
  type: string;
}

const combineReducers = (
  state: IBuildState,
  action: IBuildAction,
  reducers: ((state: IBuildState, action: IBuildAction) => IBuildState)[]
) => {
  return reducers.reduce(
    (
      prev: IBuildState,
      curr: (state: IBuildState, action: IBuildAction) => IBuildState
    ) => {
      return curr(prev, action);
    },
    state
  );
};

export const buildReducer = (state: IBuildState, action: IBuildAction) => {
  return combineReducers(state, action, [
    skillReducer,
    skillBarReducer,
    setReducer
  ]);
};

export const BuildContext = React.createContext<
  Partial<[IBuildState, React.Dispatch<IBuildAction>]>
>([]);
