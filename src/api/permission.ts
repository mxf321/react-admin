import request from '@/utils/request'

// 获取所有权限
export const getPermissionListApi = (roleId = '1') => {
  return request({
    url: '/permission/list',
    method: 'get',
    data: roleId
  })
}
