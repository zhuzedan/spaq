var app = getApp();
Page({
  data: {
    currentNum: 0
  },
  onLoad(options) {
    let basic_obj = JSON.parse(options.item)
    this.setData({ basic_obj })
    this.initId(basic_obj)
    this.initData(basic_obj.checkPointId)
    this.get_img()
  },
  handleItemChange(e) {
    console.log(e.detail.index);
    const current = e.detail.index;
    this.setData({
      currentNum: current
    })
  },
  handle_name(e) {
    this.data.basic_obj.checkPointName = e.detail.value
    this.setData({ basic_obj: this.data.basic_obj })
  },
  handle_address(e) {
    this.data.basic_obj.checkPointNAddress = e.detail.value
    this.setData({ basic_obj: this.data.basic_obj })
  },
  hanlde_username(e) {
    this.data.basic_obj.connectName = e.detail.value
    this.setData({ basic_obj: this.data.basic_obj })
  },
  hanlde_phone(e) {
    this.data.basic_obj.connectTel = e.detail.value
    this.setData({ basic_obj: this.data.basic_obj })
  },
  initId(basic_obj) {
    const { checkPointNAddress, checkPointName, id } = basic_obj
    wx.request({
      url: app.globalData.url + '/api/app-my/insertReportExamine',
      method: "POST",
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        "checkPersonId": app.globalData.getUserInfo.userId,
        "checkPointAddress": checkPointNAddress,
        "checkPointName": checkPointName,
        "examineContent": "随便写",
        "reportFormId": id
      },
      success: res => {
        let reportExamineId = res.data.data.reportExamineId
        this.setData({
          reportExamineId
        })
      }
    })
  },
  go_edit() {
    const { checkPointNAddress, checkPointName, connectName, connectTel, id } = this.data.basic_obj
    wx.request({
      url: app.globalData.url + '/api/app-my/insertReportFormExamine',
      method: "POST",
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        "checkPointAddress": checkPointNAddress,
        "checkPointName": checkPointName,
        "connectName": connectName,
        "connectTel": connectTel,
        "reportExamineId": this.data.reportExamineId,
        "reportFormId": id
      },
      success: res => {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
    })
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
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  // 查询分类
  get_title(categoryCode, areaOrgCode) {
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckPhotoList',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: "GET",
      data: {
        'categoryCode': categoryCode,
        'orgCode': areaOrgCode
      },
      success: res => {
        this.setData({
          title_list: res.data.data
        })
      }
    })
  },
  // 查询图片
  get_img() {
    wx.request({
      url: app.globalData.url + '/api/app-my/queryReportPhotoList',
      method: "POST",
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        'reportFormId': '1'
      },
      success: res => {
        this.setData({ img_list: res.data.data })
      }
    })
  },
  chang_img(e) {
    let index = e.currentTarget.dataset.index
    let index1 = e.currentTarget.dataset.index1
  },
  // 门头照片选择
  upLoadImage: function (e) {
    let that = this
    let index1 = e.currentTarget.dataset.index1
    let photoId = e.currentTarget.dataset.photoId
    wx.chooseMedia({
      camera: 'back',
      count: 1,
      mediaType: ['image'],
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFiles = res.tempFiles[0].tempFilePath
        that.uploadFile(tempFiles, index1, photoId);
      },
    })
  },
  // 上传图片url到oss
  uploadFile(tempFiles, index1, photoId) {
    var that = this;
    wx.uploadFile({
      filePath: tempFiles,
      name: 'file',
      url: app.globalData.url + '/api/app-check/uploadPic',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      success: (res) => {
        // 将返回的json格式数据转换成对象
        var successData = res.data
        var jsonStr = successData.replace(" ", "")
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        let url = res.data.data.url
        wx.request({
          url: app.globalData.url + '/api/app-my/insertReportPhotoExamine',
          method: "POST",
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          data: {
            "picAdd": url,
            "reportExamineId": that.data.reportExamineId,
            "reportPhotoId": photoId
          },
          success: res => {
            that.data.img_list[index1].picAdd=url
            that.setData({
              img_list:that.data.img_list
            })
            wx.showToast({
              title: res.data.msg,
              icon:"none"
            })
          }
        })
      }
    })
  },
  onShow() {
  },
  onPullDownRefresh() {
  },
  onReachBottom() {
  },
  onShareAppMessage() {
  }
})