const {mysql} = require('../qcloud.js')

module.exports = async ctx =>
{
  name = ctx.query.openid
  id = ctx.query.bookid 
  state = ctx.query.collect_state

  await mysql('User_Book').update('If_Collect', state).where('User_Name', name).andWhere('Book_Id', id)

  
}