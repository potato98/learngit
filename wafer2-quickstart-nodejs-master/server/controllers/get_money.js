const {mysql} = require('../qcloud')

module.exports = async ctx =>
{
  name = ctx.query.name

  ctx.state.data = await mysql('User').select('User_Money').where('User_Name', name)

  
}