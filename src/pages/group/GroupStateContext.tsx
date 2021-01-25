import React from 'react'
import { generalReducer } from '../group/reducers/generalReducer'
import { AccessRights, IBuild } from '../build/BuildStateContext'

export interface IGroupBuild {
  id?: string
  build: IBuild
  members: string[]
}

export interface IGroupState {
  id?: string
  name: string
  description: string
  accessRights: AccessRights
  owner?: {
    id: string
    name: string
  }
  members: string[]
  currentClass?: string
  groupBuilds: IGroupBuild[]
}

export const defaultGroupState: IGroupState = {
  id: '',
  name: '',
  description: '',
  accessRights: AccessRights.UNLISTED,
  members: [],
  currentClass: undefined,
  groupBuilds: [],
}

export interface IGroupAction {
  payload: any
  type: string
}

const combineReducers = (
  state: IGroupState,
  action: IGroupAction,
  reducers: ((state: IGroupState, action: IGroupAction) => IGroupState)[]
) => {
  return reducers.reduce(
    (
      prev: IGroupState,
      curr: (state: IGroupState, action: IGroupAction) => IGroupState
    ) => {
      return curr(prev, action)
    },
    state
  )
}

export const groupReducer = (state: IGroupState, action: IGroupAction) => {
  return combineReducers(state, action, [generalReducer])
}

export const GroupContext = React.createContext<
  Partial<[IGroupState, React.Dispatch<IGroupAction>]>
>([])
