import request from '@/utils/request'

// 获取所有角色
export const getRoleListApi = () => {
  return request({
    url: '/role/list'
  })
}

// 获取当前角色对应的权限
export const getRolePermissionApi = (data) => {
  return request({
    url: '/role/permission',
    method: 'get',
    data
  })
}

// 为角色分配权限
export const distributePermissionApi = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'post',
    data
  })
}
