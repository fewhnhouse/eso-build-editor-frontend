import { IRaidAction, IRaidState } from '../RaidStateContext';

export const buildsReducer = (state: IRaidState, action: IRaidAction) => {
  switch (action.type) {
    case 'ADD_ROLE': {
      const { role }: { role: string } = action.payload;
      return {
        ...state,
        roles: [...state.roles, { roleName: role, builds: [] }],
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

    default:
      return state;
  }
};
