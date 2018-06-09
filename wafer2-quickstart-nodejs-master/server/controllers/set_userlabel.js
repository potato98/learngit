const { mysql } = require('../qcloud.js')

module.exports = async ctx => {
  user = ctx.query.username
  book = ctx.query.bookname
  label = ctx.query.label
  ctx.state.data = await mysql('User_Book').update('User_Label', label).where('Book_Name', book).andWhere('User_Name', user)
} 