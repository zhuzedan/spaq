var app = getApp();
var times = require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
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
    status: {},
    pageIndex: 1, //列表初始页
    list: [], //存放所有数据
    value1: 0,
    value2: 'a',
    value3: 'd',
    value4: 'e'
  },
  onShow(){
    this.get_type()
  },
  fetchFilterData: function () { //获取筛选条件
    this.setData({
      status: [
        {
          "id": 'undefind',
          "name": "全部"
        },
        {
          "id": 0,
          "name": "未审批"
        },
        {
          "id": 1,
          "name": "审批通过",
        },
        {
          "id": 2,
          "name": "未通过"
        },
      ],
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
    const that = this
    this.hideFilter()
    this.setData({
      subcateindex: dataset.subcateindex,
      subcateid: dataset.subcateid,
    })
    if (this.data.cateid == 'undefind') {
      this.getAllData()
    }
    else {
      wx.showLoading({
        success: res => {
          wx.request({
            url: app.globalData.url + '/api/app-my/queryCheckPointExaminePage?checkPersonId=' + app.globalData.getUserInfo.userId +
              '&current=' + this.data.pageIndex + '&pageSize=5' + '&categoryCode=' + this.data.cateid + '&categoryCode=' + this.data.subcateid,
            header: {
              "Authorization": "Bearer " + app.globalData.userInfo.token
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              wx.hideLoading()
              var dataArray = res.data.data.data
              for (var i = 0; i < dataArray.length; i++) {
                dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
                if (dataArray[i]["examineResult"] == 0) {
                  dataArray[i]["examineResult"] = '待审核'
                } else if (dataArray[i]["examineResult"] == 1) {
                  dataArray[i]["examineResult"] = '通过'
                } else if (dataArray[i]["examineResult"] == 2) {
                  dataArray[i]["examineResult"] = '未通过'
                }
              }
              if (res.data.code == 200) {
                that.setData({
                  list: res.data.data.data
                })
              }
            },
          })
        }
      })
    }
    console.log('商家分类：一级id__' + this.data.cateid + ',二级id__' + this.data.subcateid);
  },
  setStatusIndex: function (e) { //月份索引
    // const d = this.data;
    const that = this
    const { statusindex, statusid } = e.currentTarget.dataset
    this.setData({
      statusindex,
      statusid
    })
    if (statusid == 'undefind') {
      this.getAllData()
    }
    else {
      wx.showLoading({
        success: res => {
          wx.request({
            url: app.globalData.url + '/api/app-my/queryCheckPointExaminePage?checkPersonId=' + app.globalData.getUserInfo.userId +
              '&current=' + this.data.pageIndex + '&pageSize=5' + '&status=' + statusid,
            header: {
              "Authorization": "Bearer " + app.globalData.userInfo.token
            },
            method: 'POST',
            success: function (res) {
              wx.hideLoading()
              var dataArray = res.data.data.data
              for (var i = 0; i < dataArray.length; i++) {
                dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
                if (dataArray[i]["examineResult"] == 0) {
                  dataArray[i]["examineResult"] = '待审核'
                } else if (dataArray[i]["examineResult"] == 1) {
                  dataArray[i]["examineResult"] = '通过'
                } else if (dataArray[i]["examineResult"] == 2) {
                  dataArray[i]["examineResult"] = '未通过'
                }
              }
              if (res.data.code == 200) {
                that.setData({
                  list: res.data.data.data
                })
              }
            },
          })
        }
      })
    }
    // console.log('所在地区：一级id__' + this.data.statusid);
    this.hideFilter()
  },
  setScoreIndex: function (e) {    //分数索引
    const dataset = e.currentTarget.dataset;
    this.setData({
      scoreindex: dataset.scoreindex,
      scoreid: dataset.scoreid,
    })
    console.log('所在地区：一级id__' + this.data.scoreid);
    console.log(this.data);
    this.hideFilter()
  },
  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  getDetail(e) {
    let index = e.currentTarget.dataset.index
    let item = JSON.stringify(this.data.list[index])
    wx.navigateTo({
      url: '../auditDetail/index?item=' + item,
    })
  },
  getModify(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../auditModify/index?id=' + id,
    })
  },
  hanlde_content(e) {
    this.setData({
      hanlde_content: e.detail.value
    })
  },
  go_search() {
    wx.showLoading({
      title: '查询中',
      success: res => {
        wx.request({
          url: app.globalData.url + '/api/app-approval/queryCheckPointExaminePage?leaderUserId=' + app.globalData.getUserInfo.userId +
            '&current=' + this.data.pageIndex + '&pageSize=5' + '&pointName=' + this.data.hanlde_content,
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          method: "POST",
          success: res => {
            for (var i = 0; i < dataArray.length; i++) {
              dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
              if (dataArray[i]["examineResult"] == 0) {
                dataArray[i]["examineResult"] = '待审核'
              } else if (dataArray[i]["examineResult"] == 1) {
                dataArray[i]["examineResult"] = '通过'
              } else if (dataArray[i]["examineResult"] == 2) {
                dataArray[i]["examineResult"] = '未通过'
              }
            }
            wx.hideLoading()
            if (res.data.code == 200) {
              that.setData({
                list: res.data.data.data
              })
              wx.showToast({
                title: '查询成功',
                icon: "none"
              })
            }
          }
        })
      }
    })
  },
  onLoad: function (options) {
    this.getAllData();
    this.fetchFilterData();
  },
  // 加载数据
  getAllData() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/app-my/queryCheckPointExaminePage?checkPersonId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.pageIndex + '&pageSize=5',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data.data);
        var dataArray = res.data.data.data
        for (var i = 0; i < dataArray.length; i++) {
          dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
          if (dataArray[i]["examineResult"] == 0) {
            dataArray[i]["examineResult"] = '待审核'
          } else if (dataArray[i]["examineResult"] == 1) {
            dataArray[i]["examineResult"] = '通过'
          } else if (dataArray[i]["examineResult"] == 2) {
            dataArray[i]["examineResult"] = '未通过'
          }
        }
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data.data
          })
        }
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    this.data.pageIndex++;
    console.log('加载更多数据', this.data.pageIndex);
    wx.request({
      url: app.globalData.url + '/api/app-my/queryCheckPointExaminePage?checkPersonId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.pageIndex + '&pageSize=5',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
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
  },
  screenShow: function () { //综合下拉
    if (this.data.screenFlag) {
      this.setData({
        screenFlag: !this.data.screenFlag,
        brandFlag: false,
      })
    } else {
      this.setData({
        screenFlag: !this.data.screenFlag,
        brandFlag: false,
      })
    }
  },
  screenChoice: function (e) { //综合下拉选择子项
    console.log(e)
    this.setData({
      screen: e.currentTarget.dataset.item,
      "screenDown.screen": e.currentTarget.dataset.index,
      screenFlag: false,
      screenColor: true
    })
  },
  handletouchtart: function (event) { //点击透明背景隐藏下拉
    this.setData({
      screenFlag: false,
      brandFlag: false
    })
  },

  brandShow: function () { //品牌下拉
    if (this.data.brandFlag) {
      this.setData({
        brandFlag: !this.data.brandFlag,
        screenFlag: false,
      })
    } else {
      this.setData({
        brandFlag: !this.data.brandFlag,
        screenFlag: false,
      })
    }
  },
  radioChange: function (e) { //品牌选择
    console.log(e)
    this.setData({
      brandText: e.detail.value,
      brandFlag: false,
      brandColor: true
    })
  },
  salesNumber: function () { //销量
    if (this.data.salesColor) {
      this.setData({
        salesColor: "",
        screenFlag: false,
        brandFlag: false,
      })
    } else {
      this.setData({
        salesColor: "#F46458",
        screenFlag: false,
        brandFlag: false,
      })
    }

  },
  // 获取类别
  get_type(){
    let category=wx.getStorageSync('category')
    this.setData({
      category
    })
  },
})