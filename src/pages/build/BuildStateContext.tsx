import React from "react"; // { useReducer }
import { ISkill } from "../../components/SkillSlot";
import { skillReducer } from "./reducers/skillReducer";
import { skillBarReducer } from "./reducers/skillBarReducer";
import { ISet } from "../../components/GearSlot";
import { setReducer } from "./reducers/setReducer";
import { SelectValue } from "antd/lib/select";
import { raceNameReducer } from "./reducers/raceNameReducer";
import { setBarReducer } from "./reducers/setBarReducer";
import { ITrait, IGlyph } from "./Sets/data";
import { IMundus } from "../../assets/mundus";
import { ISpecialBuff } from "../../assets/specialbuff/drinks";

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
  ultimateOne?: ISkill;
  ultimateTwo?: ISkill;
  selectedSet?: ISet;
  weaponType: "onehanded" | "twohanded";
  armorType: "lightarmor" | "mediumarmor" | "heavyarmor";
  weapons: SelectValue[];
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
  mundus: IMundus;
  buff: ISpecialBuff;
}

export interface ISkillSelection {
  index: number;
  skill?: ISkill;
}

export enum Slot {
  head = "HEAD",
  mainHand = "MAIN_HAND",
  offHand = "OFF_HAND",
  eitherHand = "EITHER_HAND",
  shoulders = "SHOULDERS",
  chest = "CHEST",
  legs = "LEGS",
  waist = "WAIST",
  feet = "FEET",
  hands = "HANDS",
  ring = "RING",
  neck = "NECK",
  ring1 = "RING1",
  ring2 = "RING2"
}

export interface ISetSelection {
  icon?: string;
  slot: Slot;
  selectedSet?: ISet;
  trait?: ITrait;
  glyph?: IGlyph;
}

export const defaultBuildState = {
  skills: [],
  sets: [],
  skillLine: 0,
  mundus: undefined,
  buff: undefined,
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
    {
      slot: Slot.head,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.legs,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.chest,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    }
  ],
  smallPieceSelection: [
    {
      slot: Slot.shoulders,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.waist,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.hands,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.feet,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    }
  ],
  jewelrySelection: [
    {
      slot: Slot.neck,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.ring1,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.ring2,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    }
  ],
  frontbarSelection: [
    {
      slot: Slot.mainHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.offHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    }
  ],
  backbarSelection: [
    {
      slot: Slot.mainHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    },
    {
      slot: Slot.offHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined
    }
  ],
  ultimateOne: undefined,
  ultimateTwo: undefined,
  selectedSkillLines: [],
  selectedSet: undefined,
  weaponType: "onehanded",
  armorType: "mediumarmor",
  weapons: ["", ""],
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
