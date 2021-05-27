import {
  baseURL,
} from './config.js'

function request(options) {
  wx.showLoading({
    title: '正在加载',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method:options.method,
      header:{
        // 'Content-Type': 'application/x-www-form-urlencoded'
        "Content-Type":"application/json",
      },
      data: options.data,
      success: function (res) {
        // console.log(res.header,options.data,options)
        resolve(res.data)
      },
      fail: reject,
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}

export default request;