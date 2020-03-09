// pages/authorize/index.js

import request from '../../utils/request.js'
Page({

  data: {

  },
  // 获取用户信息
  handleinfo(e){
    // 获得用户的信息
    let { encryptedData, rawData, iv, signature} = e.detail
    
    // 获取code
    wx.login({
      success(res) {
        // 判断有返回code
        if (res.code) {
          //此时可以获取token
          //发起网络请求
          request({
            url:'/users/wxlogin',
            method: 'POST',
            data:{
              encryptedData: encryptedData,
              rawData: rawData,
              iv: iv,
              signature: signature,
              code:res.code
            }
          }).then(res => {
            wx.setStorageSync('token', res.data.message.token)
            wx.navigateBack()
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})