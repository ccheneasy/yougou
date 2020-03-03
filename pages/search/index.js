import request from '../../utils/request.js'
Page({

  data: {
    // 双向绑定input框的输入值
    value: '',
    // 上一次输入的值，后面为了保证最后请求的参数是最后一次输入的值
    lastValue:'',
    // 返回远程搜索的列表
    searchlist: [],
    // 开关，解决异步多次请求，防抖
    isloding:true
  },

  // 封装回去搜索建议的请求
  getRecommend(){
    // 判断上一次请求是否完成
    if (this.data.isloading == false) return;
    // 刚进去请求时，改掉状态
    this.setData({
      isloading: false,
      // 记录当前搜索的输入框的值
      lastValue: this.data.value
    })
    request({
      url: '/goods/qsearch',
      data: {
        query: this.data.value
      }
    }).then(res => {
      this.setData({
        searchlist: res.data.message,
        // 改掉状态
        isloading = true
      })
      // 判断是否是inputValue值是最新,如果不是的话再次请求接口
      if (this.data.lastValue !== this.data.value) {
        this.getRecommend();
      }
    })

  },

  bindinput(e){
    let { value } = e.detail
    this.setData({
      value: value
    })
    console.log(value)
    // 当输入框为空时，中断执行
    if(this.data.value == '')return;
    
    
  }
  
})