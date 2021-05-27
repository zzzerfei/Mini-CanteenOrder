import {
  getHistory
} from '../../service/order.js'
import {
  formatTime
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('', function(data){
      console.log(data.orderList)
      if(data.orderList == -1){
        that._getHistory()
      }else{
        that.setData({
          orderList:data.orderList
        })
      }
    })
  },

  _getHistory() {
    //获取我的订单数据
    let that = this;
    // 订单详情
    let orderList = []
    // 单个订单食物数量和总价格
    let openId = String(wx.getStorageSync('openid')) //获取到key为openid的在本地缓存中的数据并赋值   
    getHistory(openId).then((res) => {
      // 订单合集list
      let list = res.obj
      console.log(list[list.length - 1])
      list = list[list.length - 1]

      list.createTime = formatTime(list.createTime);
      //转换String为数组
      let nums = String(list.nums)
      nums = nums.split(",")
      // 订单内菜品详情合集dishes
      let dishes = list.dishes
      for (let j in dishes) {
        dishes[j].num = nums[j]
      }
      orderList= list
      that.setData({
        orderList: orderList
      })
    })
  },


  // -------去其他页面--------
  toOrder(){
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },


  toIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})

