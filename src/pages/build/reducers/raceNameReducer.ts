import { IBuildAction, IBuildState } from '../BuildStateContext'

export const raceNameReducer = (state: IBuildState, action: IBuildAction) => {
  switch (action.type) {
    case 'TOGGLE_IS_PUBLISHED': {
      return {
        ...state,
        published: !state.published,
      }
    }
    case 'SET_APPLICATION_AREA': {
      const { applicationArea } = action.payload
      return {
        ...state,
        applicationArea,
      }
    }
    case 'SET_ROLE': {
      const { role } = action.payload
      return {
        ...state,
        role,
      }
    }
    case 'SET_HEALTH': {
      const { health } = action.payload
      return {
        ...state,
        health
      }
    }
    case 'SET_STAMINA': {
      const { stamina } = action.payload
      return {
        ...state,
        stamina
      }
    }
    case 'SET_MAGICKA': {
      const { magicka } = action.payload
      return {
        ...state,
        magicka
      }
    }
    case 'SET_DESCRIPTION': {
      const { description } = action.payload
      return {
        ...state,
        description,
      }
    }
    case 'SET_BUILD_NAME': {
      const { name } = action.payload
      return {
        ...state,
        name,
      }
    }
    case 'SET_RACE': {
      const { payload } = action
      return {
        ...state,
        race: payload,
      }
    }
    case 'SET_CLASS': {
      const { payload } = action
      return {
        ...state,
        esoClass: payload,
      }
    }
    default:
      return state
  }
}
