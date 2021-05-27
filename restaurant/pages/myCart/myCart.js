import {
  addOrder
} from '../../service/cart.js'
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    totalprice: 0,
    /*这里是模拟的接口返回数据*/
    shopcarinfo: []
  },
  // 加载页面即获取总价格 并将其传递给子组件


  onShow() {
    let totalprice = 0;
    this.setData({
      shopcarinfo: app.globalData.shopcarinfo
    })
    var shopcar = this.data.shopcarinfo;
    for (var i in shopcar) {
      totalprice += shopcar[i].num * shopcar[i].price
    }
    this.setData({
      totalprice: totalprice
    })
  },
  totalprice(e) {
    console.log(e)
    let shopcar = app.globalData.shopcarinfo
    let shopItem = e.detail[1]
    let index = e.detail[2]
    console.log(e)
    console.log(shopcar)
    if (shopItem.num != 0) {
      for (let i in shopcar) {
        if (shopItem.dishesId == shopcar[i].dishesId) {
          shopcar[i] = shopItem
        }
      }
    } else {
      shopcar.splice(index, 1)
    }

    this.setData({
      totalprice: e.detail[0],
    })
  },
  delete(e) {
    // console.log(e)
    let totalprice = e.detail[0],
      index = e.detail[1],
      shopcar = app.globalData.shopcarinfo
    console.log(shopcar)
    shopcar.splice(index, 1)
    console.log(shopcar)
    this.setData({
      totalprice: totalprice,
    })
  },

  // --------------结算-------------


  sentOrder() {
    let dishes = app.globalData.shopcarinfo,
      openid = wx.getStorageSync('openid'),
      createTime = new Date(),
      totalprice = this.data.totalprice,
      userInfo = wx.getStorageSync('userInfo'),
      shopcar = this.data.shopcarinfo,
      num = '',
      numList = []
    for(let i in shopcar){
      numList.push(shopcar[i].num)
    }
    numList = String(numList)
    let pack = {
      "createTime": createTime,
      "dishes": dishes,
      "customer": {
        "customerName": userInfo.nickName,
        "gender": userInfo.gender,
        "openId": openid
      },
      "nums":numList,
      "totalPrice": totalprice
    }
    pack = JSON.stringify(pack)
    addOrder(pack).then((res) => {
      // console.log(res)
      console.log(pack)
      app.globalData.shopcarinfo = [];
    })
    wx.navigateTo({
      url: '/pages/code/code',
      success:(res)=>{
        res.eventChannel.emit('', {
          orderList: -1
        })
      }
    })
  }


})