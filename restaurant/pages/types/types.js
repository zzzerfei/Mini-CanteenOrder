const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowsItem:'',
    dishItem:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('', function(data) {
      console.log(data.windowsItem)
      console.log( data.windowsItem.dishes)
      that.setData({
        windowsItem: data.windowsItem,
        dishItem : data.windowsItem.dishes
      })

    })
  },

  numchangeTap(e) {
    var shopcar = app.globalData.shopcarinfo
    var shopItem = e.detail
    let flag = false //判断是否已在购物车
    //如果在购物车，则将最新的数目赋值给购物车的清单
    for (let i in shopcar) {
      if (shopItem.dishesId == shopcar[i].dishesId) {
        shopcar[i] = shopItem
        flag = true
      }
    }
    //如果不在购物车，则加入数组里
    if (flag == false) {
      shopcar.push(shopItem)
    }
  }


})