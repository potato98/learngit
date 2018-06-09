//index.js
Page({
  data: {
    search_result: false
  },

  // 搜索页面返回搜索结果
  onLoad: function (options) {
    if (options && options.search_Text){
     
      wx.request({
        url: 'https://eixy35ua.qcloud.la/weapp/search_book',
        header: {
          'Content-Type': 'application/json'
        },
        data:{
          name: options.search_Text
        },
        success: res => {
          console.log(res.data);
          if(res.data.data.state == 'ok'){
            
              this.setData(
                {
                  search_result : true,
                  search_book: res.data.data.data
                }
              )
          }
          
        }
      })

    }
  },

})
