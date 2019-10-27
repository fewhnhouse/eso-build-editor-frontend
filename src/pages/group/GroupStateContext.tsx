import React from 'react'
import { generalReducer } from '../group/reducers/generalReducer'
import { AccessRights } from '../build/BuildStateContext'
import { IRaidState } from '../raid/RaidStateContext'

interface IAssignedRole {
  build: string
  priority: string
}

interface IGroupMember {
  memberId?: string
  memberName: string
  assignedRoles: IAssignedRole[]
}

export interface IGroupState {
  id?: string
  name: string
  description: string
  accessRights: AccessRights
  raids: IRaidState[]
  members: string[]
  buildsMembers: { buildId: string; members: string[] }[]
}

export const defaultGroupState: IGroupState = {
  id: '',
  name: '',
  description: '',
  accessRights: AccessRights.UNLISTED,
  members: [],
  raids: [],
  buildsMembers: [],
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
