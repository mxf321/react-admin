import request from '@/utils/request'

// 登录
export const loginApi = async (data?: object) => {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
//注册
export const registerApi = (data?: object) => {
  return request({
    method: 'post',
    url: '/api/register',
    data
  })
}
export function getUserInfoApi() {
  return request({
    url: '/userInfo',
    method: 'get'
  })
}
// 获取项目功能
export const getFeatureApi = () => {
  return request({
    url: '/user/feature',
    method: 'get'
  })
}
// 获取章节功能
export const getChapterApi = () => {
  return request({
    url: '/user/chapter',
    method: 'get'
  })
}
