import request from '../../utils/request.js'
Page({

  data: {
    // 商品列表
    goodsList: []
  },
  // 输入完成事件
  inputEvent(e){
    
    request({
      url:"/goods/qsearch",
      params:{
        query: e.detail.value
      }
    }).then(res=>{
      console.log(res)
    })
  }

})