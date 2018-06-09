const { mysql } = require('../qcloud.js')

module.exports = async ctx => {
  user = ctx.query.name
  ctx.state.data = await mysql('User').select('User_Nickname', 'User_Picture').where('User_Name', user)
}