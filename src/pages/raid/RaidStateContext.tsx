import React from 'react'
import { generalReducer } from './reducers/generalReducer'
import { buildsReducer } from './reducers/buildsReducer'
import { IBuild, AccessRights } from '../build/BuildStateContext'

export interface ISlot {
  id: number
  index: number
}

export interface IRaid {
  id?: string
  owner?: {
    id: string
    name: string
  }
  name: string
  description: string
  applicationArea: string
  createdAt?: string
  updatedAt?: string
  published: boolean
  accessRights: AccessRights
  roles: IRole[]
}
export interface IRaidState extends IRaid {
  canEdit: string[]
  canView: string[]
}

export interface IUser {
  id: string
  name: string
  email: string
}

export interface ISortedBuild {
  id?: string
  index: number
  build: IBuild
}

export interface IRole {
  id?: string
  name: string
  builds: ISortedBuild[]
}

export const defaultRaidState: IRaidState = {
  name: '',
  accessRights: AccessRights.UNLISTED,
  applicationArea: '',
  published: false,
  description: '',
  canEdit: [],
  canView: [],
  roles: [],
}

export interface IRaidAction {
  payload: any
  type: string
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
      return curr(prev, action)
    },
    state
  )
}

export const raidReducer = (state: IRaidState, action: IRaidAction) => {
  return combineReducers(state, action, [generalReducer, buildsReducer])
}

export const RaidContext = React.createContext<
  Partial<[IRaidState, React.Dispatch<IRaidAction>]>
>([])
