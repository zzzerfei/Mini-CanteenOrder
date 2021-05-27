let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  onLoad(){
    let that = this
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx98c7142d1eda9078', //你的小程序的APPID
            secret: 'c0cfd35fed52bd807330bca00ae5768b', //你的小程序的APPSecret       
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

  loginTap() {
    let that = this
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",
      success: res => {
        console.log(res.userInfo)
        let wxUserInfo = res.userInfo;
      },
      fail: res => {
        //拒绝授权
        that.showErrorModal('您拒绝了请求');
        return;
      }
    })
  },
  bindgetphonenumber(e){
    console.log(e)
  }
})