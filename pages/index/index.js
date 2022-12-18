var app = getApp();
Page({
  data: {
    pageIndex: 1, //列表初始页
    list: [], //存放所有数据
    currentIndex: 0, //默认第一个
    totalCount: 1,
    height: 0,
    latitude: '',
    longitude: ''
  },
  getLocation(e) {
    var that = this,
      address = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset);
    that.setData({
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("定位信息", res);
        var url = 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + address + '&key=VIRBZ-B676P-WDCDC-LVCZD-PUSHO-3NFWZ';
        console.log(url);
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: parseFloat(that.data.latitude), //要去的纬度-地址
          longitude: parseFloat(that.data.longitude), //要去的经度-地址
          fail: (error) => {
            console.log(error);
          }
        })
      }
    })
  },
  // 搜索内容双向绑定，value的值为内容
  search: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  // 确定搜索
  searchOk: function (e) {
    // console.log(e);
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckPointPage',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        current: this.data.pageIndex,
        pageSize: 5,
        name: this.data.searchValue
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res);
          that.setData({
            list: res.data.data.data,
          })
        } else {
          wx.showToast({
            title: '系统发生错误',
          })
        }
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
          console.log(res.data.data.data[0]);
          var dataArray = res.data.data.data
          var categoryBenefit = [] //公益类型的类别编码 
          var categoryCommerce = [] //商业类型的类别编码
          var j = 0,k = 0
          for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i]["businessType"] == 0) {
              categoryBenefit[i] = dataArray[i]["categoryCode"]
              j++
            } else if (dataArray[i]["businessType"] == 1) {
              categoryCommerce[k] = dataArray[i]["categoryCode"]
              k++
            }
          }
          console.log(categoryBenefit);
          console.log(categoryCommerce);
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
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      this.loadInitData()
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
    // console.log('resHeight', res);
    if (screenHeight && bottom) {
      let safeBottom = screenHeight - bottom
      this.setData({
        height: 108 + safeBottom
      })
    }
    // console.log(this.data.height);

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