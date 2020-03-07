
Page({

  data: {
    // 收货地址
    adress: {},
    // 商品信息
    cart:[],
    // 总共价钱
    allprice:'',
    // 总共商品个数
    allnumber: '',
    // 全选的状态
    allchecked: true
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
    console.log(cart)
    // 在未减之前提示用户
    if (cart[index].number <= 1 && number === -1) {
      // 提示用户删除最后一个
      wx.showModal({
        title: '提示',
        content: '删除此商品',
        success:(res)=> {
          if (res.confirm) {
            cart.splice(index,1)
          }
          // 更新数据，实现刷新页面
          this.setData({
            cart: cart,
          })
          wx: wx.setStorageSync("cart", cart)
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
    wx:wx.setStorageSync("cart", cart)
    // 调用方法更新价格
    this.getallprice()
  },


  // 封装一个计算总价的方法
  getallprice(){
    // 总共商品的个数
    let allnumber = 0
    // 总共的价钱
    let allprice = 0
    if (this.data.cart.length === 0)return;
    this.data.cart.forEach(v => {
      if(!v.check)return;
      allprice += v.price * v.number
      allnumber += v.number
    })
    // 更新数据，实现刷新页面
    this.setData({
      allprice: allprice,
      allnumber: allnumber
    })
  },

  // 全选的按钮
  allcheck(){
    // 将此时的选择的状态取反
    this.setData({
      allchecked:!this.data.allchecked
    })
    // 更改数组里面的所有项的状态
      this.data.cart.forEach(v=>{
        v.check = this.data.allchecked
      })
      this.setData({
        cart: this.data.cart
      })
      // 调用计算的方法，重新计算价格
      this.getallprice()
  },
  // 单个商品的单选
  checkitem(e){
    // 点击改变此时的check的状态
    let { index } = e.currentTarget.dataset
    this.data.cart[index].check = !this.data.cart[index].check
    this.setData({
      cart: this.data.cart
    })
    // 通过遍历，判断是否是全选全不选的状态,进而改变全选的状态
    let ischeck = this.data.cart.some(v => {
      return !v.check
    })
    if(!ischeck){
      this.data.allchecked = true
    }else{
      this.data.allchecked = false
    }
    // 此时必须更改数据
    this.setData({
      allchecked: this.data.allchecked
    })
    // 调用计算的方法，重新计算价格
    this.getallprice()
  }
})