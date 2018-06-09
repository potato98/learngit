const { mysql } = require('../qcloud.js')

module.exports = async ctx => {
  user = ctx.query.username
  book = ctx.query.bookname
  ctx.state.data = await mysql('User_Book').select('User_Label').where('Book_Name', book).andWhere('User_Name', user)
} 