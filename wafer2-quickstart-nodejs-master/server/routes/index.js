/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

//李
router.get('/bksf', controllers.bksf)
router.get('/dianjibang', controllers.dianjibang)
router.get('/fufeibang', controllers.fufeibang)
router.get('/shoucangbang', controllers.shoucangbang)
router.get('/fenlei_xiaoshuo', controllers.fenlei_xiaoshuo)
router.get('/fenlei_zhuanji', controllers.fenlei_zhuanji)
router.get('/fenlei_yishu', controllers.fenlei_yishu)
router.get('/fenlei_wenxue', controllers.fenlei_wenxue)
router.get('/select_iscollect', controllers.select_iscollect)

//陈
router.get('/insert_user',controllers.insert_user)
router.get('/sign_in', controllers.sign_in)
router.get('/get_money', controllers.get_money)
router.get('/refer_book', controllers.refer_book)
router.get('/search_book', controllers.search_book)
router.get('/free_book', controllers.free_book)
router.get('/click_collect', controllers.click_collect)
router.get('/add_comment', controllers.add_comment)
router.get('/get_comment', controllers.get_comment)
router.get('/get_user', controllers.get_user)
router.get('/buy_book', controllers.buy_book)
router.get('/get_bookshelf', controllers.get_bookshelf)
router.get('/get_userlabel', controllers.get_userlabel)
router.get('/set_userlabel', controllers.set_userlabel)

//曲
router.get('/book', controllers.book)
router.get('/test_text', controllers.test_text)
router.get('/update_percentage', controllers.update_percentage)
module.exports = router
