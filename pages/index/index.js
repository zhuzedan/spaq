Page({
  data: {
  navState: 0,//导航状态
  },
  //监听滑块
  bindchange(e) {
  // console.log(e.detail.current)
  let index = e.detail.current;
  this.setData({
  navState:index
  })
  },
  //点击导航
  navSwitch: function(e) {
  // console.log(e.currentTarget.dataset.index)
  let index = e.currentTarget.dataset.index;
  this.setData({
  navState:index
  })
  },
 
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function(options) {
 
  },
 })