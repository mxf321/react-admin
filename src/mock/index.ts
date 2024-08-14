import Mock from 'mockjs'

import user from './user.ts'
import userManage from './userManage.ts'
import permission from './permission.ts'
import role from './role.ts'
import article from './article.ts'

const mocks = [...user, ...userManage, ...permission, ...role, ...article]
// mock请求方法放在这里统一处理,1是简便写法,2是如果请求路径需要加统一前缀或域名,可以在这里处理
for (const i of mocks) {
  Mock.mock(i.url, i.type, i.response)
}
