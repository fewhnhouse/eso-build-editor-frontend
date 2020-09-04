import { IGroupState, IGroupBuild } from './GroupStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { ME } from '../home/UserHomeCard'

export const handleEditSave = async (
  state: IGroupState,
  updateGroup: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  initialGroupBuilds: IGroupBuild[]
) => {
  const { id, name, description, accessRights, members, groupBuilds } = state!

  //make sure everyone who can edit can also view
  await updateGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        description,
        accessRights,
        groupBuilds: {
          delete: initialGroupBuilds.map((initialGroupBuild) => ({
            id: initialGroupBuild.id,
          })),
          create: groupBuilds.map((build) => ({
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
  const { name, description, accessRights, members, groupBuilds } = state!

  await createGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        description,
        accessRights,
        groupBuilds: {
          create: groupBuilds.map((build) => ({
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
  const { name, description, accessRights, groupBuilds, members } = group

  await createGroup({
    variables: {
      data: {
        name,
        members: { set: members },
        description,
        accessRights,
        groupBuilds: {
          create: groupBuilds.map((build) => ({
            build: { connect: { id: build.build.id } },
            members: { set: build.members },
          })),
        },
      },
    },
    refetchQueries: [{ query: ME }],
  })
}
