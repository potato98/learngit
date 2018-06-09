//search.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({
  data: {},

  // 搜索栏
  onLoad: function () {
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['武侠', '推理', "历史", "传记", '军事', '言情'], // 热点搜索推荐，[]表示不使用
      ['科幻', '魔幻', '恐怖', "都市"],// 搜索匹配，[]表示不使用
      that.inputSearch, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  inputSearch: function (value) {
    // do your job here
    // 跳转
    wx.navigateTo({
      url: '../searchresult/searchresult?search_Text='+value
    })
  },

 
})
