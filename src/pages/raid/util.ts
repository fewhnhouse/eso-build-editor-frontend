import { IRaidState, IRole } from './RaidStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { ME } from '../home/LoggedInHome'

export const handleEditSave = async (
  state: IRaidState,
  updateRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>,
  initialRoles: IRole[]
) => {
  const {
    name,
    roles,
    applicationArea,
    canEdit,
    description,
    canView,
    published,
    id,
  } = state!

  //make sure everyone who can edit can also view
  const enhancedCanView: string[] = [
    ...canView,
    ...canEdit.filter((editId) => !canView.includes(editId)),
  ]
  await updateRaid({
    variables: {
      data: {
        name,
        description,
        applicationArea,
        canEdit: { connect: canEdit.map((id) => ({ id })) },
        canView: { connect: enhancedCanView.map((id) => ({ id })) },
        published,
        roles: {
          delete: initialRoles.map((initialRole: IRole) => ({
            id: initialRole.id,
          })),
          create: roles.map((role) => {
            return {
              name: role.name,
              builds: {
                create: role.builds.map((build, index) => ({
                  build: { connect: { id: build.build.id } },
                  index,
                })),
              },
            }
          }),
        },
      },
      where: {
        id,
      },
    },
  })
}

export const createNewRaid = async (
  state: IRaidState,
  createRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>
) => {
  const {
    name,
    roles,
    applicationArea,
    canEdit,
    canView,
    published,
    description,
  } = state!

  //make sure everyone who can edit can also view
  const enhancedCanView: string[] = [
    ...canView,
    ...canEdit.filter((editId) => !canView.includes(editId)),
  ]

  const raid = await createRaid({
    variables: {
      data: {
        name,
        description,
        applicationArea,
        canEdit: { connect: canEdit.map((id) => ({ id })) },
        canView: { connect: enhancedCanView.map((id) => ({ id })) },
        published,
        roles: {
          create: roles.map((role) => ({
            name: role.name,
            builds: {
              create: role.builds.map((build, index) => ({
                build: { connect: { id: build.build.id } },
                index,
              })),
            },
          })),
        },
      },
    },
    refetchQueries: [{ query: ME }],
  })
  return raid
}

export const handleCreateSave = async (
  state: IRaidState,
  createRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>,
  createRaidRevision: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>
) => {
  const raid = await createNewRaid(state, createRaid)
  if (raid?.data?.createRaid?.id) {
    await createRaidRevision({
      variables: {
        data: { raids: { connect: [{ id: raid.data.createRaid.id }] } },
      },
    })
    return raid
  }
}

export const handleCopy = async (
  createRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  createRaidRevision: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  raid: IRaidState
) => {
  const { name, description, applicationArea, published, roles } = raid

  const createdRaid = await createRaid({
    variables: {
      data: {
        name,
        description,
        applicationArea,
        published,
        roles: {
          create: roles.map((role) => ({
            name: role.name,
            builds: {
              create: role.builds.map((build, index) => ({
                build: { connect: { id: build.build.id } },
                index,
              })),
            },
          })),
        },
      },
    },
    refetchQueries: [{ query: ME }],
  })
  if (createdRaid && createdRaid.data && createdRaid.data.createRaid.id) {
    await createRaidRevision({
      variables: {
        data: { raids: { connect: { id: createdRaid.data.createRaid.id } } },
      },
    })
    return raid
  }
}

export const handleAddRevision = async (
  state: IRaidState,
  createRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>,
  addRaidToRevision: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<ExecutionResult<any>>
) => {
  const raid = await createNewRaid(state, createRaid)
  if (raid && raid.data && state.revision) {
    await addRaidToRevision({
      variables: { id: state.revision.id, raidId: raid.data.createRaid.id },
    })
  }
}
