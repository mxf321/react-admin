export const CSS_VAR = 'cssVar'
export const SET_MAINCOLOR = 'setMainColor'

export interface ICssVarAction {
  type: typeof CSS_VAR
}

export interface ISetMainColorAction {
  type: typeof SET_MAINCOLOR
  payload: string
}

export type ThemeActionTypes = ICssVarAction | ISetMainColorAction

export const cssVarCreator = (): ICssVarAction => {
  return {
    type: CSS_VAR
  }
}

export const setMainColorCreator = (newColor: string): ISetMainColorAction => {
  return {
    type: SET_MAINCOLOR,
    payload: newColor
  }
}
