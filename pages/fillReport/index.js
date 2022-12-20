// pages/fillReport/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 本地图片缓存链接
    imageList: [],
    // oss链接
    imageListUrl: [],
    photoId: [],
    photoTypeName: [],
    photoid: '',
    phototypename: '',
    sort: 0,
    // 表单类型与名称
    checkPhotoList: '',
    state: '',
    info: '',
    currentNum: 0,
    checked: true,
    editInformation: 1,
    stepList: [{
      name: '1'
    }, {
      name: '2'
    }, {
      name: '3'
    }, {
      name: '4'
    }, { name: 's' }, { name: 's' }, { name: 's' }, { name: 's' }],

    stepNum: 1,//当前的步数
    photo_list: []

  },
  forEdit1() {
    this.setData({
      editInformation: 2
    })
  },
  // 门头照片选择
  upLoadImage: function (e) {
    var photoId = e.currentTarget.dataset.photoid;
    var photoTypeName = e.currentTarget.dataset.phototypename;
    let index = e.currentTarget.dataset.index;
    this.setData({
      photoid: photoId,
      phototypename: photoTypeName
    })
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempFilePaths = res.tempFilePaths[0]
        wx.showLoading({
          title: '上传中',
          success: res => {
            that.uploadFile(index, tempFilePaths)
          }
        })
      },
    });
  },
  // 上传图片url到oss
  uploadFile: function (index, tempFilePaths) {
    var that = this;
    wx.uploadFile({
      filePath: tempFilePaths,
      name: 'file',
      url: app.globalData.url + '/api/app-check/uploadPic',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      success: res => {
        var successData = res.data
        var jsonStr = successData.replace(" ", "")
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        let img_url = res.data.data.url
        that.pushApi(index, img_url)
        let temp_obj = {
          'photoTypeName': that.data.phototypename,
          'img_url': img_url
        }
        that.data.photo_list.push(temp_obj)
        that.setData({
          photo_list: that.data.photo_list
        })
      }
    })
  },
  // 上传
  pushApi(index, img_url) {
    const that = this
    wx.request({
      url: app.globalData.url + '/api/app-check/insertReportPhoto',
      method: "POST",
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        "photoId": that.data.photoid,
        "photoTypeName": that.data.phototypename,
        "picAdd": img_url,
        "reportFormId": "1",
        "sort": that.data.sort
      },
      success: res => {
        wx.hideLoading()
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
    })
  },
  // 新增图片接口
  // insertReportPhoto() {
  //   var that = this;
  //   for (var i = 0; i < that.data.imageListUrl.length; i++) {
  //     that.data.sort++;
  //     wx.request({
  //       url: app.globalData.url + '/api/app-check/insertReportPhoto',
  //       header: {
  //         "Authorization": "Bearer " + app.globalData.userInfo.token
  //       },
  //       data: {
  //         photoId: that.data.photoid,
  //         photoTypeName: that.data.phototypename,
  //         picAdd: that.data.imageListUrl[i],
  //         reportFormId: 1,
  //         sort: that.data.sort
  //       },
  //       method: 'POST',
  //       success: (res) => {
  //         console.log(res.data);
  //       }
  //     })
  //   }
  // },
  // 删除图片
  deleteImg: function (e) {
    var imageList = this.data.imageList;
    var index = e.currentTarget.dataset.index;
    imageList.splice(index, 1);
    this.setData({
      imageList: imageList
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imageList = this.data.imageList;
    wx.previewImage({
      //当前显示图片
      current: imageList[index],
      //所有图片
      urls: imageList
    })
  },
  goSignature(e) {
    console.log(e.currentTarget.dataset.reportformid);
    wx.navigateTo({
      url: '../signature/index?reportFormId=' + e.currentTarget.dataset.reportformid,
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
    console.log(options);
    this.setData({
      checkPointId: options.checkPointId
    })
    var that = this;
    // 查询单个详情
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckPointOne',
      data: {
        checkPointId: options.checkPointId
      },
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          info: res.data.data
        })
      },
      fail: function (error) {
        console.log(error);
      }
    })
    // 查询所需检查点类型
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckPhotoList',
      data: {
        categoryCode: options.categoryCode,
        orgCode: options.streetOrgCode
      },
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'GET',
      success: function (res) {
        // console.log(res.data);
        var dataArray = res.data.data
        for (var i = 0; i < dataArray.length; i++) {
          // console.log(dataArray[i]["id"])
          // console.log(dataArray[i]["photoTypeName"]);
          that.setData({
            photoId: that.data.photoId.concat(dataArray[i]["id"]),
            photoTypeName: that.data.photoTypeName.concat(dataArray[i]["photoTypeName"]),
            checkPhotoList: res.data.data
          })
        }
        // console.log(that.data.photoId);
        // console.log(that.data.photoTypeName);
        console.log(that.data.checkPhotoList);
      }
    })
    // 查询检查项
    wx.request({
      url: app.globalData.url + '/api/app-check/queryCheckItem',
      method: "GET",
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        categoryCode: options.categoryCode,
        orgCode: options.streetOrgCode
      },
      success: res => {
        console.log(321, res);
      }
    })
  },
  handle_name(e) {
    this.setData({ handle_name: e.detail.value })
  },
  handle_address(e) {
    this.setData({ handle_address: e.detail.value })
  },
  handle_user(e) {
    this.setData({ handle_user: e.detail.value })
  },
  handle_phone(e) {
    this.setData({ handle_phone: e.detail.value })
  },
  submit_basic() {
    if (this.data.handle_name && this.data.handle_address && this.data.handle_user && this.data.handle_phone) {
      wx.showLoading({
        success: res => {
          wx.request({
            url: app.globalData.url + '/api/app-check/insertReportForm',
            method: 'POST',
            header: {
              "Authorization": "Bearer " + app.globalData.userInfo.token
            },
            data: {
              "checkPointId": this.data.checkPointId,
              "checkPointNAddress": this.data.handle_address,
              "checkPointName": this.data.handle_name,
              "connectName": this.data.handle_user,
              "connectTel": this.data.handle_phone,
              "userId": app.globalData.getUserInfo.userId
            },
            success: res => {
              wx.hideLoading()
              if (res.data.code == 200) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'none'
                })
                this.setData({
                  currentNum: 1
                })
              }
              else {
                wx.showToast({
                  title: res.data.msg,
                  icon: "none"
                })
              }
              // console.log(res);
            }
          })
        }
      })
    }
    else {
      wx.showToast({
        title: '请完善信息',
        icon: "none"
      })
    }
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
