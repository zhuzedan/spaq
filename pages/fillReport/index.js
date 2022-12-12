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
      },
    })
  },
  // 上传图片
  uploadFile: function (e) {
    console.log(this.data.imageList);
    for(var index in this.data.imageList) {
      // var filePath = this.data.imageList[index];
      console.log(this.data.imageList[index]);
      wx.showLoading({
        title: '上传中',
      })
      wx.uploadFile({
        filePath: this.data.imageList[index],
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
        // console.log(res.data.data);
        that.setData({
          info: res.data.data
        })
        // console.log(that.data.info);
      },
      fail: function (error) {
        console.log(error);
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
