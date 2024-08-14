import request from '@/utils/request'

// 获取所有文章
export const getArticleListApi = (data) => {
  return request({
    url: '/article/list',
    method: 'get',
    data
  })
}

// 删除指定文章
export const deleteArticleApi = (data: string | number) => {
  return request({
    url: `/article/delete`,
    method: 'delete',
    data
  })
}

// 拖拽排名 initRanking finalRanking
export const sortArticleApi = (data) => {
  return request({
    url: `/article/sort`,
    method: 'post',
    data
  })
}

// 文章详情
// export const getArticleDetailApi = (articleId) => {
//   return request({
//     url: `/article/${articleId}`,
//   })
// }
export const getArticleDetailApi = (data: string | number) => {
  return request({
    url: `/article`,
    method: 'get',
    data
  })
}

// 创建文章
export const createArticleApi = (data) => {
  return request({
    url: `/article/create`,
    method: 'post',
    data
  })
}

// 编辑文章
export const editArticleApi = (data) => {
  return request({
    url: `/article/edit`,
    method: 'post',
    data
  })
}
