// pages/cart/index.js
Page({

  data: {
    // 收货地址
    adress: {},
    // 商品信息
    cart:[],
    // 总共价钱
    allprice:'',
    // 总共商品个数
    allnumber: ''
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

  // 获取收货地址
  getadress(){
    wx.chooseAddress({
      success(res) {
        let adress = {
          userName: res.userName,
          telNumber: res.telNumber,
          adressinfo: res.provinceName + res.cityName + res.countyName + res.detailInfo
        }
        wx: wx.setStorageSync("adress", adress)
      }
    })
  },

  // 加减商品
  calcnum(e){
    let {index,number} = e.currentTarget.dataset
    let cart = this.data.cart
    // 在未减之前提示用户
    if (cart[index].number <= 1 && number === -1) {
      // 提示用户删除最后一个
      wx.showModal({
        title: '提示',
        content: '删除此商品',
        success(res) {
          if (res.confirm) {
            cart.splice(index,1)
          }
          // 更新数据，实现刷新页面
          this.setData({
            cart: cart,
          })
        }
      })
    }else{
      // 实现加减数量
      cart[index].number += number
    }

    // 更新数据，实现刷新页面
    this.setData({
      cart: cart,
    })
    // 调用方法更新价格
    this.getallprice()
  },


  // 封装一个计算总价的方法
  getallprice(){
    // 总共商品的个数
    let allnumber = 0
    // 总共的价钱
    let allprice = 0
    this.data.cart.forEach(v => {
      allprice += v.price * v.number
      allnumber += v.number
    })
    // 更新数据，实现刷新页面
    this.setData({
      allprice: allprice,
      allnumber: allnumber
    })
  }
})