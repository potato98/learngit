//从Book表中获取数据
const { mysql } = require('../qcloud')
module.exports = async ctx => {
  ctx.state.data  = await mysql('Book').select('*').where('Book_Id',ctx.query.book_id)
  
}