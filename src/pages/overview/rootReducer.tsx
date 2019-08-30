import { IOverviewAction, IOverviewState } from './OverviewStateContext'

export const rootReducer = (state: IOverviewState, action: IOverviewAction) => {
  switch (action.type) {
    case 'SET_BUFF': {
      const { buff } = action.payload
      return {
        ...state,
        buff,
      }
    }

    case 'SET_SKILLLINE': {
      const { skillLine } = action.payload
      return {
        ...state,
        skillLine,
      }
    }

    case 'SET_ITEMSET': {
      const { selectedSet } = action.payload
      return {
        ...state,
        selectedSet,
      }
    }
    case 'SET_MUNDUS': {
      const { mundusStone } = action.payload
      return {
        ...state,
        mundusStone,
      }
    }

    default:
      return state
  }
}
