import {
  type ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'
import { deleteUserApi, getUserManageListApi } from '@/api'
import { GetUserManageItemResult, GetUserManageListResult } from '@/types/api'
export interface IUserManageProps {
  loading: boolean
  error: string | null | unknown
  getUserManageListData: GetUserManageItemResult[]
  getUserManageListTotal: number
  msg: string
}

const initialState: IUserManageProps = {
  loading: true,
  error: null,
  getUserManageListData: [],
  getUserManageListTotal: 0,
  msg: ''
}

export const getUserManageList = createAsyncThunk(
  'user-manage/list',
  async (params: { page: number | string; size: number | string }) => {
    const { data } = await getUserManageListApi(params)
    return data
  }
)

export const deleteUser = createAsyncThunk(
  'user-manage/delete',
  async (rowId: string | number) => {
    const { data } = await deleteUserApi(rowId)
    return data
  }
)

export const userManageSlice = createSlice({
  name: 'userManage',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IUserManageProps>) => {
    builder
      // getUserManageList
      .addCase(getUserManageList.pending, (state) => {
        state.loading = true
      })
      .addCase(
        getUserManageList.fulfilled,
        (state, action: PayloadAction<GetUserManageListResult>) => {
          state.loading = false
          state.getUserManageListData = action.payload.list
          state.getUserManageListTotal = action.payload.total
          state.error = null
        }
      )
      .addCase(
        getUserManageList.rejected,
        (state, action: PayloadAction<string | null | unknown>) => {
          state.loading = false
          state.error = action.payload
        }
      )
      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.msg = action.payload
        state.error = null
      })
      .addCase(
        deleteUser.rejected,
        (state, action: PayloadAction<string | null | unknown>) => {
          state.loading = false
          state.error = action.payload
        }
      )
  }
})
