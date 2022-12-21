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
    sort: {},
    dataList: [],
    currentPage: 1,
    page: 0,
    value1: 0,
    value2: 'a',
    value3: 'd',
    value4: 'e'
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
      month: [
        {
          "id": 0,
          "name": "全部"
        },
        {
          "id": 23,
          "name": "1"
        },
        {
          "id": 24,
          "name": "2",
        },
        {
          "id": 25,
          "name": "3"
        },
        {
          "id": 26,
          "name": "4",
        },
        {
          "id": 27,
          "name": "5"
        },
        {
          "id": 28,
          "name": "6",
        },
        {
          "id": 29,
          "name": "7",
        },
        {
          "id": 29,
          "name": "8",
        },
        {
          "id": 29,
          "name": "9",
        },
        {
          "id": 29,
          "name": "10",
        },{
          "id": 29,
          "name": "11",
        },{
          "id": 29,
          "name": "12",
        }
      ],
      score: [
        {
          "id": 0,
          "name": "全部"
        },
        {
          "id": 12,
          "name": "<60"
        },
        {
          "id": 13,
          "name": "60~70"
        },
        {
          "id": 14,
          "name": "70~80"
        },
        {
          "id": 15,
          "name": "80~90"
        },
        {
          "id": 16,
          "name": "90~100"
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
  setMonthIndex: function (e) { //月份索引
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      monthindex: dataset.monthindex,
      monthid: dataset.monthid
    })
    console.log('所在地区：一级id__' + this.data.monthid);
    this.hideFilter()
  },
  setScoreIndex: function (e) {    //分数索引
    const dataset = e.currentTarget.dataset;
    this.setData({
      scoreindex: dataset.scoreindex,
      scoreid: dataset.scoreid,
    })
    console.log('所在地区：一级id__' + this.data.scoreid );
    console.log(this.data);
    this.hideFilter()
  },
  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  getInspectionDetail(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../inspectionDetail/index?item=' + JSON.stringify(item),
    })
  },
  goEdit(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../inspectionEdit/index?item=' + JSON.stringify(item),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllData();
    this.fetchFilterData();
  },
  getAllData() {
    var that = this;
    var page = this.data.page + 1;
    var currentPage = this.data.currentPage;
    this.setData({
      page
    })
    wx.request({
      url: app.globalData.url + '/api/app-my/queryReportFormPage?userId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.currentPage + '&pageSize=10',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data.data);
        var dataArray = res.data.data.data
        for (var i = 0; i < dataArray.length; i++) {
          dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
        }
        if (res.data.code == 200) {
          if (currentPage == 1) {
            that.setData({
              dataList: res.data.data.data
            })
          } else {
            that.setData({
              dataList: dataList.concat(res.data.data.data)
            })
          }

        }
      }
    })
  },
  handle_content(e) {
    this.setData({
      handle_content: e.detail.value
    })
  },
  to_search() {
    const that = this
    wx.showLoading({
      success: res => {
        wx.request({
          url: app.globalData.url + '/api/app-my/queryReportFormPage?userId=' + app.globalData.getUserInfo.userId +
            '&current=' + this.data.currentPage + '&pageSize=10' + '&pointName=' + this.data.handle_content,
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data.data.data);
            var dataArray = res.data.data.data
            for (var i = 0; i < dataArray.length; i++) {
              dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
            }
            wx.hideLoading()
            if (res.data.code == 200) {
              that.setData({
                dataList: res.data.data.data
              })
            }
          }
        })
      }
    })
  },
  /**,
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
    this.data.currentPage = 1;
    this.getAllData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.data.currentPage++;
    this.getAllData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})