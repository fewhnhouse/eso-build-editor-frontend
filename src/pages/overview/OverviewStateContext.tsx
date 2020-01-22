import React from 'react' // { useReducer }

import { rootReducer } from './rootReducer'
import { ISpecialBuff } from '../build/consumables/BuffMenu'
import { IMundus } from '../build/BuildStateContext'
import { ISet } from '../../components/gear/GearSlot'

export interface IOverviewAction {
  payload: any
  type: string
}

export interface IOverviewState {
  buff?: ISpecialBuff
  mundusStone?: IMundus
  selectedSet?: ISet
  skillLine?: number
}

const combineReducers = (
  state: IOverviewState,
  action: IOverviewAction,
  reducers: ((
    state: IOverviewState,
    action: IOverviewAction
  ) => IOverviewState)[]
) => {
  return reducers.reduce(
    (
      prev: IOverviewState,
      curr: (state: IOverviewState, action: IOverviewAction) => IOverviewState
    ) => {
      return curr(prev, action)
    },
    state
  )
}

export const defaultOverviewState: IOverviewState = {
  buff: undefined,
  mundusStone: undefined,
  selectedSet: undefined,
  skillLine: undefined,
}
export const overviewReducer = (
  state: IOverviewState,
  action: IOverviewAction
) => {
  return combineReducers(state, action, [rootReducer])
}

export const OverviewContext = React.createContext<
  Partial<[IOverviewState, React.Dispatch<IOverviewAction>]>
>([])
