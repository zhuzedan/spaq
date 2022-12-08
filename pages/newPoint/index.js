// pages/newPoint/index.js
import Toast from '@vant/weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: null,
    longitude: null,
    showUnit: false, //单位弹层控制
    category: ['请选择类别', '农家乐', '养老院'],
    type: ["请选择类型", '公益', '商业'],
    index1: 0,
    index2: 0,
    index3: 0,
    area: ["请选择区域", "海曙区", "鄞州区", "江北区", "镇海区", "慈溪市", "余姚市"],
    occupation: '',
    // 表单字段
    name: '', //单位名
    businessType: '', //类型
    categoryCode: '', // 类别
    areaOrgCode: '', //区域
    streetOrgCode: '', //街道
    connectName: '', //联系人
    connectTel: '', //电话
  },
  // 双向绑定-单位名称
  getName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  // 双向绑定-类型选择器
  getBusinessType: function (e) {
    this.setData({
      index1: e.detail.value,
      businessType: this.data.type[e.detail.value]
    })
    // console.log(this.data.index1);
    // console.log(this.data.type[this.data.index1]);
  },
  // 双向绑定-类别选择器
  getCategoryCode: function (e) {
    this.setData({
      index2: e.detail.value,
      categoryCode: this.data.category[e.detail.value]
    })
  },
  // 双向绑定-区域:
  getAreaOrgCode: function (e) {
    this.setData({
      index3: e.detail.value,
      areaOrgCode: this.data.area[e.detail.value]
    });
  },
  // 双向绑定-街道
  getStreetOrgCode: function (e) {
    this.setData({
      streetOrgCode: e.detail.value
    });
  },
  // 双向绑定-联系人
  getConnectName: function (e) {
    this.setData({
      connectName: e.detail.value
    });
  },
  // 双向绑定-联系人电话
  getConnectTel: function (e) {
    this.setData({
      connectTel: e.detail.value
    });
  },
  // 确定按钮
  submit() {
    var name = this.data.name
    var businessType = this.data.businessType
    var categoryCode = this.data.categoryCode
    var areaOrgCode = this.data.areaOrgCode
    var streetOrgCode = this.data.streetOrgCode
    var connectName = this.data.connectName
    var connectTel = this.data.connectTel

    // 判断输入内容是否空值
    if (name == '') {
      wx.showToast({
        title: '单位名不能为空',
        icon: 'none'
      })
      return;
    }
    if (businessType == '') {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
      return;
    }
    if (categoryCode == '') {
      wx.showToast({
        title: '请选择类别',
        icon: 'none'
      })
      return;
    }
    if (areaOrgCode == '') {
      wx.showToast({
        title: '请选择区域',
        icon: 'none'
      })
      return;
    }
    if (streetOrgCode == '') {
      wx.showToast({
        title: '请输入街道',
        icon: 'none'
      })
      return;
    }
    if (connectName == '') {
      wx.showToast({
        title: '联系人不能为空',
        icon: 'none'
      })
      return;
    }
    if (connectTel == '') {
      wx.showToast({
        title: '联系人电话不能为空',
        icon: 'none'
      })
      return;
    }
    if (connectTel.length != 0 && connectTel.length != 11) { //输入的手机号不足11位提示
      wx.showToast({
        title: '请输入11位手机号',
        icon: 'none'
      })
      return;
    }
    if (connectTel.length == 11) { //输入的手机号满足11位
      //正则匹配开头是1总长度为11的号码
      let regex  = /^(((1[35789][0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
      if (!regex.test(connectTel)) {
        wx.showToast({
          title: '手机号格式有误',
          icon: 'none'
        })
      }
    }
    wx.request({
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      url: 'http://localhost:8082/api/app-my/insertCheckPoint',
      data: {
        name: this.data.name,
        connectName: this.data.connectName,
        connectTel: this.data.connectTel,
        businessType: this.data.index1 - 1,
        categoryCode: this.data.categoryCode,
        areaOrgCode: this.data.areaOrgCode,
        streetOrgCode: this.data.streetOrgCode,
        address: this.data.latitude + "," + this.data.longitude
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        if (res.data.code == 200) {
          wx.showModal({
            title: '',
            content: '确认提交吗？',
            complete: (res) => {
              if (res.confirm) {
                wx.showToast({
                  title: '提交成功',
                  duration: 2000
                })
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })

        } else {
          wx.showToast({
            title: '未知错误',
          })
        }

      }
    })
  },
  bindPickerChange3: function (e) {
    this.setData({
      index3: e.detail.value
    })
  },
  getLocation() {


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const accuracy = res.accuracy
        // console.log(res) //将获取到的经纬度信息输出到控制台以便检查
        that.setData({ //将获取到的经度、纬度数值分别赋值给本地变量
          latitude: (res.latitude).toFixed(4),
          longitude: (res.longitude).toFixed(4)
        })
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

  }
})