var app = getApp();
Page({
  data: {
    pageIndex: 1,         //列表初始页
    list: [],            //存放所有数据
    currentIndex: 0, //默认第一个
    totalCount: 1
  },
  // fillReport() {
  //   wx.navigateTo({
  //     url: '../fillReport/index',
  //   })
  // },
  getLocation(e) {
    var that = this,
    address = e.currentTarget.dataset.address;
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        console.log("定位信息", res);
        var url = 'https://apis.map.qq.com/ws/geocoder/v1/?address='+address+'&key=KFVBZ-2AJ36-N6WSI-EHODX-LRBVS-AIB2U';
        console.log(url);
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.169665,//要去的纬度-地址
          longitude: 121.266579,//要去的经度-地址
          name: "慈溪市逍林多佑食品店",
          address: '慈溪市逍林多佑食品店'
        })
      }
    })
  },
  // 初始加载数据
  loadInitData() {
    var that = this;
    var pageIndex = 1;
    var msg = '加载第'+ pageIndex +'页数据';
    // wx.showLoading({
    //   title: msg,
    // })
    wx.request({
      url: app.globalData.url+'/api/app-check/queryCheckPointPage',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data : {
        current: this.data.pageIndex,
        pageSize: 10
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200){
          console.log(res);
          that.setData({
            pageIndex: pageIndex,
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
  loadMore() {
    let that = this,
    pageIndex = that.data.pageIndex;
    pageIndex += 1;
    wx.request({
      url: app.globalData.url+'/api/app-check/queryCheckPointPage',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data : {
        current: this.data.pageIndex,
        pageSize: 10
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200){
          console.log(res);
          let data = res.data.data;
          let originList = that.data.list;
          let newList = originList.concat(data)
          that.setData({
            pageIndex: pageIndex,
            list: newList
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
        selected: 0
      })
    }
  },
  onLoad() {
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
  onPullDownRefresh: function () {
    var that = this
    that.loadInitData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that= this,
        pageIndex = that.data.pageIndex,
        pageCount = that.data.totalCount;
    //当页面小于总页数时加载下页面
    if(pageIndex < pageCount){
      that.loadMore()
    }else{
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }
  }
})