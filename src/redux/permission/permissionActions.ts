export const SET_ROUTES = 'set_routes'
export const FILTER_ROUTES = 'filter_routes'

export interface ISetRoutesAction {
  type: typeof SET_ROUTES
  payload: IRouteConfigsTable[]
}

export type RoutesActionTypes = ISetRoutesAction

export const setRoutesActionCreator = (
  newRoutes: IRouteConfigsTable[]
): ISetRoutesAction => {
  return {
    type: SET_ROUTES,
    payload: newRoutes
  }
}
