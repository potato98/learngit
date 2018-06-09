const { mysql } = require('../qcloud')

module.exports = async ctx => {

  // ctx.state.data = 'User has been here'
  // name = ctx.query.name
     ctx.state.data = 'success'
     res = await mysql('User_Book').where({ 'User_Name': ctx.query.user_name,'Book_Id':ctx.query.book_id}).update('Percentage',ctx.query.new_percentage)



  // if (res.length == 0) {
  //   ctx.state.data = 'success'
  //   var usr = {
  //     User_Name: name,
  //     User_Money: 10,
  //     Read_Time: '10:20:20'
  //   }
  //   res2 = await mysql('User').insert(usr)
  //   if (res2.length == 0) {
  //     ctx.state.data = 3

  //   }
  // }
}