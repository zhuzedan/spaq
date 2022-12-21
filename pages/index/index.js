var app = getApp();
Page({
  data: {
    filterdata: {}, //筛选条件数据
    showfilter: false, //是否显示下拉筛选
    showfilterindex: null, //显示哪个筛选类目
    cateindex: 0, //一级分类索引
    cateid: null, //一级分类id
    subcateindex: 0, //二级分类索引
    subcateid: null, //二级分类id
    areaindex: 0, //一级城市索引
    areaid: null, //一级城市id
    subareaindex: 0, //二级城市索引
    subareaid: null, //二级城市id
    scrolltop: null, //滚动位置
    page: 0, //分页
    category: {},
    area: {},
    sort: {},
    pageIndex: 1, //列表初始页
    list: [], //存放所有数据
    currentIndex: 0, //默认第一个
    totalCount: 1,
    height: 0,
    latitude: '',
    longitude: ''
  },
  fetchFilterData: function () { //获取筛选条件
    this.setData({
      category: [{
          "id": 0,
          "title": "全部"
        },
        {
          "id": 27,
          "title": "公益",
          "cate_two": [{
            "id": 4,
            "title": "养老院"
          }]
        },
        {
          "id": 24,
          "title": "商业",
          "cate_two": [{
              "id": "24",
              "title": "餐饮企业"
            },
            {
              "id": 25,
              "title": "建筑工地"
            }
          ]
        }
      ],
      area: [{
          "id": 0,
          "name": "全城"
        },
        {
          "id": 12,
          "name": "鄞州区",
          "zone": [{
              "id": 38,
              "name": "钟公庙街道"
            },
            {
              "id": 39,
              "name": "下应街道"
            },
            {
              "id": 40,
              "name": "潘火街道"
            },
            {
              "id": 39,
              "name": "首南街道"
            }
          ]
        },
        {
          "id": 20,
          "name": "江北区"
        },
        {
          "id": 21,
          "name": "海曙区",
          "zone": []
        },
        {
          "id": 22,
          "name": "镇海区"
        },
        {
          "id": 23,
          "name": "北仑区",
          "zone": [{
            "id": 55,
            "name": "金桥"
          }]
        }
      ],
      sort: [
        {
          "id": 12,
          "name": "时间排序"
        },
        {
          "id": 12,
          "name": "距离排序"
        }
      ]
    })
  },
  setFilterPanel: function (e) { //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (this.data.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
    console.log('显示第几个筛选类别：' + d.showfilterindex);
  },
  setCateIndex: function (e) { //分类一级索引
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    console.log(e);
    this.setData({
      cateindex: dataset.cateindex,
      cateid: dataset.cateid,
      subcateindex: d.cateindex == dataset.cateindex ? d.subcateindex : 0
    })
    // console.log('商家分类：一级id__' + this.data.cateid + ',二级id__' + this.data.subcateid);
  },
  setSubcateIndex: function (e) { //分类二级索引
    const dataset = e.currentTarget.dataset;
    this.hideFilter()
    this.setData({
      subcateindex: dataset.subcateindex,
      subcateid: dataset.subcateid,
    })
    console.log('商家分类：一级id__' + this.data.cateid + ',二级id__' + this.data.subcateid);
  },
  setAreaIndex: function (e) { //地区一级索引
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      areaindex: dataset.areaindex,
      areaid: dataset.areaid,
      subareaindex: d.areaindex == dataset.areaindex ? d.subareaindex : 0
    })
    console.log('所在地区：一级id__' + this.data.areaid + ',二级id__' + this.data.subareaid);
    console.log(this.data);
  },
  setSubareaIndex: function (e) { //地区二级索引
    const dataset = e.currentTarget.dataset;
    console.log(dataset);
    this.hideFilter()
    this.setData({
      subareaindex: dataset.subareaindex,
      subareaid: dataset.subareaid,
    })
    // console.log('所在地区：一级id__' + this.data.areaid + ',二级id__' + this.data.subareaid);
  },
  setSortIndex: function (e) {    //排序索引
    const dataset = e.currentTarget.dataset;
    this.setData({
      sortindex: dataset.sortindex,
      sortid: dataset.sortid,
    })
    console.log('所在地区：一级id__' + this.data.sortid );
    console.log(this.data);
    this.hideFilter()
  },
  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
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
    this.fetchFilterData();
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