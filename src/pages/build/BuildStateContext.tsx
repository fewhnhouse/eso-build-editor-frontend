import React from 'react'; // { useReducer }
import { ISkill } from '../../components/SkillSlot';
import { skillReducer } from './reducers/skillReducer';
import { skillBarReducer } from './reducers/skillBarReducer';
import { ISet } from '../../components/GearSlot';
import { setReducer } from './reducers/setReducer';
import { SelectValue } from 'antd/lib/select';
import { raceNameReducer } from './reducers/raceNameReducer';
import { setBarReducer } from './reducers/setBarReducer';
import { ISpecialBuff } from './consumables/BuffMenu';

export interface IMundus {
  name: string;
  effect: string;
  value: string;
  icon: string;
}
export interface ISlot {
  id: number;
  index: number;
}
export interface IBuildState {
  id?: string
  skills: ISkill[];
  hasTrash: boolean;
  sets: ISet[];
  skillLine: number;
  selectedSkillLines: {
    id: number;
    selectedSkills: ISkillSelection[];
    selectedUltimate?: ISkill;
  }[];
  newActiveBar: ISkillSelection[];
  selectedSet?: ISet;
  weaponType: WeaponType;
  armorType: ArmorType;
  weapons: SelectValue[];
  setTabKey: SetTab;
  race: string;
  esoClass: string;
  name: string;
  applicationArea: string;
  role: string;
  description: string;
  mainResource: string;
  bigPieceSelection: ISetSelection[];
  smallPieceSelection: ISetSelection[];
  jewelrySelection: ISetSelection[];
  frontbarSelection: ISetSelection[];
  backbarSelection: ISetSelection[];
  newBarOne: ISkillSelection[];
  ultimateOne?: ISkill;
  ultimateTwo?: ISkill;
  newBarTwo: ISkillSelection[];
  mundusStone: IMundus;
  buff: ISpecialBuff;
}

export interface ISkillSelection {
  id?: string;
  index: number;
  skill?: ISkill;
}

export enum Slot {
  head = 'HEAD',
  mainHand = 'MAIN_HAND',
  offHand = 'OFF_HAND',
  eitherHand = 'EITHER_HAND',
  shoulders = 'SHOULDERS',
  chest = 'CHEST',
  legs = 'LEGS',
  waist = 'WAIST',
  feet = 'FEET',
  hands = 'HANDS',
  ring = 'RING',
  neck = 'NECK',
  ring1 = 'RING1',
  ring2 = 'RING2',
}

export enum OnehandedWeapon {
  dagger = 'DAGGER',
  axe = '1H_AXE',
  mace = '1H_MACE',
  sword = '1H_SWORD',
  shield = 'SHIELD',
}

export enum TwohandedWeapon {
  axe = '2H_AXE',
  mace = '2H_MACE',
  sword = '2H_SWORD',
  restorationStaff = 'RESTORATION_STAFF',
  fireStaff = 'FIRE_STAFF',
  lightningStaff = 'LIGHTNING_STAFF',
  iceStaff = 'ICE_STAFF',
  bow = 'BOW',
}

export enum SetTab {
  armor = 'ARMOR_TAB',
  frontbar = 'FRONTBAR_TAB',
  backbar = 'BACKBAR_TAB',
  jewelry = 'JEWELRY_TAB',
}

export type SlotType = ArmorType | WeaponType | 'jewelry';

export enum ArmorType {
  lightArmor = 'LIGHT_ARMOR',
  mediumArmor = 'MEDIUM_ARMOR',
  heavyArmor = 'HEAVY_ARMOR',
}

export enum WeaponType {
  onehanded = 'ONE_HANDED',
  twohanded = 'TWO_HANDED',
}
export interface ISetSelection {
  id?: string;
  icon?: string;
  slot: Slot;
  selectedSet?: ISet;
  type?: SlotType;
  weaponType?: OnehandedWeapon | TwohandedWeapon;
  trait?: IModification;
  glyph?: IModification;
}

export interface IModification {
  type: string;
  modificationType: 'glyph' | 'trait';
  itemType: 'armor' | 'weapon' | 'jewelry';
  description: string;
  icon: string;
}
export const defaultBuildState = {
  skills: [],
  sets: [],
  skillLine: 0,
  mundusStone: undefined,
  buff: undefined,
  hasTrash: false,
  applicationArea: '',
  esoClass: '',
  role: '',
  name: '',
  mainResource: 'hybrid',
  description: '',
  newBarOne: [
    { index: 0, skill: undefined },
    { index: 1, skill: undefined },
    { index: 2, skill: undefined },
    { index: 3, skill: undefined },
    { index: 4, skill: undefined },
  ],
  newBarTwo: [
    { index: 0, skill: undefined },
    { index: 1, skill: undefined },
    { index: 2, skill: undefined },
    { index: 3, skill: undefined },
    { index: 4, skill: undefined },
  ],
  newActiveBar: [
    { index: 0, skill: undefined },
    { index: 1, skill: undefined },
    { index: 2, skill: undefined },
    { index: 3, skill: undefined },
    { index: 4, skill: undefined },
  ],

  bigPieceSelection: [
    {
      slot: Slot.head,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
    {
      slot: Slot.legs,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
    {
      slot: Slot.chest,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
  ],
  smallPieceSelection: [
    {
      slot: Slot.shoulders,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
    {
      slot: Slot.waist,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
    {
      slot: Slot.hands,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
    {
      slot: Slot.feet,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
  ],
  jewelrySelection: [
    {
      slot: Slot.neck,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
      type: 'jewelry',
    },
    {
      slot: Slot.ring1,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
      type: 'jewelry',
    },
    {
      slot: Slot.ring2,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
      type: 'jewelry',
    },
  ],
  frontbarSelection: [
    {
      slot: Slot.mainHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
    {
      slot: Slot.offHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
  ],
  backbarSelection: [
    {
      slot: Slot.mainHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
    {
      slot: Slot.offHand,
      selectedSet: undefined,
      icon: undefined,
      trait: undefined,
      glyph: undefined,
    },
  ],
  ultimateOne: undefined,
  ultimateTwo: undefined,
  selectedSkillLines: [],
  selectedSet: undefined,
  weaponType: WeaponType.onehanded,
  armorType: ArmorType.mediumArmor,
  weapons: ['', ''],
  race: '',
  class: '',
  setTabKey: SetTab.armor,
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
    raceNameReducer,
  ]);
};

export const BuildContext = React.createContext<
  Partial<[IBuildState, React.Dispatch<IBuildAction>]>
>([]);
