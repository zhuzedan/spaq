var app = getApp();
Page({
  data: {
    pageIndex: 1, //列表初始页
    list: [], //存放所有数据
    currentIndex: 0, //默认第一个
    totalCount: 1,
    height: 0
  },
  getLocation(e) {
    var that = this,
      address = e.currentTarget.dataset.address;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("定位信息", res);
        var url = 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + address + '&key=KFVBZ-2AJ36-N6WSI-EHODX-LRBVS-AIB2U';
        console.log(url);
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: 30.169665, //要去的纬度-地址
          longitude: 121.266579, //要去的经度-地址
          name: "慈溪市逍林多佑食品店",
          address: '慈溪市逍林多佑食品店'
        })
      }
    })
  },
  // 初始加载数据
  loadInitData() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckPointPage',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        current: this.data.pageIndex,
        pageSize: 5
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res);
          that.setData({
            list: res.data.data.data,
            totalCount: res.data.data.totalCount
          })
        } else {
          wx.showToast({
            title: '系统发生错误',
          })
        }
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
        selected: "index"
      })
    }
  },
  onLoad() {
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
    // console.log(this.data.height);

    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      this.loadInitData()
    }
    // Dialog.alert({
    //   message: '团队长已拒绝您的请求！',
    // })
    //   .then(() => {
    //     // on confirm
    //   })
    //   .catch(() => {
    //     // on cancel
    //   });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    this.data.pageIndex++;
    console.log('加载更多数据', this.data.pageIndex);
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckPointPage',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        current: this.data.pageIndex,
        pageSize: 5
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.data);
        if (res.data.code == 200 & res.data.data.data.length != 0) {
          // console.log(res);
          that.setData({
            list: that.data.list.concat(res.data.data.data),
          })
        } else {
          wx.showToast({
            title: '没有更多数据',
            icon: 'none'
          })
        }
      }
    })
  }
})