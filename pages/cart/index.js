// pages/cart/index.js
Page({

  data: {
    // 收货地址
    adress: {}
  },

  onLoad: function (options) {
    
  },

  onShow: function () {
    this.setData({
      adress: wx.getStorageSync('adress')
    })
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
  }
})