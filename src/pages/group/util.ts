import { IGroupState, IGroupBuild } from './GroupStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { ME } from '../home/UserHomeCard'
import { IRaidState } from '../raid/RaidStateContext'

export const handleEditSave = async (
  state: IGroupState,
  updateGroup: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  initialGroupBuilds: IGroupBuild[],
  initialRaids: IRaidState[]
) => {
  const {
    id,
    name,
    description,
    accessRights,
    raids,
    members,
    groupBuilds,
  } = state!

  const filteredInitialRaids = initialRaids.filter(
    raid => !raids.find(newRaid => newRaid.id === raid.id)
  )
  //make sure everyone who can edit can also view
  await updateGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        raids: {
          connect: raids.map(raid => ({ id: raid.id })),
          disconnect: filteredInitialRaids.map(raid => ({ id: raid.id })),
        },
        description,
        accessRights,
        groupBuilds: {
          delete: initialGroupBuilds.map(initialGroupBuild => ({
            id: initialGroupBuild.id,
          })),
          create: groupBuilds.map(build => ({
            build: { connect: { id: build.build.id } },
            members: { set: build.members },
          })),
        },
      },
      where: {
        id,
      },
    },
  })
}

export const handleCreateSave = async (
  state: IGroupState,
  createGroup: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>
) => {
  const {
    name,
    description,
    accessRights,
    raids,
    members,
    groupBuilds,
  } = state!

  await createGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        raids: { connect: raids.map(raid => ({ id: raid.id })) },
        description,
        accessRights,
        groupBuilds: {
          create: groupBuilds.map(build => ({
            build: { connect: { id: build.build.id } },
            members: { set: build.members },
          })),
        },
      },
    },
    refetchQueries: [{ query: ME }],
  })
}

export const handleCopy = async (
  createGroup: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  group: IGroupState
) => {
  const { name, description, accessRights, groupBuilds, members, raids } = group

  await createGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        raids: { connect: raids.map(raid => ({ id: raid.id })) },
        description,
        accessRights,
        groupBuilds: {
          create: groupBuilds.map(build => ({
            build: { connect: { id: build.build.id } },
            members: { set: build.members },
          })),
        },
      },
    },
    refetchQueries: [{ query: ME }],
  })
}
