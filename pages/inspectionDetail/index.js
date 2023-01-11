var app = getApp();
import {getReportPhotoList} from '../../api/mine'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNum: 0,
    checked: true,

    stepList: [{
      name: '1'
    }, {
      name: '2'
    }, {
      name: '3'
    }, {
      name: '4'
    }, { name: 's' }, { name: 's' }, { name: 's' }, { name: 's' }],

    stepNum: 1 //当前的步数

  },
  goSignature() {
    wx.navigateTo({
      url: '../signature/index',
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  onChangeRadio(event) {
    this.setData({
      radio: event.detail,
    });
  },
  numSteps() {
    this.setData({
      stepNum: this.data.stepNum == this.data.stepList.length ? 1 : this.data.stepNum + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let basic_obj = JSON.parse(options.item)
    this.setData({ basic_obj })
    this.initData(basic_obj.checkPointId)
    this.get_img()

  },
  initData(checkPointId) {
    const that = this
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckPointOne',
      data: {
        checkPointId
      },
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'GET',
      success: function (res) {
        const { categoryCode, areaOrgCode } = res.data.data
        that.get_title(categoryCode, areaOrgCode)
        that.get_search(categoryCode, areaOrgCode)
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  // 查询图片
  get_img() {
    getReportPhotoList('1').then((res) => {
      this.setData({
        reportPhotolist: res.data
      })
    })
  },
  // 预览图片
  previewImg: function (e) {
    let currentUrl = e.target.dataset.src
    wx.previewImage({
      //当前显示图片
      current: currentUrl,
      //所有图片
      urls: [currentUrl]
    })
  },
  // 查询检查项
  get_search(categoryCode, areaOrgCode) {
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckItem',
      method: "GET",
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        'categoryCode': categoryCode,
        'orgCode': areaOrgCode
      },
      success: res => {
        let left_list = res.data.data.map(item => {
          return item.projectName
        })
        left_list = [...new Set(left_list)]
        this.setData({
          question_list: res.data.data,
          question_index: 0,
          left_list
        })
        // this.setData({ img_list: res.data.data })
      }
    })
  },
  sub_setp() {
    if (this.data.question_index > 0) {
      this.data.question_index--
      this.setData({
        question_index: this.data.question_index
      })
    }
  },
  numSteps() {
    if (this.data.question_index < this.data.question_list.length - 1) {
      this.data.question_index++
      this.setData({
        question_index: this.data.question_index
      })
    }
    // this.setData({
    //   stepNum: this.data.stepNum == this.data.stepList.length ? 1 : this.data.stepNum + 1
    // })
  },
  /**
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleItemChange(e) {
    console.log(e.detail.index);
    const current = e.detail.index;
    this.setData({
      currentNum: current
    })
  }
})
