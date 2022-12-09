var app = getApp();
// var time = require('../../utils/time.js')
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
  getInspectionDetail() {
    wx.navigateTo({
      url: '../inspectionDetail/index',
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
      url: app.globalData.url+'/api/app-my/queryReportFormPage?userId='+app.globalData.getUserInfo.userId+
        '&current='+this.data.currentPage+'&pageSize=10',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data);
        // for(var i = 0;i<res.data.data.data.length;i++) {
        //   console.log(res.data.data.data[i]);
        //   res.data.data.data[i]["gtmCreate"] = time.toDate(res.data.data.data[i]["gtmCreate"])
        // }
        if (res.data.code == 200) {
          if (currentPage == 1) {
            that.setData({
              dataList: res.data.data.data
            })
          }else {
            that.setData({
              dataList: dataList.concat(res.data.data.data)
            })
          }
          
        } 
      }
    })
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
    this.data.currentPage = 1;
    this.getAllData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.data.currentPage ++;
    this.getAllData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})