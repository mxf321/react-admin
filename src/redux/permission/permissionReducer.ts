import { SET_ROUTES, RoutesActionTypes } from './permissionActions'
import { publicRoutes } from '@/router'
export interface PermissionState {
  routes: IRouteConfigsTable[]
}

const defaultState: PermissionState = {
  routes: publicRoutes
}

export const permissionReducer = (
  state = defaultState,
  action: RoutesActionTypes
) => {
  switch (action.type) {
    case SET_ROUTES:
      return { ...state, routes: action.payload }
    default:
      return state
  }
}
