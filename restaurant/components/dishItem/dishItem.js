let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dishItem: {
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
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击加减按钮  
    numchangeTap: function (e) {
      // console.log(e)
      let Index = e.currentTarget.dataset.index, //点击的商品下标值        
        dishItem = this.properties.dishItem,
        types = e.currentTarget.dataset.types; //是加号还是减号    
      // console.log(Index,dishItem,types)
      switch (types) {
        case 'add':
          dishItem[Index].num++; //对应商品的数量+1      
          break;
        case 'sub':
          dishItem[Index].num--; //对应商品的数量-1      
          break;
      }
      this.setData({
        dishItem: dishItem,
      });
      this.triggerEvent("numchangeTap", dishItem[Index])

    },
  }
})