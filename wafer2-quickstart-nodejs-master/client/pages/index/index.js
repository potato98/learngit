

var app = getApp()
var xinshubang
var dianjibang
var shoucangbang
var fufeibang
var xiaoshuo
var zhuanji
var yishu
var wenxue

Page({
  data: {
    navbar: ['推荐', '分类', '限免','排行'],
    currentTab: 0,
    navbar2: ['点击榜', '收藏榜', '付费榜', '新书榜'],
    currentTab2: 0
  },
//新书榜图书
  doInitXinshubang:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/bksf',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        xinshubang = res.data;
        // console.log(xinshubang.data[0].Book_Name);
        this.setData(
          {
            xinshu: xinshubang.data
          },
        )
      }
    })
  },
//点击榜图书
  doInitDianjibang:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/dianjibang',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        dianjibang = res.data;
        // console.log(dianjibang.data);
        this.setData(
          {
            dianji: dianjibang.data
          },
        )
      }
    })
  },
//收藏榜图书
  doInitShoucangbang:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/shoucangbang',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        shoucangbang = res.data;
        //  console.log(shoucangbang.data);
        this.setData(
          {
            shoucang: shoucangbang.data
          },
        )
      }
    })
  },
//付费榜图书
  doInitFufeibang:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/fufeibang',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        fufeibang = res.data;
        //  console.log(fufeibang.data);
        this.setData(
          {
            fufei: fufeibang.data
          },
        )
      }
    })
  },
//小说类 图书
  doInitXiaoshuo:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/fenlei_xiaoshuo',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        xiaoshuo = res.data;
        //console.log(xiaoshuo.data);
        this.setData(
          {
            book_xiaoshuo: xiaoshuo.data
          },
        )
      }
    })
  },
//传记类图书
  doInitZhuanji:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/fenlei_zhuanji',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        zhuanji = res.data;
        //console.log(zhuanji.data);
        this.setData(
          {
            book_zhuanji: zhuanji.data
          },
        )
      }
    })
  },
    //艺术类图书
  doInitYishu:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/fenlei_yishu',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        yishu = res.data;
        //  console.log(yishu.data);
        this.setData(
          {
            book_yishu: yishu.data
          },
        )
      }
    })
  },

//文学类图书
  doInitWenxue:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/fenlei_wenxue',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        wenxue = res.data;
        //  console.log(wenxue.data);
        this.setData(
          {
            book_wenxue: wenxue.data
          },
        )
      }
    })
  },
   
   //限免书籍
  doInitFree:function(){
   
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/free_book',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        this.setData(
          {
            free_book: res.data.data
          },
        )
      }
    })

  },

   //推荐图书
  doInitRefer:function(){
    wx.request({
      url: 'https://eixy35ua.qcloud.la/weapp/refer_book',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        //console.log(res.data);
        this.setData(
          {
            refer_book: res.data.data
          },
        )
      }
    })
  },
  onReady: function () {
    this.doInitXinshubang()
   
    this.doInitDianjibang()
   
    this.doInitShoucangbang()
   
    this.doInitFufeibang()
   
    this.doInitXiaoshuo()
    
    this.doInitZhuanji()

    this.doInitYishu()

    this.doInitWenxue()

    this.doInitFree()


  },
 
  onLoad: function () { 
    
  },

  onShow: function() {

    this.doInitRefer()
   
   
  },

//推荐，分类，限免，排行滑动栏
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //排行榜滑动栏
  navbarTap2: function (e) {
    this.setData({
      currentTab2: e.currentTarget.dataset.idx
    })
  },

 

})