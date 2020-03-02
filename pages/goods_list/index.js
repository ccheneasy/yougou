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
    this.setData({
        name: options.name
    })
    this.getDataList()
  },

  // 页面上拉触底事件
  onReachBottom(){
    console.log("触发了一次底部")
    this.setData({
      pagenum:this.data.pagenum + 1
    })
    this.getDataList()
    // 做一个判断，是否为数据展示完成了
    if (this.data.total == this.data.goodsList.length){
      this.setData({
        hasMore: false
      })
    }
  },

  // 封装获取数据列表的方法
  getDataList(){
    if (this.data.hasMore == false){return;}
      request({
        url: "/goods/search",
        data: {
          query: this.data.name,
          pagenum: this.data.pagenum, // 页数
          pagesize: 10
        }
      }).then(res => {
        // 数据改造,将价格后面加上两位小数
        let goods = res.data.message.goods.map(v => {
          v.goods_price = v.goods_price.toFixed(2)
          return v
        })
        this.setData({
          // 为了让上一页的数据不丢失 数组也可以解构
          goodsList: [...this.data.goodsList , ...goods] ,
          total: res.data.message.total
        })
      })
    console.log("请求了一次request")
  }
})