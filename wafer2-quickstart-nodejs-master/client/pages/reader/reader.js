var currentChapter = 0
var chapters
var book_content
var book_id=1
var now_chapter
var app=getApp()
var user_book
var new_percentage=1
var label = 0
//var username=app.globalData.openid
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    topNum:0,
    showView:true
  },

  returnTop:function(e){
    if(wx.pageScrollTo){
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    label = options.label
    // console.log('reader get label' + options.label)

    console.log('Onreader load: '+ options.book_id)

    showView:(options.showView == "true" ? true : false)
    if(app.globalData.logged){
      wx.request({   //从User_Book表中获取当前阅读进度
        url: 'https://eixy35ua.qcloud.la/weapp/test_text',
        data: {
          user_name: app.globalData.openid,
          book_id: options.book_id
        },
        success: res => {

          user_book = res.data.data
          currentChapter = user_book[0].Percentage - 1
          console.log(user_book[0].Percentage)
          // this.setData({
          //   jindu: user_book[0].Percentage,
          //   zongshu: chapters
          // })
        }
      })
    }
   
   
    wx.request({   //从Book表中获取数据
      url: 'https://eixy35ua.qcloud.la/weapp/book',
      data: {
        book_id:options.book_id
      },
      success:res =>
      {
        book_content= res.data.data
        console.log(book_content)
        chapters=res.data.data.length  //记录章节总数
        book_id=book_content[0].Book_Id //当前书籍的BOOKID
        console.log(book_id)
        
        console.log(app.globalData.openid)
        if (currentChapter < chapters) {
          this.setData({
            text_chapter: book_content[currentChapter].Content,
            now_chapter:currentChapter+1,
            total_chapters:chapters
          })
        }        
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  //退出时，更新当前阅读进度
  onUnload: function () {
    wx.request({   
      url: 'https://eixy35ua.qcloud.la/weapp/update_percentage',
      data: {
        user_name:app.globalData.openid,
        book_id: book_content[0].Book_Id,
        new_percentage:currentChapter+1
      },
      success: res => {
        console.log(app.globalData.openid)
        console.log('success!!!')
        console.log(res.data)   
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
//上一章
  preChapter:function(){
    if(currentChapter > 0){
      currentChapter=  currentChapter - 1
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
      this.setData({
        now_chapter:currentChapter + 1,
        text_chapter: book_content[currentChapter].Content,
        total_chapters:chapters
      })
    }else{
      wx.showToast({
        title: '没有上一章了哦~o(╯□╰)o',
        icon: 'success',
        duration: 2000
      })
    }
  },
//下一章
  nextChapter:function () {

    if(label == 1){
      if (currentChapter < chapters - 1) {
        currentChapter = currentChapter + 1
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0,
          })
        }
        this.setData({
          now_chapter: currentChapter + 1,
          text_chapter: book_content[currentChapter].Content,
          total_chapters: chapters
        })

      } else {
        wx.showToast({
          title: '已经是最后一章了哦o(╯□╰)o',
          icon: 'success',
          duration: 1000
        })
      }
    }else{
      wx.showToast({
        title: '试读结束了哦o(╯□╰)o',
        icon: 'none',
        duration: 1000
      })
    }
    
  }
})