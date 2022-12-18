var app = getApp();
var times = require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1, //列表初始页
    list: [], //存放所有数据
    option1: [{
      text: '月份',
      value: 0
    },
    {
      text: '新款商品',
      value: 1
    },
    {
      text: '活动商品',
      value: 2
    },
    ],
    option2: [{
      text: '类型',
      value: 'a'
    },
    {
      text: '好评排序',
      value: 'b'
    },
    {
      text: '销量排序',
      value: 'c'
    },
    ],
    option3: [{
      text: '类别',
      value: 'd'
    },
    {
      text: '好评排序',
      value: 'b'
    },
    {
      text: '销量排序',
      value: 'c'
    },
    ],
    option4: [{
      text: '状态',
      value: 'e'
    },
    {
      text: '好评排序',
      value: 'b'
    },
    {
      text: '销量排序',
      value: 'c'
    },
    ],
    value1: 0,
    value2: 'a',
    value3: 'd',
    value4: 'e'
  },
  getDetail(e) {
    let index = e.currentTarget.dataset.index
    let item = JSON.stringify(this.data.list[index])
    wx.navigateTo({
      url: '../auditDetail/index?item=' + item,
    })
  },
  getModify(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../auditModify/index?id=' + id,
    })
  },
  hanlde_content(e) {
    this.setData({
      hanlde_content: e.detail.value
    })
  },
  go_search() {
    wx.showLoading({
      title: '查询中',
      success: res => {
        wx.request({
          url: app.globalData.url + '/api/app-approval/queryCheckPointExaminePage?leaderUserId=' + app.globalData.getUserInfo.userId +
            '&current=' + this.data.pageIndex + '&pageSize=5' + '&pointName=' + this.data.hanlde_content,
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          method: "POST",
          success: res => {
            for (var i = 0; i < dataArray.length; i++) {
              dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
              if (dataArray[i]["examineResult"] == 0) {
                dataArray[i]["examineResult"] = '待审核'
              } else if (dataArray[i]["examineResult"] == 1) {
                dataArray[i]["examineResult"] = '通过'
              } else if (dataArray[i]["examineResult"] == 2) {
                dataArray[i]["examineResult"] = '未通过'
              }
            }
            wx.hideLoading()
            if (res.data.code == 200) {
              that.setData({
                list: res.data.data.data
              })
              wx.showToast({
                title: '查询成功',
                icon:"none"
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllData()
  },
  // 加载数据
  getAllData() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/app-my/queryCheckPointExaminePage?checkPersonId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.pageIndex + '&pageSize=5',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data.data);
        var dataArray = res.data.data.data
        for (var i = 0; i < dataArray.length; i++) {
          dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
          if (dataArray[i]["examineResult"] == 0) {
            dataArray[i]["examineResult"] = '待审核'
          } else if (dataArray[i]["examineResult"] == 1) {
            dataArray[i]["examineResult"] = '通过'
          } else if (dataArray[i]["examineResult"] == 2) {
            dataArray[i]["examineResult"] = '未通过'
          }
        }
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data.data
          })
        }
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    this.data.pageIndex++;
    console.log('加载更多数据', this.data.pageIndex);
    wx.request({
      url: app.globalData.url + '/api/app-my/queryCheckPointExaminePage?checkPersonId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.pageIndex + '&pageSize=5',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data.data);
        if (res.data.code == 200 & res.data.data.data.length != 0) {
          // console.log(res);
          that.setData({
            list: that.data.list.concat(res.data.data.data),
          })
        } else {
          wx.showToast({
            title: '没有更多数据',
            icon: 'none'
          })
        }
      }
    })
  },
  screenShow: function () { //综合下拉
    if (this.data.screenFlag) {
      this.setData({
        screenFlag: !this.data.screenFlag,
        brandFlag: false,
      })
    } else {
      this.setData({
        screenFlag: !this.data.screenFlag,
        brandFlag: false,
      })
    }
  },
  screenChoice: function (e) { //综合下拉选择子项
    console.log(e)
    this.setData({
      screen: e.currentTarget.dataset.item,
      "screenDown.screen": e.currentTarget.dataset.index,
      screenFlag: false,
      screenColor: true
    })
  },
  handletouchtart: function (event) { //点击透明背景隐藏下拉
    this.setData({
      screenFlag: false,
      brandFlag: false
    })
  },

  brandShow: function () { //品牌下拉
    if (this.data.brandFlag) {
      this.setData({
        brandFlag: !this.data.brandFlag,
        screenFlag: false,
      })
    } else {
      this.setData({
        brandFlag: !this.data.brandFlag,
        screenFlag: false,
      })
    }
  },
  radioChange: function (e) { //品牌选择
    console.log(e)
    this.setData({
      brandText: e.detail.value,
      brandFlag: false,
      brandColor: true
    })
  },
  salesNumber: function () { //销量
    if (this.data.salesColor) {
      this.setData({
        salesColor: "",
        screenFlag: false,
        brandFlag: false,
      })
    } else {
      this.setData({
        salesColor: "#F46458",
        screenFlag: false,
        brandFlag: false,
      })
    }

  },
})