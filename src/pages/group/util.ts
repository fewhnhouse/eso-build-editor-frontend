import { IGroupState } from './GroupStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { ME } from '../home/UserHomeCard'

export const handleEditSave = async (
  state: IGroupState,
  updateGroup: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>
) => {
  const {
    id,
    name,
    description,
    accessRights,
    raids,
    members,
    buildsMembers,
  } = state!

  //make sure everyone who can edit can also view
  await updateGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        raids: { connect: raids.map(raid => ({ id: raid.id })) },
        description,
        accessRights,
        groupBuilds: {
          create: buildsMembers.map(build => ({
            build: { connect: { id: build.buildId } },
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
    buildsMembers,
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
          create: buildsMembers.map(build => ({
            build: { connect: { id: build.buildId } },
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
  const {
    name,
    description,
    accessRights,
    buildsMembers,
    members,
    raids,
  } = group

  await createGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        raids: { connect: raids.map(raid => ({ id: raid.id })) },
        description,
        accessRights,
        groupBuilds: {
          create: buildsMembers.map(build => ({
            build: { connect: { id: build.buildId } },
            members: { set: build.members },
          })),
        },
      },
    },
    refetchQueries: [{ query: ME }],
  })
}
