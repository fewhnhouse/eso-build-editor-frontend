import { IGroupAction, IGroupState } from '../GroupStateContext'
import { IBuild } from '../../build/BuildStateContext'

export const generalReducer = (state: IGroupState, action: IGroupAction) => {
  switch (action.type) {
    case 'SET_CURRENT_CLASS': {
      const { currentClass } = action.payload
      return {
        ...state,
        currentClass,
      }
    }

    case 'ADD_BUILD': {
      const { build }: { build: IBuild } = action.payload
      const newBuilds = state.groupBuilds.find(
        (groupBuild) => groupBuild.build.id === build.id
      )
        ? [...state.groupBuilds]
        : [...state.groupBuilds, { build, members: [] }]

      return {
        ...state,
        groupBuilds: newBuilds,
      }
    }
    case 'REMOVE_BUILD': {
      const { build }: { build: IBuild } = action.payload
      const newBuilds = state.groupBuilds.filter(
        (groupBuild) => groupBuild.build.id !== build.id
      )

      return {
        ...state,
        groupBuilds: newBuilds,
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
    case 'ADD_GROUP_BUILD': {
      const { groupBuild } = action.payload
      return {
        ...state,
        groupBuilds: [...state.groupBuilds, groupBuild],
      }
    }
    case 'SET_BUILD_MEMBERS': {
      const { members, buildId } = action.payload
      return {
        ...state,
        groupBuilds: state.groupBuilds.map((groupBuild) =>
          groupBuild.build.id === buildId
            ? { members, build: groupBuild.build }
            : groupBuild
        ),
      }
    }

    default:
      return state
  }
}
