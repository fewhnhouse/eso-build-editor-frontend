import { IRaidAction, IRaidState, IRole } from '../RaidStateContext';

export const buildsReducer = (state: IRaidState, action: IRaidAction) => {
  switch (action.type) {
    case 'ADD_ROLE': {
      const { role }: { role: string } = action.payload;
      return {
        ...state,
        roles: [...state.roles, { roleName: role, builds: [] }],
      };
    }
    case 'EDIT_ROLE': {
      const {
        oldRoleName,
        newRoleName,
      }: { oldRoleName: string; newRoleName: string } = action.payload;
      return {
        ...state,
        roles: state.roles.map(role =>
          role.roleName === oldRoleName
            ? { roleName: newRoleName, builds: role.builds }
            : role
        ),
      };
    }
    case 'REMOVE_ROLE': {
      const { roleName }: { roleName: string } = action.payload;
      return {
        ...state,
        roles: state.roles.filter(role => role.roleName !== roleName),
      };
    }

    case 'ADD_BUILD': {
      const { roleName, build } = action.payload;
      return {
        ...state,
        roles: state.roles.map(role =>
          role.roleName === roleName
            ? { roleName, builds: [...role.builds, build] }
            : role
        ),
      };
    }

    case 'REMOVE_BUILD': {
      const { roleName, buildId } = action.payload;
      const role: IRole | undefined = state.roles.find(
        role => role.roleName === roleName
      );
      const buildIndex = role
        ? role.builds.findIndex(roleBuild => roleBuild.id === buildId)
        : -1;
      return {
        ...state,
        roles: state.roles.map(role =>
          role.roleName === roleName
            ? {
                roleName,
                builds: role.builds.filter(
                  (build, index) => index !== buildIndex
                ),
              }
            : role
        ),
      };
    }

    default:
      return state;
  }
};
