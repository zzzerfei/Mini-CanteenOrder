import {getSearch} from '../../service/index.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInfo:'',
    searchKey:'',
  },
  
  // 显示搜索结果
  onLoad: function (options) {
      // 获取搜索事件
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('', function(data) {
      let searchKey = String(data.searchKey)
      console.log(searchKey)
      getSearch(searchKey).then((res)=>{
        console.log(res.obj)
        that.setData({
          searchKey:searchKey,
          searchInfo:res.obj,
        })
        that.getNumber()

      })
    })
  },

  getNumber(){
    let that = this;
    //返回首页时,获取购物车数据
    let shopcar = app.globalData.shopcarinfo
    let searchInfo = that.data.searchInfo
    // 数据初始化
    for (let i in searchInfo) {
      // console.log(dishItem[i])
      searchInfo[i].num = 0
    }
    that.setData({
      searchInfo: searchInfo
    })
    for (let i in shopcar) {
      if (shopcar[i].num != 0) {
        for (let j = 0; j < searchInfo.length; j++) {
          if (searchInfo[j].dishesId == shopcar[i].dishesId) {
            searchInfo[j].num = shopcar[i].num;
            // console.log(j)
            break;
          }
        }
      }
    }
    that.setData({
      searchInfo: searchInfo,
    })
  },

  // -------------搜索栏--------
  // 搜索栏回车查找信息
  onSearch() {
    let that = this
    let searchKey = String(this.data.searchKey)
    getSearch(searchKey).then((res)=>{
      console.log(res.obj)
      that.setData({
        searchKey:searchKey,
        searchInfo:res.obj,
      })
      that.getNumber()

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
    let that = this
    let searchKey = String(this.data.searchKey)
    getSearch(searchKey).then((res)=>{
      console.log(res.obj)
      that.setData({
        searchKey:searchKey,
        searchInfo:res.obj,
      })
      that.getNumber()

    })
  },


  // -----------添加进购物车
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