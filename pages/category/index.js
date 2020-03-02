// pages/category/index.js

import request from "../../utils/request.js"
Page({

  data: {
    // tab栏当前索引
    current: 0,
    // 分类数据
    category:[]
  },

  // 点击样式
  clickcolor(e){
    this.setData({
      current: e.currentTarget.dataset.item
    })
  },

  onLoad(){
    request({
      url:"/categories"
    }).then(res=>{
      console.log(res)
      this.setData({
        category: res.data.message
      })
    })
  }
})