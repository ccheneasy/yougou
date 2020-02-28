//app.js

// 引入自己封装的request
import request from './utils/request.js'
App({
  onLaunch: function () {
    // 定义一个request的基准路径
    request.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  }
})