// pages/newPoint/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,     //控制弹出层是否弹出的值
    columns: ['男','女'],   //选择器中的值
    gender:''        //选择性别之后的值进行页面显示
  },
  showPopup(e){      //点击选择性别，打开弹出层（选择器）
    this.setData({show:true})
  },
onClose() {     //点击空白处开闭弹出层（选择器）及选择器左上角的取消
  this.setData({ show: false });
},
onConfirm(e){    //选择器右上角的确定，点击确定获取值
 this.setData({
   gender:e.detail.value,
   show:false
 })
},
submitNewStuInfo(e){
//表单输入框提交的内容包含在e参数中
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

  }
})