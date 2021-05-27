// app.js
import {
  register
} from './service/index'
App({

  globalData: {
    openid: null,
    // 首页导航栏相关
    navBarHeight: 0, // 导航栏高度
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    menu: -1,
    //订单数据
    shopcarinfo: [],
  },

  onLaunch() {
    let that = this
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    this.setNavBarInfo()
    if (wx.getStorageSync('userInfo') == '') {
      this.showModal()
      if (wx.getStorageSync('openid') == '') {
        this._login()
      }
    }

  },
  showModal() {
    let that = this
    wx.showModal({
      content: '是否授权登录',
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
            desc: "获取你的昵称、头像、地区及性别",
            success: res => {
              wx.setStorageSync('userInfo', res.userInfo)
              that._register()
            },
            fail: () => {
              that.showModal()
            }
          })
        } else if (res.cancel) {
          that.showModal()
        }
      }
    })
  },
  
  _register() {
    let userInfo = wx.getStorageSync('userInfo'),
      customer = {
        "customerName": userInfo.nickName,
        "gender": userInfo.gender,
        "openId": wx.getStorageSync('openid')
      }
    // customer = JSON.stringify(customer)
    console.log(customer)
    register(customer).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  },
  _login() {
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: '', //你的小程序的APPID
            secret: '', //你的小程序的APPSecret       
            js_code: res.code, //通过wx.login接口获得的登录凭证
            grant_type: 'authorization_code'
          }, //看官方文档   
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            // console.log(res.data.openid)
            wx.setStorageSync('openid', res.data.openid) //存入本地缓存,key为openid 
            console.log("返回成功" + wx.getStorageSync('openid'))
          }
        })
      }
    })
  },





  setNavBarInfo() {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuHeight = menuButtonInfo.height;
  },

})