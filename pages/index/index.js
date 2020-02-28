// 引入自己封装的request
import request from '../../utils/request.js'
Page({
  data: {
    // 轮播图数据
    swiperList:[],
    // 导航栏数据
    catitems:[],
    // 楼层数据
    floors:[],
    // 保存是否显示回到顶部的状态
    isshow: false
  },
  
  // 回到顶部
  totop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  // 监听页面滚动触发事件
  // 默认的事件参数返回一个对象scrollTop是垂直方向已滚动的距离
  onPageScroll(e){
    let {scrollTop} = e
    // 为了避免频繁调用data里面的数据，拿出最开始的isshow的值
    let isshow = this.data.isshow
    // 做一个判断，当滚动到某一个距离将显示的状态isshow打开
    if (scrollTop>100){
      isshow = true
    }else{
      isshow = false
    }
    // 这里可以再次做个判断，判断此时的ishow和最开始的isshow是否相同，减少调用data的次数
    if(isshow !== this.data.isshow){
      // 如果确认isshow的状态已经更改，则改变data里面的isshow
      this.setData({
        isshow: isshow
      })
    }
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
        this.setData({
          floors: res.data.message
        })
      })
  }

})
