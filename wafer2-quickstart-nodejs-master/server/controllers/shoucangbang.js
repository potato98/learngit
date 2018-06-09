const { mysql } = require('../qcloud')
module.exports = async ctx => {
  name = await mysql('Book_Inf').select('*').orderBy('Collect_Num', 'desc')
  ctx.state.data = name
}