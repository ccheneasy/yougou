// 引入自己封装的request
import request from '../../utils/request.js'
Page({
  data: {
    swiperList:[]
  },
  
  onLoad(){
      request({
        url: '/home/swiperdata'
      }).then(res=>{
        this.setData({
          swiperList : res.data.message
        })
      })
  }

})
