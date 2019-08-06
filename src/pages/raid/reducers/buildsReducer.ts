import { IRaidAction, IRaidState } from '../RaidStateContext';

export const buildsReducer = (state: IRaidState, action: IRaidAction) => {
  console.log('reducing', state);
  switch (action.type) {
    case 'ADD_ROLE': {
      const { role }: { role: string } = action.payload;
      return {
        ...state,
        roles: [...state.roles, role],
      };
    }

    default:
      return state;
  }
};
