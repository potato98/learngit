const { mysql } = require('../qcloud')
module.exports = async ctx => {
  name = await mysql('Book_Inf').select('*').where('Category','传记')
  ctx.state.data = name
}