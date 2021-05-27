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
    // 订单数据
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getHistory()
  },

  _getHistory() {
    //获取我的订单数据
    let that = this;
    // 订单详情
    let orderList = []
    // 单个订单食物数量和总价格
    let totalprice = 0
    let openId = String(wx.getStorageSync('openid')) //获取到key为openid的在本地缓存中的数据并赋值   
    getHistory(openId).then((res) => {
      // 订单合集list
      let list = res.obj
      for (let i in list) {
        list[i].createTime = formatTime(list[i].createTime);
        //转换String为数组
        let nums = String(list[i].nums)
        nums = nums.split(",")

        // console.log(nums)
        let totalNum = 0
        for(let k in nums){
          totalNum += +nums[k]
        }
        list[i].totalNum = totalNum
        // 订单内菜品详情合集dishes
        let dishes = list[i].dishes
        for(let j in dishes){
          dishes[j].num = nums[j]
        }
        orderList.push(list[i])
      }
      orderList = orderList.reverse()
      console.log(orderList)
      this.setData({
        orderList: orderList
      })
    })
  },

  orderDetail(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;

    wx.navigateTo({
      url: '/pages/code/code',
      success:(res)=>{
        res.eventChannel.emit('', {
          orderList: this.data.orderList[index]
        })
      }
    })

    console.log(this.data.orderList[index])
  },
  // 再来一单按钮跳转回主页面
  btnAgain: function () {
    console.log('我被点击了')
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 日期格式化

})