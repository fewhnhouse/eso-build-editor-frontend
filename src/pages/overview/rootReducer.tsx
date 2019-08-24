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
