// pages/index/child-components/type-item/type-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menu: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  methods: {
    typeItemTap(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index
      this.triggerEvent("typeItemTap",index)

    }
  }
})