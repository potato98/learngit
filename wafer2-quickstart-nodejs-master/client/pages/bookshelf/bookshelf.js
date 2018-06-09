// pages/bookshelf/bookshelf.js
var jsonname;
var arr//书架信息
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    bookinfo: [],//书籍基本信息
    is_edit:false//当前页面是否处于编辑状态
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doGetBookShelf()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {


  },

//进入/退出编辑
  into_edit: function(){
    this.setData({
      is_edit:true
    })
  },
  exit_edit: function(){
    this.setData({
      is_edit: false
    }),
    this.doGetBookShelf()
  },

//书籍分类

  ClassInput: function (e) {
     
      if (e.detail.value != '') {
        console.log(e.currentTarget.dataset.bookname)
        wx.request({
          url: 'https://eixy35ua.qcloud.la/weapp/set_userlabel',
          data: {
            username: app.globalData.openid,
            bookname: e.currentTarget.dataset.bookname,
            label: e.detail.value
          },
          success: res => {
            console.log(res)
          }

        })

        
        console.log(e.detail.value)

        // this.doGetComment();
      } else {
        wx.showToast({
          title: '分类名不能为空',
          icon:'none'
        })
      }
    


  },

  //删除图书
  delete_book: function(e){
    var that = this
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/click_collect',
      data: {
        bookid: e.currentTarget.dataset.bookname,
        openid: app.globalData.openid,
        collect_state: 0
      },
      success: res => {
        // console.log(this.data.iscollect)
        that.doGetBookShelf()
      }

    })

  },

  //得到书架信息
  doGetBookShelf: function () {
    var that = this
    if (app.globalData.logged) {
      wx.request({
        url: 'https://eixy35ua.qcloud.la/weapp/get_bookshelf',
        data: {
          name: app.globalData.openid
        },
        success: res => {
          console.log(res)
          arr = res.data.data
          that.doBookShelf()
        }

      })
  

    }else {
      //用于debug
      // this.doBookShelf2()
    }

   
  },
 //仅用于debug
  doBookShelf2:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/bksf',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
       
        // console.log(xinshubang.data[0].Book_Name);
        this.setData(
          {
            bookinfo: res.data.data
          },
        )
      }
    })
  },
 //初始化书架
  doBookShelf: function () {

    //对书排序
    var compare = function (obj1, obj2) {
      var val1 = obj1.User_Label;
      var val2 = obj2.User_Label;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    } 
    arr.sort(compare)

    this.setData(
      {
        bookinfo: arr
      },
    )
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.doGetBookShelf()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})