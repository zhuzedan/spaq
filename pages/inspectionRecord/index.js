// pages/inspectionRecord/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    option1: [
      { text: '月份', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    option2: [
      { text: '类型', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    option3: [
      { text: '类别', value: 'd' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    option4: [
      { text: '分数', value: 'e' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    value1: 0,
    value2: 'a',
    value3:'d',
    value4:'e'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
