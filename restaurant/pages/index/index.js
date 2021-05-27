var app = getApp()
import {
  getByCanteenId
} from '../../service/index.js'
Page({

  data: {
    searchKey: '', //搜索栏关键词
    // 分类
    restaurantName: ['春晖园一楼', '春晖园二楼', '北区食堂'],
    restaurantIndex: 0,
    navBarHeight: app.globalData.navBarHeight,
    menu: [],
    dishItem: [],
    openid:''

  },



  // =========页面加载--------------
  onLoad() {

    this._getByCanteenId()
  },

  onShow() {
    this.setData({
      openid : app.globalData.openid
    })
    console.log("onShow")
    let that = this;
    //返回首页时,获取购物车数据
    let shopcar = app.globalData.shopcarinfo
    let dishItem = that.data.dishItem
    // 数据初始化
    for (let i in dishItem) {
      // console.log(dishItem[i])
      dishItem[i].num = 0
    }
    this.setData({
      dishItem: dishItem
    })
    // console.log(this.data.dishItem)
    for (let i in shopcar) {
      if (shopcar[i].num != 0) {
        for (let j = 0; j < dishItem.length; j++) {
          if (dishItem[j].dishesId == shopcar[i].dishesId) {
            dishItem[j].num = shopcar[i].num;
            // console.log(j)
            break;
          }
        }
      }
    }
    this.setData({
      dishItem: dishItem,
    })
  },


  //-----------------------选择食堂---------------------------
  restaurantChange(e) {
    let that = this
    let index = parseInt(e.detail.value)
    this.setData({
      restaurantIndex: index
    })
    this._getByCanteenId()

  },

  _getByCanteenId() {
    //获取食堂数据
    let that = this;
    let restaurantIndex = that.data.restaurantIndex
    let menu = [],dishItem = []
    getByCanteenId(restaurantIndex).then((res) => {
      menu = res.obj.windows;
      for (let i in menu) {
        for (let j in menu[i].dishes) {
          // console.log(menu[i].dishes[j])
          menu[i].dishes[j].num = 0;
          dishItem.push(menu[i].dishes[j])
        }
      }
 
      that.setData({
        menu: menu,
        dishItem: dishItem
      })

    })
  },

  // ------------------------------搜索栏------------------------------
  // 搜索栏回车查找信息
  onSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
      success: (res) => {
        res.eventChannel.emit('', {
          searchKey: this.data.searchKey
        })
      }
    })
  },
  // 监听搜索栏改变信息
  searchChange(e) {
    this.setData({
      searchKey: e.detail
    })
    // console.log(this.data.searchKey)
  },
  // 点击搜索触发事件
  onSearchClick() {
    let that = this;
    wx.navigateTo({
      url: '/pages/search/search',
      success: (res) => {
        // console.log(that.data.searchKey)
        res.eventChannel.emit('', {
          searchKey: this.data.searchKey
        })
      }
    })
  },

  // ---------------分类----------------
  typeItemTap(e){
    let index = e.detail,
        windowsItem = this.data.menu[index]
    wx.navigateTo({
      url: '/pages/types/types',
      success: (res) => {
        res.eventChannel.emit('', {
          windowsItem: windowsItem
        }) 
      }
    })
  },

  // --------添加进购物车-------------
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