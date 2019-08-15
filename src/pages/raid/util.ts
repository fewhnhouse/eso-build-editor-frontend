import { IRaidState, IRole } from './RaidStateContext';
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common';

export const handleEditSave = async (
  state: IRaidState,
  updateRole: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  createRole: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  updateRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  initialRoles: IRole[]
) => {
  const {
    name,
    roles,
    applicationArea,
    canEdit,
    canView,
    published,
    id,
  } = state!;

  //make sure everyone who can edit can also view
  const enhancedCanView: string[] = [
    ...canView,
    ...canEdit.filter(editId => !canView.includes(editId)),
  ];
  const existingRoles = roles.filter(
    role => role.id !== undefined && role.id !== null
  );

  const newRoles = roles.filter(
    role => role.id === undefined || role.id === null
  );
  console.log(existingRoles, newRoles);
  const createdRoles = await Promise.all(
    roles.map(
      async role =>
        await createRole({
          variables: {
            name: role.name,
            buildIds: role.builds.map(build => build.id),
          },
        })
    )
  );
  const updatedRoles = await Promise.all(
    existingRoles.map(async role => {
      return await updateRole({
        variables: {
          data: {
            name: role.name,
            builds: { connect: role.builds.map(build => ({ id: build.id })) },
          },
          where: { id: role.id },
        },
      });
    })
  );

  await updateRaid({
    variables: {
      data: {
        name,
        applicationArea,
        canEdit: { connect: canEdit.map(id => ({ id })) },
        canView: { connect: enhancedCanView.map(id => ({ id })) },
        published,
        roles: {
          delete: initialRoles.map((initialRole: IRole) => ({
            id: initialRole.id,
          })),
          connect: createdRoles.map((createdRole: any) => ({
            id: createdRole.data.createRole.id,
          })),
        },
      },
      where: {
        id,
      },
    },
  });
};
export const handleCreateSave = async (
  state: IRaidState,
  createRole: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>,
  createRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>
) => {
  const { name, roles, applicationArea, canEdit, canView, published } = state!;
  const createdRoles = await Promise.all(
    roles.map(
      async role =>
        await createRole({
          variables: {
            name: role.name,
            buildIds: role.builds.map(build => build.id),
          },
        })
    )
  );

  //make sure everyone who can edit can also view
  const enhancedCanView: string[] = [
    ...canView,
    ...canEdit.filter(editId => !canView.includes(editId)),
  ];

  return await createRaid({
    variables: {
      data: {
        name,
        applicationArea,
        canEdit: { connect: canEdit.map(id => ({ id })) },
        canView: { connect: enhancedCanView.map(id => ({ id })) },
        published,
        roles: {
          connect: createdRoles.map((createdRole: any) => ({
            id: createdRole.data.createRole.id,
          })),
        },
      },
    },
  });
};
