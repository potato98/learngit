const { mysql } = require('../qcloud')
module.exports = async ctx => {
  name = await mysql('Book_Inf').select('*').where('Category','艺术')
  ctx.state.data = name
}