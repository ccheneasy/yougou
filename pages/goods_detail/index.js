// pages/goods_detail/index.js

import request from '../../utils/request.js'
Page({

  data: {
    // 商品详情
    detail:'',
    // tab栏
    current:0
  },

  onLoad: function (options) {
    request({
      url:"/goods/detail",
      data:{
        goods_id: options.id
      }
    }).then(res=>{
      this.setData({
        detail: res.data.message
      })
      console.log(this.data.detail)
    })
  },

  handletab(e){
    this.setData({
      current: e.currentTarget.dataset.tab
    })
  },

  // 预览图片
  prewimg(e){
    // 为了符合urls的格式，进行数据改造
    let arr = this.data.detail.pics.map(v=>{
      return v.pics_big
    })
    wx.previewImage({
      // 想点击进去先显示哪张图片
      current: arr[e.currentTarget.dataset.indeximg],
      urls: arr
    })
  },
  // 加入购物车
  addcart(){
    let item = {
      id : this.data.detail.goods_id,
      name: this.data.detail.goods_name,
      price: this.data.detail.goods_price,
      logo: this.data.detail.goods_small_logo,
      number:1
    }
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
    let cart = wx.getStorageSync("cart") || []

    let exist = cart.some(v=>{
      if (v.id === this.data.detail.goods_id){
        v.number+=1
        wx.showToast({
          title: '数量+1',
          icon: 'success'
        })
      }
      return v.id === this.data.detail.goods_id
    })
    if (!exist){
      cart.unshift(item)
      wx.showToast({
        title: '加入成功',
        icon: 'success'
      })
    }
    // 保存到本地
    wx.setStorageSync('cart', cart)
  }
})