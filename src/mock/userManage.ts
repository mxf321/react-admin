export default [
  {
    url: '/user-manage/list',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          list: [
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '11111',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            },
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '22222',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            },
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '33333',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            },
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '44444',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            }
          ],
          page: 1,
          size: 2,
          total: 4
        }
      }
    }
  },
  {
    url: '/user-manage/all-list',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          list: [
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '111111111111111111111111111111',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            },
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '111111111111111111111111111111',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            },
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '111111111111111111111111111111',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            },
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '111111111111111111111111111111',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            }
          ],
          page: 1,
          size: 2,
          total: 4
        }
      }
    }
  },
  {
    url: '/user-manage/detail',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          username: 'super-admin',
          gender: 'male',
          nationality: '汉',
          province: '广东省',
          openTime: '1716182419832',
          remark: ['吃饭', '睡觉', '玩游戏'],
          address: '广东省深圳市',
          experience: [
            {
              startTime: '1716182419832',
              endTime: '1716112419832',
              title: '公司',
              description: '打杂人员'
            },
            {
              startTime: '1716182419832',
              endTime: '1716112419832',
              title: '公司',
              description: '扫地僧'
            }
          ],
          major: '打杂',
          glory: '全能冠军',
          role: [{ id: '1', title: '超级管理员' }],
          _id: '11111',
          id: 0,
          mobile: '13800138000',
          avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
        }
      }
    }
  },
  {
    url: '/user-manage/batch/import',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          list: [
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '111111111111111111111111111111',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            },
            {
              role: [{ id: '1', title: '超级管理员' }],
              _id: '111111111111111111111111111111',
              id: 0,
              openTime: '1716182419832',
              username: 'super-admin',
              mobile: '13800138000',
              avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
            }
          ],
          page: 1,
          size: 2,
          total: 4
        }
      }
    }
  },
  {
    url: `/user-manage/delete`,
    type: 'delete',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          msg: '删除成功'
        }
      }
    }
  },
  {
    url: `/user-manage/roles`,
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
  // 当前用户角色
  {
    url: `/user-manage/role`,
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
          }
        ]
      }
    }
  },

  // 分配角色
  {
    url: `/user-manage/role/change`,
    type: 'post',
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
          }
        ]
      }
    }
  }
]
