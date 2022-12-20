var app = getApp();
var times = require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    currentPage: 1,
    page: 0,
    option1: [
      { text: '月份', value: 0 },
      { text: '1', value: 1 },
      { text: '2', value: 2 },
      { text: '3', value: 3 },
      { text: '4', value: 4 },
      { text: '5', value: 5 },
      { text: '6', value: 6 },
      { text: '7', value: 7 },
      { text: '8', value: 8 },
      { text: '9', value: 9 },
      { text: '10', value: 10 },
      { text: '11', value: 11 },
      { text: '12', value: 12 },
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
      { text: '<60', value: 'f' },
      { text: '60~70', value: 'g' },
      { text: '70~80', value: 'h' },
      { text: '80~90', value: 'i' },
      { text: '90~100', value: 'j' },
    ],
    value1: 0,
    value2: 'a',
    value3: 'd',
    value4: 'e'
  },
  getInspectionDetail(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../inspectionDetail/index?item=' + JSON.stringify(item),
    })
  },
  goEdit(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../inspectionEdit/index?item=' + JSON.stringify(item),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllData();
  },
  getAllData() {
    var that = this;
    var page = this.data.page + 1;
    var currentPage = this.data.currentPage;
    this.setData({
      page
    })
    wx.request({
      url: app.globalData.url + '/api/app-my/queryReportFormPage?userId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.currentPage + '&pageSize=10',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data.data);
        var dataArray = res.data.data.data
        for (var i = 0; i < dataArray.length; i++) {
          dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
        }
        if (res.data.code == 200) {
          if (currentPage == 1) {
            that.setData({
              dataList: res.data.data.data
            })
          } else {
            that.setData({
              dataList: dataList.concat(res.data.data.data)
            })
          }

        }
      }
    })
  },
  handle_content(e) {
    this.setData({
      handle_content: e.detail.value
    })
  },
  to_search() {
    const that = this
    wx.showLoading({
      success: res => {
        wx.request({
          url: app.globalData.url + '/api/app-my/queryReportFormPage?userId=' + app.globalData.getUserInfo.userId +
            '&current=' + this.data.currentPage + '&pageSize=10' + '&pointName=' + this.data.handle_content,
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data.data.data);
            var dataArray = res.data.data.data
            for (var i = 0; i < dataArray.length; i++) {
              dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
            }
            wx.hideLoading()
            if (res.data.code == 200) {
              that.setData({
                dataList: res.data.data.data
              })
            }
          }
        })
      }
    })
  },
  /**,
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
    this.data.currentPage = 1;
    this.getAllData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.data.currentPage++;
    this.getAllData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})