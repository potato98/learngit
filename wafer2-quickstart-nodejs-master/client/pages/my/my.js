
//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()


Page({
   globalData:{
     appid: 'wx0d5bc1976c4c19f2',
     secret: '78fc51c53a5dd6aa8f0de2f33f462168',
   },
    data: {
        userInfo:null,
        takeSession: false,
        requestResult: '',
        logged: false
    },

    // 用户登录示例
    login: function() {
      //  console.log("Login")
        if (this.data.logged) return

        util.showBusy('正在登录')
        var that = this

        // 调用登录接口
        qcloud.login({
            success(result) {
               

                if (result) {
                    util.showSuccess('登录成功');
                    that.setData({
                        userInfo: result,
                        logged: true,

                    })
                    app.globalData.userInfo = userInfo
                    app.globalData.logged = logged
                } else {
                
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                           
                            that.setData({
                              userInfo: result.data.data,
                              logged: true
                            })
                            app.globalData.userInfo = that.data.userInfo
                            app.globalData.logged = that.data.logged
                        },

                        fail(error) {
                        
                            util.showModel('请求失败', error)
                            console.log('request fail', error)
                        }
                    })
                }
            },

            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    },

    //获取用户基本信息
    bindGetUserInfo: function() {
     
      var that = this
      {
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.getUserInfo({
                success: function (res) {      
                 
                  that.setData({
                    userInfo: res.userInfo,
                    logged: true
                  })
                 
                  app.globalData.userInfo = that.data.userInfo
                  app.globalData.logged = that.data.logged
                }
              });
             
              var d = that.globalData;//这里存储了appid、secret、token串    
              var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
              
               wx.request({
                url: l,
                data: {},
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                // header: {}, // 设置请求的 header    
                success: function (res) {
                

                  app.globalData.openid = res.data.openid  
                  
                }
              });
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }


        });
      }

      //确保全局数据已经被赋值
     setTimeout(that.doInitUser, 2000)

    //  console.log(app.globalData)   
      
    },  

    //在数据库中初始化用户
    doInitUser:function(){
      wx.request({
        url: 'https://eixy35ua.qcloud.la/weapp/insert_user',
        data: {
          name: app.globalData.openid,
          nickname: app.globalData.userInfo.nickName,
          picurl: app.globalData.userInfo.avatarUrl
        },
        success: res => {
          console.log(res.data);
          //console.log(app.globalData.userInfo)
        }
      })

      console.log(app.globalData.userInfo)
    },

    //签到
    qiandao: function(){

    
      if (!(app.globalData.logged)){
        wx.showToast({
          title: '请登录',
          duration:500
        })
      }else{
        
        wx.request({
          url: 'https://eixy35ua.qcloud.la/weapp/sign_in',
          data:{
            name: app.globalData.openid
          },
          success: res => {

            wx.showToast({
              title: res.data.data.state +'\r\n连续签到天数:' + res.data.data.ContinueDay,
              icon: 'none'
            })
           console.log(res.data)
          }
        })

      }
    },

    //钱包
    mywallet: function(){
      if (!(app.globalData.logged)) {
        wx.showToast({
          title: '请登录',
          duration: 500

        })
      }else{

        wx.request({
          url: 'https://eixy35ua.qcloud.la/weapp/get_money',
          data:{
            name: app.globalData.openid
          },
          success: res =>
          {
            wx.showToast({
              title: '账户余额：' + res.data.data[0].User_Money + '书币',
              icon: 'none'
            })

            console.log(res.data)
          }
        })

      }
    }

   
})
