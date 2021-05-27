// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myOrder: [{
      info: "我的订单"
    }],
    helpfeed: [{
      // icon: 'together.png',
      info: "帮助与反馈"
    }],
    agreement: [{
      // icon: 'goodness.png',
      info: "协议与说明"
    }],
    custservice: [{
      // icon: "service.png",
      info: "联系客服"
    }],
    activity: [{
      // icon: "favor1.png",
      info: "活动中心"
    }]
  },
  // 我的订单按钮
  mymenu() {
    console.log('我点击了我的订单')
    wx.navigateTo({
      url: '../order/order',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})