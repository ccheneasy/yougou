import request from '../../utils/request.js'
Page({

  data: {
    // 关键字
    name:'',
    // 商品列表
    goodsList: [],
    // 商品总个数
    total:''
  },

  onLoad(options){
    let {name} = options
    request({
      url: "/goods/search",
      data: {
        query: name
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        name:name,
        goodsList:res.data.message.goods,
        total: res.data.message.total
      })
    })
  }

})