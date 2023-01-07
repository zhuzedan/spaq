// pages/auditModify/index.js
const app = getApp();

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
        wx.request({
          url: app.globalData.url + '/api/app-my/updateCheckPointExamine',
          method: 'POST',
          header: {
            "Authorization": "Bearer " + app.globalData.userInfo.token
          },
          data: {
            pointName: name?name:this.data.info.pointName, //检查点
            areaOrgCode: areaOrgCode?areaOrgCode:this.data.info.areaOrgCode, //区域编码
            businessType: businessType?businessType:this.data.info.businessType,
            checkPointExamineId: this.data.info.id, //id
            connectName: connectName?connectName:this.data.info.connectName,
            connectTel: connectTel?connectTel:this.data.info.connectTel,
            streetOrgCode: streetOrgCode?streetOrgCode:this.data.info.streetOrgCode //街道编码
          },
          success: res => {
            wx.hideLoading()
            if (res.data.code == 200) {
              wx.showModal({
                title: '',
                content: '确认提交吗？',
                complete: (res) => {
                  if (res.confirm) {
                    wx.showToast({
                      title: '修改成功',
                      icon: "none"
                    })
                    wx.navigateTo({
                      url: '../auditRecord/index',
                    })
                  }
                }
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
    console.log('ppoopop',this.data.info.pointName);
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