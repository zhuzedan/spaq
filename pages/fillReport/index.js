// pages/fillReport/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
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
    },{name:'s'},{name:'s'},{name:'s'},{name:'s'} ],

    stepNum: 1 //当前的步数

  },
  forEdit1() {
    this.setData({
      editInformation: 2
    })
  },
  // 门头照片选择
  upLoadImage: function(e){
    var that = this;
    wx.chooseMedia({
      camera: 'back',
      count: 9,
      mediaType: ['image'],
      sizeType: ['original', 'compressed']	,
      sourceType: ['album', 'camera'],
      success: function (res) {
        // console.log(res.tempFiles);
        var imageList = that.data.imageList;
        var tempFiles = res.tempFiles;
        // imageList数组的值为小程序图片本地缓存的地址
        for(var i = 0;i<tempFiles.length;i++) {
          if (tempFiles.length >=9) {
            that.setData({
              imageList: imageList
            });
            return false;
          }else {
            imageList.push(tempFiles[i].tempFilePath)
          }
        }
        console.log(imageList);
        that.setData({
          imageList: imageList
        });
        that.uploadFile();
      },
    })
  },
  // 上传图片
  uploadFile: function (e) {
    // console.log(this.data.imageList);
    for(var i = 0;i<this.data.imageList.length;i++) {
      // var filePath = this.data.imageList[index];
      console.log(this.data.imageList[i]);
      wx.showLoading({
        title: '上传中',
      })
      wx.uploadFile({
        filePath: this.data.imageList[i],
        name: 'file',
        url: app.globalData.url+'/api/app-check/uploadPic',
        header: {
          "Authorization": "Bearer " + app.globalData.userInfo.token
        },
        success: function (res) {
          console.log(res.data);
          setTimeout(function () {
            wx.hideLoading()
          } , 2000);
        }
      })
    }
  },
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
    // console.log(options);
    var that = this;
    // 查询单个详情
    wx.request({
      url: app.globalData.url+'/api/app-check/queryCheckPointOne',
      data: {
        checkPointId: options.checkPointId
      },
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          info: res.data.data
        })
        // console.log(that.data.info);
        // console.log(that.data.info.categoryCode);
        // console.log(that.data.info.streetOrgCode);
      },
      fail: function (error) {
        console.log(error);
      }
    })
    // 查询所需检查点类型
    wx.request({
      url: app.globalData.url+'/api/app-check/queryCheckPhotoList',
      data: {
        categoryCode: options.categoryCode,
        orgCode: options.streetOrgCode
      },
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
      }
    })
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
