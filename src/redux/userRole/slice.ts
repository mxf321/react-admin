import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction
} from '@reduxjs/toolkit'
import { getRoleListApi } from '@/api'
import type { GetRoleItemResult } from '@/types/api'
export interface IUserRoleProps {
  loading: boolean
  error: string | null | unknown
  getRoleListData: GetRoleItemResult[]
  msg: string
}

const initialState: IUserRoleProps = {
  loading: true,
  error: null,
  getRoleListData: [],
  msg: ''
}

export const getRoleList = createAsyncThunk('role/list', async () => {
  const { data } = await getRoleListApi()
  return data
})

export const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IUserRoleProps>) => {
    builder
      // getRoleList
      .addCase(getRoleList.pending, (state) => {
        state.loading = true
      })
      .addCase(
        getRoleList.fulfilled,
        (state, action: PayloadAction<GetRoleItemResult[]>) => {
          state.loading = false
          state.getRoleListData = action.payload
          state.error = null
        }
      )
      .addCase(
        getRoleList.rejected,
        (state, action: PayloadAction<string | null | unknown>) => {
          state.loading = false
          state.error = action.payload
        }
      )
  }
})
