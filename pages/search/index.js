import request from '../../utils/request.js'
Page({

  data: {
    // 双向绑定input框的输入值
    value: '',
    // 上一次输入的值，后面为了保证最后请求的参数是最后一次输入的值
    lastValue:'',
    // 返回远程搜索的列表
    searchlist: [],
    // 本地储存的搜索记录的列表
    historyList:[],
    // 开关，解决异步多次请求，防抖
    isloding:true
  },

  onLoad(){
    // 现将本地的存储的数据取出
    let arr = wx.getStorageSync("history")
    // 判断本地是否有之前存的arr的数据
    arr = arr ? arr : []
    // 将此时的值拿去渲染
    this.setData({
      historyList: arr
    })
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
        isloading : true
      })
      // 判断是否是inputValue值是最新,如果不是的话再次请求接口
      if (this.data.lastValue !== this.data.value) {
        this.getRecommend();
      }
    })

  },
  // 封装本地储存的操作
  handlestorage(){
    if (this.data.value=='')return;
    // 现将本地的存储的数据取出
    let arr = wx.getStorageSync("history")
    // 判断本地是否有之前存的arr的数据
    arr = arr ? arr : []
    // 此时，将现在的新的搜索的历史记录存进去
    arr.unshift(this.data.value)
    // 数组去重
    arr = [...new Set(arr)]
    // 将此时的值拿去渲染
    this.setData({
      historyList: arr
    })
    // 调用本地储存的方法,将新的数据存进去
    wx.setStorageSync("history", arr)
  },
  // 输入框触发事件
  bindinput(e){
    let { value } = e.detail
    this.setData({
      value: value
    })
    // 当输入框为空时，中断执行
    if(this.data.value == '')return;
      this.getRecommend()
  },
  // 输入框失去焦点事件
  handleBlur(){
    // this.setData({
    //   value:''
    // })
    
    // this.handlestorage()
  },
  // 输入框确认事件
  bindconfirm(){
    // 调用本地存储的方法
    this.handlestorage()
    // 页面的跳转
    wx.redirectTo({
      url:'/pages/goods_list/index?name='+this.data.value
    })
  },
  // 点击跳转到商品详情页面
  handletogoodsList(e){
    console.log(e.target.dataset.nameid)
    if(!e.target.dataset.id){
      this.setData({
        searchlist: []
      })
    }
  },
  // 点击取消事件
  cancel(){
    this.setData({
      value: '',
      lastValue: '',
      searchlist: [],
      isloding: true
    })
  },
  // 点击清除历史搜索
  clearhistory(){
    this.setData({
      historyList:[]
    })
    // 清空本地存储
    wx:wx.setStorageSync("history", [])
  }
})