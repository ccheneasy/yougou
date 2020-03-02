import request from '../../utils/request.js'
Page({

  data: {
    // 关键字
    name:'',
    // 商品列表
    goodsList: [],
    // 商品总个数
    total:'',
    // 是否有更多
    hasMore: true,
    // 页面
    pagenum: 1,
    // 是否正在加载中
    loading: true
  },

  onLoad(options){
    let {name} = options
    request({
      url: "/goods/search",
      data: {
        query: name,
        pagenum: this.data.pagenum, // 页数
        pagesize: 10
      }
    }).then(res=>{
      // 数据改造,将价格后面加上两位小数
      let goods = res.data.message.goods.map(v => {
        v.goods_price = v.goods_price.toFixed(2)
        return v
      })
      console.log(goods)
      this.setData({
        name:name,
        goodsList:goods,
        total: res.data.message.total
      })
    })
  }

})