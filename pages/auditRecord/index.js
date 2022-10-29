Page({

    /**
     * 页面的初始数据
     */
    data: {
      option1: [
        { text: '月份', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '类型', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      option3: [
        { text: '类别', value: 'd' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      option4: [
        { text: '状态', value: 'e' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      value1: 0,
      value2: 'a',
      value3:'d',
      value4:'e'
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
    },
    screenShow: function () {//综合下拉
      if (this.data.screenFlag){
        this.setData({
          screenFlag : !this.data.screenFlag,
          brandFlag: false,
        })
      }else{
        this.setData({
          screenFlag: !this.data.screenFlag,
          brandFlag: false,
        })
      }
    },
    screenChoice:function(e){//综合下拉选择子项
      console.log(e)
      this.setData({
        screen: e.currentTarget.dataset.item,
        "screenDown.screen": e.currentTarget.dataset.index,
        screenFlag: false,
        screenColor:true
      })
    },
    handletouchtart: function (event) {//点击透明背景隐藏下拉
      this.setData({
        screenFlag: false,
        brandFlag: false
      })
    },
  
    brandShow: function () {//品牌下拉
      if (this.data.brandFlag) {
        this.setData({
          brandFlag: !this.data.brandFlag,
          screenFlag: false,
        })
      } else {
        this.setData({
          brandFlag: !this.data.brandFlag,
          screenFlag: false,
        })
      }
    },
    radioChange: function (e) {//品牌选择
      console.log(e)
      this.setData({
        brandText: e.detail.value,
        brandFlag: false,
        brandColor: true
      })
    },
    salesNumber:function(){//销量
      if (this.data.salesColor){
        this.setData({
          salesColor: "",
          screenFlag: false,
          brandFlag: false,
        })
      }else{
        this.setData({
          salesColor: "#F46458",
          screenFlag: false,
          brandFlag: false,
        })
      }
      
    },
   })
  