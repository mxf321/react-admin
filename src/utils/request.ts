import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
  AxiosInstance
} from 'axios'
import { ApiResult } from '@/types/api'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getItem } from './storage'
import { TOKEN } from '@/constant'
import rootStore from '@/redux/index'

export interface RequestConfigExtra {
  token?: boolean
  customDev?: boolean
  loading?: boolean
}

const service: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  baseURL: '',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
// const router = useRouter();
service.interceptors.request.use(
  (config: AxiosRequestConfig & RequestConfigExtra): any => {
    // // 处理请求前的url
    // if (
    //   import.meta.env.DEV &&
    //   import.meta.env.VITE_APP_BASE_API_DEV &&
    //   import.meta.env.VITE_APP_BASE_URL_DEV &&
    //   config.customDev
    // ) {
    //   //  替换url的请求前缀baseUrl
    //   config.baseURL = import.meta.env.VITE_APP_BASE_API_DEV
    // }
    // const token = rootStore.store.getState().user.token || getItem(TOKEN)
    // const  language  =  rootStore.store.getState().base.language;

    // if (token) {
    //   // 在headers后加一个! 表示是一定存在的
    //   // config.headers!['Authorization'] = `Bearer ${token.value}`
    // }
    // // 配置接口国际化
    // config.headers!["Accept-Language"] = language.value;

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse<ApiResult>): any => {
    const res: ApiResult = response.data
    if (res.code !== 200) {
      message.error(res.msg)
    } else {
      return res
    }
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status, statusText } =
        error.response as AxiosResponse<ApiResult>
      if (status === 401) {
        message.error(`401: ${data?.msg || statusText}`)
        const navigate = useNavigate()
        navigate('/login')
        /**
         * 这里处理清空用户信息和token的逻辑，后续扩展
         */
        // router
        //   .push({
        //     path: "/login",
        //     query: {
        //       redirect: router.currentRoute.value.fullPath,
        //     },
        //   })
        //   .then(() => {});
      } else if (status === 403) {
        message.error(`403: ${data?.msg || statusText}`)
      } else if (status === 500) {
        message.error(`500: ${data?.msg || statusText}`)
      } else {
        message.error(`服务错误: ${data?.msg || statusText}`)
      }
    }

    message.error(error.message)
    return Promise.reject(error)
  }
)

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>
export const request = async <T>(
  url: string,
  method: RequestMethods,
  data?: object
) => {
  // 参数：地址，请求方式，提交的数据
  // 返回：promise
  return service.request<any, ApiResult<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: data
  })
}

export default service
