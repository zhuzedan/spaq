const app = getApp()
Page({
  data: {
    currentIndex: 0, //默认第一个
  },
  fillReport() {
    wx.navigateTo({
      url: '../fillReport/index',
    })
  }
})


