// pages/auditDetail/index.js
var app = getApp();
var times = require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    let item=JSON.parse(options.item)
    this.setData({
      info:item
    })
    // var that = this;
    // wx.request({
    //   url: app.globalData.url+'/api/app-my/queryCheckPointExamineOne',
    //   data: {
    //     checkPersonId: options.checkPersonId
    //   },
    //   header: {
    //     "Authorization": "Bearer " + app.globalData.userInfo.token
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res.data.data);
    //     // 时间戳格式转换
    //     res.data.data.gmtCreate = times.toDate(res.data.data.gmtCreate)
    //     // 审核状态
    //     if (res.data.data.examineResult == 0) {
    //       res.data.data.examineResult = '待审核'
    //     } else if (res.data.data.examineResult == 1) {
    //       res.data.data.examineResult = '待审核'
    //     } else if (res.data.data.examineResult == 2) {
    //       res.data.data.examineResult = '待审核'
    //     }
    //     that.setData({
    //       info: res.data.data
    //     })
    //   },
    //   fail: function (error) {
    //     console.log(error);
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})