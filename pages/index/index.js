// 引入自己封装的request
import request from '../../utils/request.js'
Page({
  data: {
    swiperList:[],
    catitems:[]
  },
  
  onLoad(){
    // 获取swiper轮播图的请求
      request({
        url: '/home/swiperdata'
      }).then(res=>{
        this.setData({
          swiperList : res.data.message
        })
      })
      // 获取导航栏的请求
      request({
        url:"/home/catitems"
      }).then(res=>{
        // 返回的数据由于跳转的路径不一样，所以需要改造数据
        let newData = res.data.message.map((v,i)=>{
          // 做一个小的判断，取到第一个数据
          if(v.name === '分类'){
            v.url = "/pages/category/index"
          }
          return v
        })
        this.setData({
          catitems: newData
        })
      })
      
  }

})
