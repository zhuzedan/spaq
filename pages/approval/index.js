// pages/approval/index.js
var app = getApp();
var times = require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    list: []
  },
  exAgree(e) {
    console.log(e.currentTarget.dataset.examineid);
    wx.request({
      url: app.globalData.url + '/api/app-approval/updateExamineResult?examineId=' + e.currentTarget.dataset.examineid + '&examineResult=1',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      // data: {
      //   examineId: e.currentTarget.dataset.examineid,
      //   examineResult: 1
      // },
      success: (res) => {
        if (res.data.code == 200) {
          wx.showModal({
            content: '是否同意修改',
            success: (result) => {
              console.log(result);
            },
            fail: (res) => {},
            complete: (res) => {
              if (res.cancel) {
                console.log('取消');
              }
            },
          })
        } else if (res.data.code == 500) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  exDisAgree(e) {
    console.log(e.currentTarget.dataset.examineid);
    wx.request({
      url: app.globalData.url + '/api/app-approval/updateExamineResult?examineId=' + e.currentTarget.dataset.examineid + '&examineResult=2',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      // data: {
      //   examineId: e.currentTarget.dataset.examineid,
      //   examineResult: 1
      // },
      success: (res) => {
        if (res.data.code == 200) {
          wx.showModal({
            content: '是否拒绝修改',
            success: (result) => {
              console.log(result);
            },
            fail: (res) => {},
            complete: (res) => {
              if (res.cancel) {
                console.log('取消');
              }
            },
          })
        } else if (res.data.code == 500) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    wx.request({
      url: app.globalData.url + '/api/app-approval/queryCheckPointExaminePage?leaderUserId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.pageIndex + '&pageSize=5',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data.data.data);
        var dataArray = res.data.data.data
        for (var i = 0; i < dataArray.length; i++) {
          dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
        }
        this.setData({
          list: res.data.data.data
        })
        // console.log(this.data.list);
      },
      fail: (err) => {},
      complete: (res) => {},
    })
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
    var that = this;
    this.data.pageIndex++;
    console.log('加载更多数据', this.data.pageIndex);
    wx.request({
      url: app.globalData.url + '/api/app-approval/queryCheckPointExaminePage?leaderUserId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.pageIndex + '&pageSize=5',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data.data.data);
        var dataArray = res.data.data.data
        for (var i = 0; i < dataArray.length; i++) {
          dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
        }
        if (res.data.code == 200 & res.data.data.data.length != 0) {
          this.setData({
            list: that.data.list.concat(res.data.data.data)
          })
        }else {
          wx.showToast({
            title: '没有更多数据',
            icon: 'none'
          })
        }

        // console.log(this.data.list);
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})