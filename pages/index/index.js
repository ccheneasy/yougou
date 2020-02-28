// 引入自己封装的request
import request from '../../utils/request.js'
Page({
  data: {
    // 轮播图数据
    swiperList:[],
    // 导航栏数据
    catitems:[],
    // 楼层数据
    floors:[]
  },
  
  // 回到顶部
  totop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
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
      

      // 获取楼层展示部分的请求
      request({
        url: "/home/floordata"
      }).then(res=>{
        console.log(res)
        this.setData({
          floors: res.data.message
        })
      })
  }

})
