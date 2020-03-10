// 封装一个和axios的基本功能的请求
// 需要具备以下功能

// 1.调用返回一个promise （以axios举例）
//  request({
//   ...配置
//    }).then(res => { }).catch(err => { })

//  2.配置基准路径
//  request.defaults.baseURL = "路径"

//  3.错误拦截
//  request.onError(res => {
//   处理错误
//  })



// 配置request的promise
// 函数参数里面有config ={} es6新语法，传入的参数的默认值是{}
const request =( config={} )=>{
  // 返回一个promise可以实现.then和.catch
  return new Promise((resolve,reject)=>{
    // 优化传入的参数url
    // 判断地址是否是相对地址，如果是，需要加上定义好的基地址
    // search方法，按照正则查找是否是以http开头，不是的话该方法返回-1
    if(config.url.search(/^http/)===-1){
      config.url = request.defaults.baseURL + config.url
    }

    // 加一个加载提示框，优化体验，在未加载完成时，页面变得无法操作
    wx.showLoading({
      title: '加载中',
    })

    // 在函数体里面调用wx的请求方法
    wx.request({
      // 将传入的参数解构出来
      ...config,
      // 这是request的成功的返回，此时对应resolve的回调
      success(res){
        // 在里面调用resolve将其作为promis的.then的返回
        // resolve是 .then 里面的函数，一般请求成功时候执行
        resolve(res)
      },
      // 失败的回调,和success一样
      fail(res){
        reject(res)
      },
      // 不管成功失败都会执行的函数
      complete(res){
        // 执行错误的拦截器
        // 在这里拿到res的参数
        // 调用错误拦截器的方法,传参
        request.errors(res)

        // 在这个不管成功还是失败都会执行的函数里，当加载完成时，关闭加载提示框
        wx.hideLoading()
      }
    })
  })
}

// 配置request的基地址
// 在request上加一个方法,
request.defaults = {
  baseURL: ''
}

// 存储request的错误拦截器的筛选条件的方法
request.errors = ()=>{}

// 给request添加一个方法
request.onError = (callback)=>{
  // 做一个传进来的callback是否是函数的判断
  if(typeof callback === 'function'){
    // 如果是的话，将传入进来的callback函数存起来
    request.errors = callback
  }
}

// 暴露request的方法
export default request
  
