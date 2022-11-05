const app = getApp()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
  data: {
    currentIndex: 0, //默认第一个
  },
  fillReport() {
    wx.navigateTo({
      url: '../fillReport/index',
    })
  },
  getLocation() {
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.169665,//要去的纬度-地址
          longitude: 121.266579,//要去的经度-地址
          name: "慈溪市逍林多佑食品店",
          address: '慈溪市逍林多佑食品店'
        })
      }
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
  },
  onLoad() {
    Dialog.alert({
      message: '团队长已拒绝您的请求！',
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  }
})