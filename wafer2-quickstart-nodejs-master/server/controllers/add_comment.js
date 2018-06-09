const {mysql} = require('../qcloud.js')

module.exports = async ctx =>
{
  user = ctx.query.user
  book = ctx.query.bookname
  comment = ctx.query.comment
  grade = ctx.query.grade

  await mysql('User_Comment').insert({
      'User_Name': user,
      'Book_Name': book,
      'Comment': comment,
      'Grade': grade
  })
}