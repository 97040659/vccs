const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')

const List = []
const count = 999
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      name: '@title(1, 2)',
      cost: '@float(1.00,10000.00)',
      rent: '@float(1.00,500.00)',
      num: '@integer(1, 5000)',
      'size|1': ['S', 'M', 'L','XL','XXL','XXXL'],
      'address': '@county(true)',
      img: handleRandomImage(200, 200),
      'status|1': ['未发货', '待签收', '待归还','已完成'],
      author: '@cname',
      datetime: '@datetime',
      pageViews: '@integer(300, 5000)',
      smallImg: handleRandomImage(40, 40),
      switch: '@boolean',
      percent: '@integer(80,99)',
    })
  )
}

module.exports = [
  {
    url: '/table/getList',
    type: 'post',
    response(config) {
      if (!config.body) {
        return {
          code: 200,
          msg: 'success',
          totalCount: count,
          data: mock({
            'data|50': [
              {
                uuid: '@uuid',
                id: '@id',
                name: '@csentence(1, 2)',
                'cost|1-10000.1-10':1,
                'rent|1-1000.1-10':1,
                num: '@integer(1, 5000)',
                'size|1': ['未发货', '待签收', '待归还','已完成'],
                'address': '@county(true)',
                img: handleRandomImage(200, 200),
                'status|1': ['未发货', '待签收', '待归还','已完成'],
                author: '@cname',
                datetime: '@datetime',
                pageViews: '@integer(300, 5000)',
                smallImg: handleRandomImage(40, 40),
                switch: '@boolean',
                percent: '@integer(80,99)',
              },
            ],
          }).data,
        }
      }
      const { title = '', pageNo = 1, pageSize = 20 } = config.body
      let mockList = List.filter((item) => {
        return !(title && item.title.indexOf(title) < 0)
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount: count,
        data: pageList,
      }
    },
  },
  {
    url: '/table/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/table/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
