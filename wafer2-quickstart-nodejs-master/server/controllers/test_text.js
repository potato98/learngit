const { mysql } = require('../qcloud')
//从User_book表中筛选书籍信息
module.exports = async ctx => {
  ctx.state.data = await mysql('User_Book').select('*').where({
    'Book_Id': ctx.query.book_id, User_Name: ctx.query.user_name})
}