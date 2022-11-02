const app = getApp()
Page({
  data: {
    currentIndex: 0, //默认第一个
  },
  fillReport() {
    wx.navigateTo({
      url: '../fillReport/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})


