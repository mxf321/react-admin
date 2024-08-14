import { configureStore } from '@reduxjs/toolkit'
import { baseReducer } from './base/baseReducer'
import { permissionReducer } from './permission/permissionReducer'
import { themeReducer } from './theme/themeReducer'
import { userSlice } from './user/slice'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { actionLog } from './middlewares/actionLog'
import { userManageSlice } from './userManage/slice'
import { userRoleSlice } from './userRole/slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  base: baseReducer,
  permission: permissionReducer,
  theme: themeReducer,
  user: userSlice.reducer,
  userManage: userManageSlice.reducer,
  userRole: userRoleSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(actionLog),
  devTools: true
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default { store, persistor }
