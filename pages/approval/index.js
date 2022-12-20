// pages/approval/index.js
var app = getApp();
var times = require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: false,
    sortSelected: '0',
    sortData: [{
      value: '0',
      label: '检查记录'
    }, {
      value: '1',
      label: '检查审核记录'
    }],
    pageIndex: 1,
    list: [],
    listB: []
  },
  // 关闭筛选
  closeFilter: function () {
    this.setData({
      sort: false,
    })
  },
  // 排序激活
  onSortActive: function (e) {
    this.setData({
      sort: !this.data.sort,
    })
  },
  // 排序
  onSort: function (e) {
    this.closeFilter()
    this.setData({
      sortSelected: e.target.dataset.item.value,
      sortLabel: e.target.dataset.item.label
    })
    console.log(e.target.dataset.item);
    this.addUnique2Array(this.data.selectedArray, e)
    this.triggerEvent('confirm', {
      selectedArray: this.data.selectedArray
    })
  },

  examine(e) {
    console.log(e);
    let examineresult = e.currentTarget.dataset.examineresult
    let examineid = e.currentTarget.dataset.examineid
    let content = examineresult == '1' ? '确认同意审批' : '确认拒绝审批'
    wx.showModal({
      title: '提示',
      content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.showLoading({
            title: '操作中',
            success: res => {
              wx.request({
                url: app.globalData.url + '/api/app-approval/updateExamineResult?examineId=' + examineid + '&examineResult=' + examineresult,
                method: 'POST',
                header: {
                  "Authorization": "Bearer " + app.globalData.userInfo.token
                },
                success: res => {
                  wx.hideLoading()
                  if (res.data.code == 200) {
                    wx.showToast({
                      title: '操作成功',
                      icon: "none"
                    })
                    this.getList()
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: "none"
                    })
                  }
                }
              })
            }
          })
        }
      },
    });
  },
  pointExamine(e) {
    // console.log(e);
    let examineresult = e.currentTarget.dataset.examineresult
    let examineid = e.currentTarget.dataset.examineid
    console.log(examineid);
    let content = examineresult == '1' ? '确认同意审批' : '确认拒绝审批'
    wx.showModal({
      title: '提示',
      content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.showLoading({
            title: '操作中',
            success: res => {
              wx.request({
                url: app.globalData.url + '/api/app-approval/updateReportExamine?reportExamineId=' + examineid + '&examineResult=' + examineresult+ '&leaderUserId=' + app.globalData.getUserInfo.userId,
                method: 'POST',
                header: {
                  "Authorization": "Bearer " + app.globalData.userInfo.token
                },
                success: res => {
                  wx.hideLoading()
                  if (res.data.code == 200) {
                    wx.showToast({
                      title: '操作成功',
                      icon: "none"
                    })
                    this.getList()
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: "none"
                    })
                  }
                }
              })
            }
          })
        }
      },
    });
  },
  onLoad(options) {
    const res = wx.getSystemInfoSync()
    const {
      screenHeight,
      safeArea: {
        bottom
      }
    } = res
    console.log('resHeight', res);
    if (screenHeight && bottom) {
      let safeBottom = screenHeight - bottom
      this.setData({
        height: 108 + safeBottom
      })
    }
    console.log(this.data.height);

  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: "approval"
      })
    }
    this.getList()

  },
  getList() {
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
    wx.request({
      url: app.globalData.url + '/api/app-approval/queryReportExaminePage?leaderUserId=' + app.globalData.getUserInfo.userId +
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
          listB: res.data.data.data
        })
        // console.log(this.data.list);
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  handle_content(e) {
    this.setData({
      handle_content: e.detail.value
    })
  },
  go_search() {
    if (!this.data.handle_content || this.data.handle_content == '') {
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
        },
      })
    } else {
      wx.showLoading({
        success: res => {
          wx.request({
            url: app.globalData.url + '/api/app-approval/queryCheckPointExaminePage?leaderUserId=' + app.globalData.getUserInfo.userId +
              '&current=' + this.data.pageIndex + '&pageSize=5' + '&pointName=' + this.data.handle_content,
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
              wx.hideLoading()
            },
          })
        }
      })
    }
  },
  onPullDownRefresh() {

  },
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
        } else {
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
  onShareAppMessage() {}
})