export default [
  {
    url: '/role/list',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: [
          {
            id: '1',
            title: '超级管理员',
            describe: '唯一账号，可以操作系统所有功能'
          },
          {
            id: '2',
            title: '管理员',
            describe: '由超管指定，可以为多个，协助超管管理系统'
          },
          {
            id: '3',
            title: '人事经理',
            describe: '主管人事相关业务'
          },
          {
            id: '4',
            title: '打杂部长',
            describe: '负责打杂相关事务'
          }
        ]
      }
    }
  },
  {
    url: '/role/permission',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: ['1', '1-1', '1-2', '1-3', '2', '2-1', '3', '4', '5']
        // data: ['1', '1-1', '1-2', '1-3', '2', '2-1']
      }
    }
  },
  {
    url: '/role/distribute-permission',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          message: '更新成功'
        }
      }
    }
  }
]
