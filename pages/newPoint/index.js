// pages/newPoint/index.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: null,
    longitude: null,
    showUnit: false, //单位弹层控制
    columns: ['公益', '商业'],
    category: ['农家乐','养老院'],
    unit:'请选择类型',
    sex: [{ id: "0", name: "男", checked:"true" }, { id: "1", name: "女" }],
    name:'',
    sexId:"0",   // 默认是0 => 男
    sex1:'',
    Email:'',
    school:'',
    index:0,
    identity:["请选择区域","海曙区","鄞州区","江北区","镇海区","慈溪市"],
    occupation:''
  },
  showPopup() {
    this.setData({ show: true });
  },
  getUnit(e) {
    wx.hideKeyboard();
    this.showPopup();
  },
  showPopup() {
    this.setData({
      showUnit: true
    });
  },
  // 弹窗关闭
  onCloseUnit() {
    this.setData({
      showUnit: false
    });
  },
  //单位选择确认
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      unit:value
    })
    this.onCloseUnit();

  },
  //单位取消选择器
  onCancel() {
    this.onCloseUnit();
    console.log('value:', value)
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  getForm:function(e){
    var formdata = e.detail.value
    this.setData({
    name:formdata.name,
    sex1:this.data.sex[this.data.sexId].name,
    Email:formdata.Email,
    school:formdata.school,
    occupation:this.data.identity[this.data.index],
   })
  },
  radioChange:function(e){
      this.setData({
          sexId:e.detail.value
      })
  },
  bindPickerChange:function(e){
      this.setData({
          index: e.detail.value
      })
  },
  saveData:function(e){
      //提交后的操作，例如将信息写入数据库等
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
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const accuracy = res.accuracy
        console.log(res) //将获取到的经纬度信息输出到控制台以便检查
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