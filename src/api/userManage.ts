import request from '@/utils/request'
// 获取用户列表数据
export const getUserManageListApi = (data) => {
  return request({
    url: '/user-manage/list',
    method: 'post',
    data
  })
}

// 获取所有用户列表数据
export const getUserManageAllListApi = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

// 获取用户详情
export const getUserDetailApi = (data) => {
  return request({
    url: '/user-manage/detail',
    method: 'get',
    data
  })
}
// 批量上传
export const userBatchImportApi = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'post',
    data
  })
}

// 删除指定数据
export const deleteUserApi = (data) => {
  return request({
    url: `/user-manage/delete`,
    method: 'delete',
    data
  })
}

// 获取所有用户角色
export const getRolesListApi = (data) => {
  return request({
    url: `/user-manage/roles`,
    method: 'get',
    data
  })
}

// 获取指定用户的角色
export const getUserRolesApi = (data) => {
  return request({
    url: `/user-manage/role`,
    method: 'get',
    data
  })
}

// 为员工分配角色
export const changeUserRolesApi = (data) => {
  return request({
    url: `/user-manage/role/change`,
    method: 'post',
    data
  })
}
