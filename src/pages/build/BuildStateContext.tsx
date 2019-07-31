import React from "react"; // { useReducer }
import { ISkill } from "../../components/SkillSlot";
import { skillReducer } from "./reducers/skillReducer";
import { skillBarReducer } from "./reducers/skillBarReducer";
import { ISet } from "../../components/GearSlot";
import { setReducer } from "./reducers/setReducer";
import { SelectValue } from "antd/lib/select";
import { raceNameReducer } from "./reducers/raceNameReducer";
import { setBarReducer } from "./reducers/setBarReducer";

export interface ISlot {
  id: number;
  index: number;
}
export interface IBuildState {
  skills: ISkill[];
  hasTrash: boolean;
  sets: ISet[];
  skillLine: number;
  selectedSkillLines: {
    id: number;
    selectedSkills: ISkillSelection[];
    selectedUltimate?: ISkill;
  }[];
  abilityBarOne: ISlot[];
  abilityBarTwo: ISlot[];
  ultimateOne?: ISkill;
  ultimateTwo?: ISkill;
  selectedSet?: ISet;
  weaponType: "onehanded" | "twohanded";
  armorType: "lightarmor" | "mediumarmor" | "heavyarmor";
  weapons: SelectValue[];
  weaponStats: IStats;
  armorStats: IStats;
  jewelryStats: IStats;
  race: string;
  class: string;
  setTabKey: "armor" | "jewelry" | "weapons";
  bigPieceSelection: ISetSelection[];
  smallPieceSelection: ISetSelection[];
  jewelrySelection: ISetSelection[];
  frontbarSelection: ISetSelection[];
  backbarSelection: ISetSelection[];
  newBarOne: ISkillSelection[];
  newActiveBar: ISkillSelection[];
  newBarTwo: ISkillSelection[];
}

export interface ISkillSelection {
  index: number;
  skill?: ISkill;
}

interface ISetSelection {
  icon?: string;
  slot: string;
  selectedSet?: ISet;
}

export interface IStats {
  selectedGlyphs: SelectValue[];
  selectedTraits: SelectValue[];
}

export const defaultBuildState = {
  skills: [],
  sets: [],
  skillLine: 0,
  hasTrash: false,
  newBarOne: [
    { index: 0, skill: undefined },
    { index: 1, skill: undefined },
    { index: 2, skill: undefined },
    { index: 3, skill: undefined },
    { index: 4, skill: undefined }
  ],
  newBarTwo: [
    { index: 0, skill: undefined },
    { index: 1, skill: undefined },
    { index: 2, skill: undefined },
    { index: 3, skill: undefined },
    { index: 4, skill: undefined }
  ],
  newActiveBar: [
    { index: 0, skill: undefined },
    { index: 1, skill: undefined },
    { index: 2, skill: undefined },
    { index: 3, skill: undefined },
    { index: 4, skill: undefined }
  ],

  bigPieceSelection: [
    { slot: "head", selectedSet: undefined, icon: undefined },
    { slot: "legs", selectedSet: undefined, icon: undefined },
    { slot: "chest", selectedSet: undefined, icon: undefined }
  ],
  smallPieceSelection: [
    { slot: "shoulders", selectedSet: undefined, icon: undefined },
    { slot: "waist", selectedSet: undefined, icon: undefined },
    { slot: "hands", selectedSet: undefined, icon: undefined },
    { slot: "feet", selectedSet: undefined, icon: undefined }
  ],
  jewelrySelection: [
    { slot: "neck", selectedSet: undefined, icon: undefined },
    { slot: "ring1", selectedSet: undefined, icon: undefined },
    { slot: "ring2", selectedSet: undefined, icon: undefined }
  ],
  frontbarSelection: [
    { slot: "mainHand", selectedSet: undefined, icon: undefined },
    { slot: "offHand", selectedSet: undefined, icon: undefined }
  ],
  backbarSelection: [
    { slot: "mainHand", selectedSet: undefined, icon: undefined },
    { slot: "offHand", selectedSet: undefined, icon: undefined }
  ],
  ultimateOne: undefined,
  ultimateTwo: undefined,
  selectedSkillLines: [],
  selectedSet: undefined,
  weaponType: "onehanded",
  armorType: "mediumarmor",
  weapons: ["", ""],
  weaponStats: {
    selectedGlyphs: ["", ""],
    selectedTraits: ["", ""]
  },
  armorStats: {
    selectedGlyphs: ["", "", "", "", "", "", ""],
    selectedTraits: ["", "", "", "", "", "", ""]
  },
  jewelryStats: {
    selectedGlyphs: ["", "", ""],
    selectedTraits: ["", "", ""]
  },
  race: "",
  class: "",
  setTabKey: "weapons"
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
    setReducer,
    setBarReducer,
    raceNameReducer
  ]);
};

export const BuildContext = React.createContext<
  Partial<[IBuildState, React.Dispatch<IBuildAction>]>
>([]);
