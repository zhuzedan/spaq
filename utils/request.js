import {baseUrl} from '../config/index'
// 获取公共app
var app = getApp();
// 封装网络请求函数
export const $requst = (params = {}) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: baseUrl + params.url,
      header: {
        "Authorization": "Bearer " + app.globalData.userInfo.token
      },
      data: params.data || {},
      method: params.method,
      success: (res) => {
        wx.hideLoading()
        console.log('success', res.data)
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })

}