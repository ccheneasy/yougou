import request from '../../utils/request.js'
Page({

  data: {
    // 收货地址
    adress: {},
    // 商品信息
    cart:[],
    // 总共价钱
    allprice:'',
  },

  onLoad: function (options) {
    
  },

  onShow: function () {
    this.setData({
      adress: wx.getStorageSync('adress'),
      cart: wx.getStorageSync('cart')
    })
    // 调用方法更新价格
    this.getallprice()
  },

  // 封装一个计算总价的方法
  getallprice(){
    // 总共的价钱
    let allprice = 0
    if (this.data.cart.length === 0)return;
    this.data.cart.forEach(v => {
      if(!v.check)return;
      allprice += v.price * v.number
    })
    // 更新数据，实现刷新页面
    this.setData({
      allprice: allprice
    })
    wx.setStorageSync("cart", this.data.cart)
  },


  // 立即支付部分
  pay(){
    // 先判断本地有没有支付所需要的token
    let token = wx.getStorageSync("token")
    if(!token){
      // 没有的话跳转到授权页
      wx.navigateTo({
        url: '/pages/authorize/index',
      })
    }else{
      // 获取请求所需要的对应数据
      // 订单数组
      let goods = this.data.cart.map(v=>{
            return {
              goods_id: v.id,
              goods_number: v.number,
              goods_price: v.price,
            }
      })
      // 获取地址
      let consignee_addr = this.data.adress.adressinfo

      // 发起请求,生成订单
      request({
        url: "/my/orders/create",
        method: "POST",
        header: {
          Authorization: token
        },
        data: {
          order_price : this.data.allprice,
          consignee_addr,
          goods
        }
      }).then(res=>{
        // 获取支付所需要的订单编号
        let { order_number} = res.data.message
        // 支付
        request({
          url:"/my/orders/req_unifiedorder",
          method: 'POST',
          header: {
            Authorization: token
          },
          data:{
            order_number,
          }
        }).then(res=>{
          // 解构需要的参数
          let {pay} = res.data.message
          // 调用微信原生支付接口
          wx.requestPayment(pay)
        })

      })
    }


  }

})