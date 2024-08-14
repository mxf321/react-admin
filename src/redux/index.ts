import { configureStore } from '@reduxjs/toolkit'
import { baseReducer } from './base/baseReducer'
import { permissionReducer } from './permission/permissionReducer'
import { themeReducer } from './theme/themeReducer'
import { userSlice } from './user/slice'
import { combineReducers } from 'redux'

import { actionLog } from './middlewares/actionLog'
import { userManageSlice } from './userManage/slice'
import { userRoleSlice } from './userRole/slice'

const rootReducer = combineReducers({
  base: baseReducer,
  permission: permissionReducer,
  theme: themeReducer,
  user: userSlice.reducer,
  userManage: userManageSlice.reducer,
  userRole: userRoleSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(actionLog),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default { store }
