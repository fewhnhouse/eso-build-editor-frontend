import { IBuildAction, IBuildState } from "../BuildStateContext";

export const raceNameReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case "SET_RACE": {
      const { payload } = action;
      return {
        ...state,
        race: payload
      };
    }
    case "SET_CLASS": {
      const { payload } = action;
      return {
        ...state,
        class: payload
      };
    }
    default:
      return state;
  }
};
