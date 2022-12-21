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
      month: [
        {
          "id": 0,
          "name": "全部"
        },
        {
          "id": 1,
          "name": "1"
        },
        {
          "id": 2,
          "name": "2",
        },
        {
          "id": 3,
          "name": "3"
        },
        {
          "id": 4,
          "name": "4",
        },
        {
          "id": 5,
          "name": "5"
        },
        {
          "id": 6,
          "name": "6",
        },
        {
          "id": 7,
          "name": "7",
        },
        {
          "id": 8,
          "name": "8",
        },
        {
          "id": 9,
          "name": "9",
        },
        {
          "id": 10,
          "name": "10",
        }, {
          "id": 11,
          "name": "11",
        }, {
          "id": 12,
          "name": "12",
        }
      ],
      score: [
        {
          "id": 0,
          "name": "全部"
        },
        {
          "id": '0,60',
          "name": "<60"
        },
        {
          "id": '60,70',
          "name": "60~70"
        },
        {
          "id": '70,80',
          "name": "70~80"
        },
        {
          "id": '80,90',
          "name": "80~90"
        },
        {
          "id": '90,100',
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
    const that=this
    this.hideFilter()
    this.setData({
      subcateindex: dataset.subcateindex,
      subcateid: dataset.subcateid,
    })
    let businessType = this.data.cateid
    let categoryCode = dataset.subcateid
    wx.showLoading({
      success:res=>{
        wx.request({
          url: app.globalData.url + '/api/app-my/queryReportFormPage?userId=' + app.globalData.getUserInfo.userId +
            '&current=' + that.data.currentPage + '&pageSize=10' + '&businessType=' + businessType + '&categoryCode=' + categoryCode,
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          method: 'POST',
          success: function (res) {
            var dataArray = res.data.data.data
            wx.hideLoading()
            for (var i = 0; i < dataArray.length; i++) {
              dataArray[i]["gmtCreate"] = times.toDate(dataArray[i]["gmtCreate"])
            }
            if (res.data.code == 200) {
              if (that.data.currentPage == 1) {
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
      }
    })
    // console.log('商家分类：一级id__' + this.data.cateid + ',二级id__' + this.data.subcateid);
  },
  setMonthIndex: function (e) { //月份索引
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    var date = new Date()
    const year = date.getFullYear()
    let startDate = `${year}-${dataset.monthid}-1`
    let endDate = `${year}-${dataset.monthid}-30`
    this.setData({
      monthindex: dataset.monthindex,
      monthid: dataset.monthid
    })
    wx.showLoading({
      success: res => {
        wx.request({
          url: app.globalData.url + '/api/app-my/queryReportFormPage?userId=' + app.globalData.getUserInfo.userId +
            '&current=' + this.data.currentPage + '&pageSize=10' + '&startDate=' + startDate + '&endDate=' + endDate,
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          method: 'POST',
          success: function (res) {
            wx.hideLoading()
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
      }
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
    let scoreArr = dataset.scoreid.split(',')
    wx.request({
      url: app.globalData.url + '/api/app-my/queryReportFormPage?userId=' + app.globalData.getUserInfo.userId +
        '&current=' + this.data.currentPage + '&pageSize=10' + '&lowScore=' + scoreArr[0] + '&highScore' + scoreArr[1],
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'POST',
      success: function (res) {
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
this.get_type()
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

  },
  get_type(){
    let category=wx.getStorageSync('category')
    this.setData({
      category
    })
  },
})