import React from 'react'; // { useReducer }
import { generalReducer } from './reducers/generalReducer';
import { buildsReducer } from './reducers/buildsReducer';
import {
  ISkillSelection,
  ISetSelection,
  IBuild,
} from '../build/BuildStateContext';
import { ISkill } from '../../components/SkillSlot';

export interface ISlot {
  id: number;
  index: number;
}
export interface IRaidState {
  id?: string;
  name: string;
  applicationArea: string;
  description: string;
  published: boolean;
  groupSize: number;
  canEdit: string[];
  canView: string[];
  roles: IRole[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IRole {
  id?: string;
  name: string;
  builds: IBuild[];
}

export const defaultRaidState: IRaidState = {
  name: '',
  applicationArea: '',
  published: false,
  groupSize: 12,
  description: '',
  canEdit: [],
  canView: [],
  roles: [],
};

export interface IRaidAction {
  payload: any;
  type: string;
}

const combineReducers = (
  state: IRaidState,
  action: IRaidAction,
  reducers: ((state: IRaidState, action: IRaidAction) => IRaidState)[]
) => {
  return reducers.reduce(
    (
      prev: IRaidState,
      curr: (state: IRaidState, action: IRaidAction) => IRaidState
    ) => {
      return curr(prev, action);
    },
    state
  );
};

export const raidReducer = (state: IRaidState, action: IRaidAction) => {
  return combineReducers(state, action, [generalReducer, buildsReducer]);
};

export const RaidContext = React.createContext<
  Partial<[IRaidState, React.Dispatch<IRaidAction>]>
>([]);
