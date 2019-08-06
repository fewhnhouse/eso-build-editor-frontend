import { IRaidAction, IRaidState } from '../RaidStateContext';

export const generalReducer = (state: IRaidState, action: IRaidAction) => {
  switch (action.type) {
    case 'SET_CAN_VIEW': {
      const { canView } = action.payload;
      return {
        ...state,
        canView,
      };
    }
    case 'SET_CAN_EDIT': {
      const { canEdit } = action.payload;
      return {
        ...state,
        canEdit,
      };
    }
    case 'SET_PUBLISHED': {
      const { published } = action.payload;
      return {
        ...state,
        published,
      };
    }
    case 'SET_GROUP_SIZE': {
      const { size } = action.payload;
      return {
        ...state,
        size,
      };
    }
    case 'SET_RAID_DESCRIPTION': {
      const { description } = action.payload;
      return {
        ...state,
        description,
      };
    }
    case 'SET_RAID_NAME': {
      const { name } = action.payload;
      return {
        ...state,
        name,
      };
    }
    case 'SET_RAID_APPLICATION_AREA': {
      const { applicationArea } = action.payload;
      return {
        ...state,
        applicationArea,
      };
    }
    default:
      return state;
  }
};
