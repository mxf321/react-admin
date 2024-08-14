import { getItem, setItem } from '@/utils/storage'
import * as variablesScss from '@/styles/variables.module.scss'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { generateNewStyle } from '@/utils/theme'

import { CSS_VAR, SET_MAINCOLOR, ThemeActionTypes } from './themeActions'

export interface ThemeState {
  mainColor: string
  variables: any
}
const defaultState: ThemeState = {
  mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
  variables: variablesScss
}

export const themeReducer = (
  state = defaultState,
  action: ThemeActionTypes
) => {
  switch (action.type) {
    case CSS_VAR:
      return {
        ...state,
        variables: {
          ...state.variables,
          ...generateNewStyle(state.mainColor)
        }
      }
    case SET_MAINCOLOR:
      setItem(MAIN_COLOR, action.payload)
      return {
        ...state,
        mainColor: action.payload
      }
    default:
      return state
  }
}
