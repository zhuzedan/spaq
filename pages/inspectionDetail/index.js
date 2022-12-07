// pages/fillReport/index.js
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
    },{name:'s'},{name:'s'},{name:'s'},{name:'s'} ],

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