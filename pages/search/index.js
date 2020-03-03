import request from '../../utils/request.js'
Page({

  data: {
    value: '',
    searchlist: []
  },

  bindinput(e){
    let { value } = e.detail
    this.setData({
      value: value
    })
    console.log(value)
    if(this.data.value == '')return;
    request({
      url: '/goods/qsearch',
      data:{
        query: this.data.value
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        searchlist: res.data.message
      })
    })
  }
  
})