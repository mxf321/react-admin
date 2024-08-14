const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken'
}

export default [
  {
    url: '/publicKey',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB'
        }
      }
    }
  },
  // 登录数据
  {
    url: '/api/login',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
        data: { accessToken: 'eyJhbGciOiJIUzUxMiJ9.admin' }
      }
    }
  },
  // 权限控制的接口数据
  {
    url: '/userInfo',
    type: 'get',
    response(config) {
      // const { accessToken } = config.body
      // mock 数据
      // let accessToken = 'admin-accessToken'
      // let permissions = ['admin']
      // let username = 'admin'
      // if (accessToken === 'admin-accessToken') {
      //   permissions = ['admin']
      //   username = 'admin'
      // }
      // if (accessToken === 'editor-accessToken') {
      //   permissions = ['editor']
      //   username = 'editor'
      // }
      // if (accessToken === 'test-accessToken') {
      //   permissions = ['admin', 'editor']
      //   username = 'test'
      // }

      return {
        code: 200,
        msg: 'success',
        data: {
          username: 'admin',
          avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
          title: '超级管理员',
          permissions: {
            menus: [
              'userManage',
              'roleList',
              'permissionList',
              'articleRanking',
              'articleCreate'
            ],
            points: [
              'distributeRole',
              'importUser',
              'removeUser',
              'distributePermission'
            ]
          }
        }
      }
    }
  },
  {
    url: '/user/feature',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: [
          {
            id: 'a',
            title: 'aaaa',
            percentage: '100',
            content: 'aaaaaaaaaaaaaaaaaaaaaa'
          },
          {
            id: 'b',
            title: 'bbb',
            percentage: '80',
            content: 'bbbbbbbbbbbbbbbbbb'
          },
          {
            id: 'c',
            title: 'cccc',
            percentage: '100',
            content: 'cccccccccccccccc'
          },
          {
            id: 'd',
            title: 'dddd',
            percentage: '90',
            content: 'dddddddddddddddd'
          },
          {
            id: 'e',
            title: 'eeee',
            percentage: '100',
            content: 'eeeeeeeeeeeeeeee'
          }
        ]
      }
    }
  },
  {
    url: '/user/chapter',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: [
          {
            id: 'achapter',
            title: 'aaaachapter',
            timestamp: '第一章',
            content: 'aaaaaaaaaaaaaaaaaaaaaa'
          },
          {
            id: 'bchapter',
            title: 'bbbchapter',
            timestamp: '第二章',
            content: 'bbbbbbbbbbbbbbbbbb'
          },
          {
            id: 'cchapter',
            title: 'ccccchapter',
            timestamp: '第三章',
            content: 'cccccccccccccccc'
          },
          {
            id: 'dchapter',
            title: 'ddddchapter',
            timestamp: '第四章',
            content: 'dddddddddddddddd'
          },
          {
            id: 'echapter',
            title: 'eeeechapter',
            timestamp: '第五章',
            content: 'eeeeeeeeeeeeeeee'
          }
        ]
      }
    }
  },
  // test
  {
    url: '/login',
    type: 'post',
    response(config) {
      const { username } = config.body
      const accessToken = accessTokens[username]
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确。'
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken }
      }
    }
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功'
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success'
      }
    }
  }
]
