const { mysql } = require('../qcloud')
module.exports = async ctx => {
  name = await mysql('Book_Inf').select('*').where('Category','文学')
  ctx.state.data = name
}