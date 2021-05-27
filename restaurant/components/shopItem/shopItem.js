Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopcarinfo: {
      type: Array,
      value: []
    },
    allPrice: {
      type: Number,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalprice: 0 // 总金额
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 删除购物车
    delete: function (e) {
      var that = this, 
      index = e.currentTarget.dataset.index,
        shopcar = this.properties.shopcarinfo,
        totalprice = this.properties.allPrice; 

      wx.showModal({
        content: '是否确认删除？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定', index);
            totalprice -=  parseFloat(shopcar[index].price) * shopcar[index].num; 
            shopcar[index].num = 0;
            that.setData({
              shopcarinfo: shopcar,
              totalprice: totalprice
            });
            that.triggerEvent("delete", [totalprice,index]);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    },


    //点击加减按钮  
    numchangeTap: function (e) {
      // console.log(e)
      let Index = e.currentTarget.dataset.index, //点击的商品下标值        
        shopcar = this.properties.shopcarinfo,
        types = e.currentTarget.dataset.types; //是加号还是减号    
      var totalprice = this.properties.allPrice; //获取父组件的总价格 
      switch (types) {
        case 'add':
          shopcar[Index].num++; //对应商品的数量+1      
          totalprice += parseFloat(shopcar[Index].price); //如果商品为选中的，则合计价格+商品单价      
          break;
        case 'sub':
          shopcar[Index].num--; //对应商品的数量-1      
          totalprice -= parseFloat(shopcar[Index].price); //如果商品为选中的，则合计价格-商品单价      
          break;
      }
      console.log(totalprice)
      this.triggerEvent("totalbtn", [totalprice,shopcar[Index],Index])
      this.setData({
        shopcarinfo: shopcar,
        totalprice: totalprice
      });
    },
  }
})