const app = getApp()
Page({
  data: {
    currentIndex: 0, //默认第一个
  },
  pagechange1: function (ee) {
    if ("touch" === ee.detail.source) {
      let currentPageIndex = this.data.currentIndex;
      currentPageIndex = (currentPageIndex + 1) % 2;
     
      this.setData({
        currentIndex: currentPageIndex,
      })
    }
  },

  //点击tab时触发
  titleClick: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
  },
})


