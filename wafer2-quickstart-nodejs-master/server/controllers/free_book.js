const { mysql } = require('../qcloud')
module.exports = async ctx => {
  name = await mysql('Book_Inf').select('*').where('Label', '限免')
  ctx.state.data = name
}