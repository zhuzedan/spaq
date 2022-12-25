// pages/auditModify/index.js
const app = getApp();

function tao(content) {
  wx.showToast({
    title: content,
    icon: "none"
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: null,
    longitude: null,
    showUnit: false, //单位弹层控制
    businessTypeNull: null, //类型设置初始值
    type: ['公益', '商业'],
    businessTypeIndex: 0,
    categoryCodeNull: null,
    areaOrgCodeNull: null,
    streetOrgCodeNull: null,
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    area: [],
    occupation: '',
    // 表单字段
    name: wx.getStorageSync('info').pointName, //单位名
    businessType: wx.getStorageSync('info').businessType, //类型
    categoryCode: wx.getStorageSync('info').categoryCode, // 类别
    areaOrgCode: '', //区域
    streetOrgCode: '', //街道
    connectName: wx.getStorageSync('info').connectName, //联系人
    connectTel: wx.getStorageSync('info').connectTel, //电话
  },
  // 双向绑定-单位名称
  getName: function (e) {
    this.setData({
      name: e.detail.value
    });
    console.log('name', this.data.name);
  },
  // 双向绑定-类型选择器
  getBusinessType: function (e) {
    this.setData({
      businessTypeNull: 111222333,
      businessTypeIndex: e.detail.value,
      businessType: this.data.type[e.detail.value]
    })
  },
  // 双向绑定-类别选择器
  getCategoryCode: function (e) {
    if (this.data.businessTypeIndex == 0) {
      this.setData({
        categoryCodeNull: 111222333,
        index2: e.detail.value,
        categoryCode: this.data.welfareCategory[e.detail.value].id
      })
      // console.log(this.data.index2);
      // console.log(this.data.welfareCategory[this.data.index2]);
    }
    if (this.data.businessTypeIndex == 1) {
      this.setData({
        categoryCodeNull: 111222333,
        index2: e.detail.value,
        categoryCode: this.data.businessCategory[e.detail.value].id
      })
    }
  },
  // 双向绑定-区域:
  getAreaOrgCode: function (e) {
    let orgCode = this.data.area[e.detail.value].id
    this.setData({
      areaOrgCodeNull: 111222333,
      index3: e.detail.value,
      areaOrgCode: this.data.area[e.detail.value].id
    });
    // console.log(this.data.areaOrgCode);
    wx.request({
      url: app.globalData.url + '/api/app-base/queryNextLevelCodeAndName',
      method: "GET",
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: {
        orgCode
      },
      success: res => {
        if (res.data.code == 200) {
          let street = [];
          let length = res.data.data.length
          for (var i = 0; i < length; i++) {
            let obj = {
              id: res.data.data[i].orgCode,
              name: res.data.data[i].name
            }
            street.push(obj)
          }
          let orgArr = res.data.data.map(item => {
            return item.name
          })
          this.setData({
            street,
            orgArr
          })
          // console.log('street',this.data.street);
          // console.log(this.data.orgArr);
        }
      }
    })
  },
  // 双向绑定-街道
  getStreetOrgCode: function (e) {
    this.setData({
      streetOrgCodeNull: 112233,
      streetOrgCode: this.data.street[e.detail.value].id,
      index4: e.detail.value
    });
    console.log(this.data.streetOrgCode);
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
  submit(e) {
    wx.showLoading({
      success: res => {
        const {
          name,
          businessType,
          categoryCode,
          areaOrgCode,
          streetOrgCode,
          connectName,
          connectTel
        } = this.data
        // 判断输入内容是否空值
        if (name == '') {
          tao('单位名不能为空')
          return;
        }
        if (businessType == '') {
          tao('请选择类型')
          return;
        }
        if (categoryCode == '') {
          tao('请选择类别')
          return;
        }
        if (areaOrgCode == '') {
          tao('请选择区域')
          return;
        }
        if (streetOrgCode == '') {
          tao('请选择街道')
          return;
        }
        if (connectName == '') {
          tao('联系人不能为空')
          return;
        }
        if (connectTel == '') {
          tao('联系人电话不能为空')
          return;
        }
        if (connectTel.length != 0 && connectTel.length != 11) { //输入的手机号不足11位提示
          tao('请输入11位手机号')
          return;
        }
        if (connectTel.length == 11) { //输入的手机号满足11位
          //正则匹配开头是1总长度为11的号码
          let regex = /^(((1[35789][0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
          if (!regex.test(connectTel)) {
            tao('手机号格式有误')
          }
        }
        wx.request({
          url: app.globalData.url + '/api/app-my/updateCheckPointExamine',
          method: 'POST',
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          data: {
            pointName: name, //检查点
            "areaOrgCode": "areaOrgCode", //区域编码
            "businessType": 0,
            "checkPointExamineId": this.data.id, //id
            "connectName": authCode,
            "connectTel": phone,
            "streetOrgCode": "streetOrgCode" //街道编码
          },
          success: res => {
            wx.hideLoading()
            if (res.data.code == 200) {
              wx.showToast({
                title: '修改成功',
                icon: "none"
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: "none"
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let item = JSON.parse(options.item)
    this.setData({
      info: item
    })
    wx.setStorageSync('info', this.data.info)
    console.log(this.data.info);
    wx.request({
      url: app.globalData.url + '/api/app-base/queryChildOrganization',
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      method: 'GET',
      success: (res) => {
        if (res.data.code == 200) {
          // console.log(res.data.data);
          let area = [];
          let length = res.data.data.length
          for (var i = 0; i < length; i++) {
            let obj = {
              id: res.data.data[i].orgCode,
              name: res.data.data[i].name,
            }
            area.push(obj)
          }
          let areaName = area.map(item => {
            return item.name
          })
          this.setData({
            areaName,
            area
          })
          // console.log('area',this.data.area);
          // console.log('areaName',this.data.areaName);
        }
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    let category = wx.getStorageSync('category')
    if (category) {
      // console.log(category);
      let arr1 = category[1].cate_two.map(item => {
        return item.title
      })
      let arr2 = category[2].cate_two.map(item => {
        return item.title
      })
      let categoryRange = [arr1, arr2]
      let welfareCategory = category[1].cate_two
      let businessCategory = category[2].cate_two
      this.setData({
        categoryRange,
        welfareCategory,
        businessCategory
      })
      // console.log(444,categoryRange);
      // console.log(555,category[1].cate_two);
      // console.log(555,category[2].cate_two);
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

  }
})