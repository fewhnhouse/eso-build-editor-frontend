import { IGroupAction, IGroupState } from '../GroupStateContext'
import { IRole, IRaidState } from '../../raid/RaidStateContext'
import { IBuild } from '../../build/BuildStateContext'

export const generalReducer = (state: IGroupState, action: IGroupAction) => {
  switch (action.type) {
    case 'ADD_RAID': {
      const { raid }: { raid: IRaidState } = action.payload
      const newRaids = [...state.raids, raid]
      const flattenedBuilds = newRaids
        .map(raid => raid.roles)
        .flat()
        .map(role => role.builds)
        .flat()
        .map(sortedBuild => sortedBuild.build)
      const uniqueBuilds = flattenedBuilds.reduce<IBuild[]>(
        (prev, curr) =>
          prev.find(build => build.id === curr.id) ? prev : [...prev, curr],
        []
      )

      const uniqueMembers = uniqueBuilds.map(build => {
        const member = state.buildsMembers.find(
          member => member.buildId === build.id
        )
        return member || { buildId: build.id || '', members: [] }
      })

      return {
        ...state,
        raids: newRaids,
        buildsMembers: uniqueMembers,
      }
    }
    case 'REMOVE_RAID': {
      const { raid } = action.payload
      const newRaids = state.raids.filter(stateRaid => stateRaid.id !== raid.id)
      const flattenedBuilds = newRaids
        .map(raid => raid.roles)
        .flat()
        .map(role => role.builds)
        .flat()
        .map(sortedBuild => sortedBuild.build)
      const uniqueBuilds = flattenedBuilds.reduce<IBuild[]>(
        (prev, curr) =>
          prev.find(build => build.id === curr.id) ? prev : [...prev, curr],
        []
      )

      const uniqueMembers = uniqueBuilds.map(build => {
        const member = state.buildsMembers.find(
          member => member.buildId === build.id
        )
        return member || { buildId: build.id || '', members: [] }
      })

      return {
        ...state,
        raids: newRaids,
        buildsMembers: uniqueMembers,
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
    case 'SET_BUILD_MEMBERS': {
      const { members, buildId } = action.payload
      return {
        ...state,
        buildsMembers: state.buildsMembers.map(member =>
          member.buildId === buildId ? { members, buildId } : member
        ),
      }
    }

    default:
      return state
  }
}
