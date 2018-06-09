var app = getApp()
var arr1 = []
var bookid
var openid
var bookname
var url
var book_content
var booklabel
var cate
var auth
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: 0,//实心星星个数
    two: 5,//空心星星个数
    input_value: '',//输入框的初始值
    is_buy: 0,
    book_label : 0//标记当前图书是否为试读
  },

//评论的星星动作
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one;
    if (in_xin === 'star') {
      one = Number(e.currentTarget.id);
    } else {
      one = Number(e.currentTarget.id) + this.data.one;
    }
    this.setData({
      one: one,
      two: 5 - one
    })
  },


//输入评论
  CommentInput: function (e) {
    if (!app.globalData.logged) {
      wx.showToast({
        title: '登录后才可以评论哦',
        icon: 'none'
      })
    } else {
      if (e.detail.value != '') {
        wx.request({
          url: 'https://eixy35ua.qcloud.la/weapp/add_comment',
          data: {
            user: app.globalData.openid,
            bookname: bookname,
            comment: e.detail.value,
            grade: this.data.one
          },
          success: res => {
            console.log(res)
          }

        })

        this.setData({
          input_value: ''
        })
        console.log(e.detail.value)

        this.doGetComment();
      } else {
        wx.showToast({
          title: '评论不能为空',
        })
      }
    }


  },


//初始化购买按钮
  doInitBuy: function () {
    if (booklabel == '限免') {
      this.setData({
        book_label: 1
      })
    } else if (app.globalData.logged) {
      if (this.data.is_buy == 1) {
        this.setData({
          book_label: 1
        })
      } else {
        this.setData({
          book_label: 0
        })
      }
    } else {
      this.setData({
        book_label: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //书籍基本信息
    bookid = options.id,
    openid = app.globalData.openid,
    bookname = options.name,
    url = options.picurl
    booklabel = options.label
    cate = options.cate
    auth = options.auth

    console.log('detail get label' + options.label)



    this.setData({
      book_id: bookid,
      book_name: bookname,
      pic: url,
      author: options.auth,
      category: options.cate
    })



   
    
    this.doInitBuy_Collect()

    this.doInitBuy()

    this.getmenu()
    
   
    this.doGetComment();


  },

//初始化购买收藏
  doInitBuy_Collect:function(){
    var that = this
    //console.log('onLoad:' + app.globalData.logged)
    if (app.globalData.logged) {
      wx.request({
        url: 'https://eixy35ua.qcloud.la/weapp/select_iscollect',
        data: {
          openid,
          bookid,
          bookname,
          url
        },
        success: res => {
          that.setData({
            iscollect: res.data.data[0].If_Collect,
            is_buy: res.data.data[0].If_Buy
          })

        }

      })
    }
  },

//获得目录
  getmenu:function(){
    var that = this
    wx.request({   //从Book表中获取数据
      url: 'https://eixy35ua.qcloud.la/weapp/book',
      data: {
        book_id: bookid
      },
      success: res => {
        book_content = res.data.data

        var a = []

        for (var item in book_content) {
          var arr = book_content[item].Content.split('\n')
          a.push(arr[0])
          //console.log(item+ '  '+ arr[0])

        }

        console.log(a)

        that.setData({
          book_menu: a
        })
        //console.log(book_content)

      }
    })

  },

//从数据库获取评论
  doGetComment: function () {
    var that = this
    //get_comment
    wx.request({

      url: 'https://eixy35ua.qcloud.la/weapp/get_comment',
      data: {
        bookname: bookname
      },
      success: res => {
       // console.log(res.data.data)
        arr1 = res.data.data
        that.doInit();
      }
    })
  },

//初始化评论
  doInit: function () {
    console.log('init_comment')
    console.log(arr1)
    console.log('init_comment')
    this.setData({
      book_comment: arr1
    })

    
  },


//收藏事件
  collect: function () {
    if (app.globalData.logged) {
      this.setData({
        iscollect: this.data.iscollect == 1 ? 0 : 1
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }



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
    // console.log('Hide:' + app.globalData.logged )
    arr1 = []
  },

  /**
   * 生命周期函数--监听页面卸载，保存用户对收藏状态的改变
   */
  onUnload: function () {
    arr1 = []
    if (app.globalData.logged) {
      wx.request({
        url: 'https://eixy35ua.qcloud.la/weapp/click_collect',
        data: {
          bookid,
          openid,
          collect_state: this.data.iscollect
        },
        success: res => {
          // console.log(this.data.iscollect)
        }

      })
    }

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
    return{
      title:'',
      desc:bookname,
      path: '/pages/detail/detail?id='+bookid+'&name='+bookname+'&picurl='+url+'&auth='+auth+'&cate='+cate+'&label='+booklabel
    }

  },

//购买图书
  buy: function () {
    var that = this
    if (!app.globalData.logged) {
      wx.showToast({
        title: '先登录才可以购买哦',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'https://eixy35ua.qcloud.la/weapp/buy_book',
        data: {
          username: app.globalData.openid,
          bookname: bookname
        },
        success: res => {
          console.log(res)
          if (res.data.data == -1) {
            wx.showToast({
              title: '余额不足',
              icon: 'none'
            })
          } else if (res.data.data == 0) {
            wx.showToast({
              title: '购买成功',
              icon: 'none'
            })

            that.setData({
              is_buy: 1
            })

            that.doInitBuy()

          }
        }
      })
    }
  }
})
