import { IGroupAction, IGroupState } from '../GroupStateContext'

export const generalReducer = (state: IGroupState, action: IGroupAction) => {
  switch (action.type) {
    case 'ADD_RAID': {
      const { raid } = action.payload
      return {
        ...state,
        raids: [...state.raids, raid],
      }
    }
    case 'SET_GROUP_NAME': {
      const { name } = action.payload
      return {
        ...state,
        name,
      }
    }
    case 'SET_GROUP_DESCRIPTION': {
      const { description } = action.payload
      return {
        ...state,
        description,
      }
    }
    case 'SET_GROUP_APPLICATION_AREAS': {
      const { applicationAreas } = action.payload
      return {
        ...state,
        applicationAreas,
      }
    }
    case 'SET_GROUP_ACCESS_RIGHTS': {
      const { accessRights } = action.payload
      return {
        ...state,
        accessRights,
      }
    }
    case 'SET_GROUP_MEMBERS': {
      const { members } = action.payload
      return {
        ...state,
        members,
      }
    }
    case 'SET_PRIMARY_ROLE': {
      const { assignedRoles } = action.payload
      return {
        ...state,
        assignedRoles,
      }
    }
    default:
      return state
  }
}
