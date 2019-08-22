import { IRaidAction, IRaidState, IRole } from '../RaidStateContext';

export const buildsReducer = (state: IRaidState, action: IRaidAction) => {
  switch (action.type) {
    case 'ADD_ROLE': {
      const { name }: { name: string } = action.payload;
      return {
        ...state,
        roles: [...state.roles, { name, builds: [] }],
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
          role.name === oldRoleName
            ? { name: newRoleName, builds: role.builds }
            : role
        ),
      };
    }
    case 'REMOVE_ROLE': {
      const { name }: { name: string } = action.payload;
      return {
        ...state,
        roles: state.roles.filter(role => role.name !== name),
      };
    }

    case 'ADD_BUILD': {
      const { name, build } = action.payload;
      return {
        ...state,
        roles: state.roles.map(role =>
          role.name === name
            ? {
                name,
                builds: [...role.builds, { index: role.builds.length, build }],
              }
            : role
        ),
      };
    }

    case 'REMOVE_BUILD': {
      const { name, buildId } = action.payload;
      const role: IRole | undefined = state.roles.find(
        role => role.name === name
      );
      const buildIndex = role
        ? role.builds.findIndex(roleBuild => roleBuild.build.id === buildId)
        : -1;
      return {
        ...state,
        roles: state.roles.map(role =>
          role.name === name
            ? {
                name,
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
