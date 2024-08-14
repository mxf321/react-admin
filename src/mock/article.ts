export default [
  {
    url: '/article/list',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          list: [
            {
              id: '1',
              ranking: '1',
              title: '标题11',
              author: '作者11',
              publicDate: '1516182419832',
              desc: '内容简介内容简介内容简介内容简介11'
            },
            {
              id: '2',
              ranking: '2',
              title: '标题 22',
              author: '作者 22',
              publicDate: '1618182419832',
              desc: '内容简介内容简介内容简介内容简介 22'
            },
            {
              id: '3',
              ranking: '3',
              title: '标题 33',
              author: '作者 33',
              publicDate: '1616182419832',
              desc: '内容简介内容简介内容简介内容简介 33'
            },
            {
              id: '4',
              ranking: '4',
              title: '标题 44',
              author: '作者 44',
              publicDate: '1716182419832',
              desc: '内容简介内容简介内容简介内容简介 44'
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
    url: `/article/delete`,
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
    url: `/article/sort`,
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          msg: '重新排名成功'
        }
      }
    }
  },
  {
    url: '/article',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          id: '1',
          ranking: '1',
          title: '标题11',
          author: '作者11',
          publicDate: '1516182419832',
          desc: '内容简介内容简介内容简介内容简介11',
          content: '内容简介内容简介内容简介内容简介11'
        }
      }
    }
  },
  {
    url: '/article/create',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          msg: '创建文章成功'
        }
      }
    }
  },
  {
    url: '/article/edit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          id: '1',
          ranking: '1',
          title: '标题11 edit',
          author: '作者11',
          publicDate: '1516182419832',
          desc: '内容简介内容简介内容简介内容简介11 edit',
          content: '内容简介内容简介内容简介内容简介11 edit'
        }
      }
    }
  }
]
