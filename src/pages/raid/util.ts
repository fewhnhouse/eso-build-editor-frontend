import { IRaidState, IRole } from './RaidStateContext';
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo';
import { ME } from '../home/UserHomeCard';
import { build } from '../../util/fragments';

export const handleEditSave = async (
  state: IRaidState,
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
    description,
    canView,
    published,
    id,
  } = state!;

  //make sure everyone who can edit can also view
  const enhancedCanView: string[] = [
    ...canView,
    ...canEdit.filter(editId => !canView.includes(editId)),
  ];
  console.log(roles, initialRoles);
  await updateRaid({
    variables: {
      data: {
        name,
        description,
        applicationArea,
        canEdit: { connect: canEdit.map(id => ({ id })) },
        canView: { connect: enhancedCanView.map(id => ({ id })) },
        published,
        roles: {
          delete: initialRoles.map((initialRole: IRole) => ({
            id: initialRole.id,
          })),
          create: roles.map(role => {
            const prevRole = initialRoles.find(
              (initialRole: IRole) => initialRole.id === role.id
            );
            const initialSortedBuilds = prevRole ? prevRole.builds : [];

            return {
              name: role.name,
              builds: {
                delete: initialSortedBuilds.map(build => ({ id: build.id })),
                create: role.builds.map((build, index) => ({ index, build })),
              },
            };
          }),
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
  createRaid: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<any>>
) => {
  const {
    name,
    roles,
    applicationArea,
    canEdit,
    canView,
    published,
    description,
  } = state!;

  //make sure everyone who can edit can also view
  const enhancedCanView: string[] = [
    ...canView,
    ...canEdit.filter(editId => !canView.includes(editId)),
  ];

  return await createRaid({
    variables: {
      data: {
        name,
        description,
        applicationArea,
        canEdit: { connect: canEdit.map(id => ({ id })) },
        canView: { connect: enhancedCanView.map(id => ({ id })) },
        published,
        roles: {
          create: roles.map(role => ({
            name: role.name,
            builds: {
              create: role.builds.map((build, index) => ({ build: { connect: { id: build.build.id } }, index })),
            },
          })),
        },
      },
    },
    refetchQueries: [{ query: ME }],
  });
};
