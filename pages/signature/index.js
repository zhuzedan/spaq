// pages/signature/index.jszz
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportFormId: '',
    image: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.reportFormId);
    this.setData({
      reportFormId: options.reportFormId
    })
  },
  onMyEvent: function (e) {
    console.log(e.detail);
    wx.request({
      url: app.globalData.url+'/api/app-check/updateReportFormSignature?reportFormId='+this.data.reportFormId+'&signatureAdd='+e.detail,
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: (result) => {
        console.log(result.data);
        if (result.data.code == 200) {
          wx.showToast({
            title: '成功提交',
            icon: 'none'
          })
        }
        else if (result.data.code == 500) {
          wx.showToast({
            title: '出现异常',
            icon:'none'
          })
        }
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  submit() {
    wx.request({
      url: app.globalData.url+'/api/app-check/updateReportFormSignature?reportFormId='+this.data.reportFormId+'&signatureAdd='+this.data.image,
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: (result) => {
        console.log(result.data);
      },
      fail: (err) => {},
      complete: (res) => {},
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