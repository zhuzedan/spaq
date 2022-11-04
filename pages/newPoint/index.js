// pages/newPoint/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUnit: false, //单位弹层控制
    columns: ['公益', '商业'],
    unit:''
  },
  // 弹出选择单位
  getUnit(e) {
    wx.hideKeyboard();
    this.showPopup();
  },
  showPopup() {
    this.setData({
      showUnit: true
    });
  },
  // 弹窗关闭
  onCloseUnit() {
    this.setData({
      showUnit: false
    });
  },
  //单位选择确认
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      unit:value
    })
    this.onCloseUnit();

  },
  //单位取消选择器
  onCancel() {
    this.onCloseUnit();
    console.log('value:', value)
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