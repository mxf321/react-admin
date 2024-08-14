import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { loginApi, getUserInfoApi } from '@/api'
import { setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import type { GetUserInfoResult } from '@/types/api'
import { setTimeStamp } from '@/utils/auth'

export interface IUserState {
  loading: boolean
  error: string | null | unknown
  token: string | null
  userInfo: GetUserInfoResult | null
  hasUserInfo: boolean
}

const initialState: IUserState = {
  loading: true,
  error: null,
  token: null,
  userInfo: null,
  hasUserInfo: false
}

export const login = createAsyncThunk(
  'user/login',
  async (params: {
    username: string | undefined
    password: string | undefined
  }) => {
    const { data } = await loginApi(params)
    setItem(TOKEN, data.accessToken)
    // 保存登录时间
    setTimeStamp()
    return data.accessToken
  }
)

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const { data } = await getUserInfoApi()
  return data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.loading = false
      state.token = null
      state.error = null
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.token = action.payload
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getUserInfo
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(
        getUserInfo.fulfilled,
        (state, action: PayloadAction<GetUserInfoResult>) => {
          state.loading = false
          state.userInfo = action.payload
          state.error = null
        }
      )
      .addCase(
        getUserInfo.rejected,
        (state, action: PayloadAction<string | null | unknown>) => {
          state.loading = false
          state.error = action.payload
        }
      )
  }
})

export const { logOut } = userSlice.actions
