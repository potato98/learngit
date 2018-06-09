 const {mysql} = require('../qcloud.js')

 module.exports = async ctx => 
 {
   var arr = []
    book = ctx.query.bookname
    
    comment = await mysql('User_Comment').select().where('Book_Name', book)
    user = await mysql('User').select('User_Name','User_Nickname', 'User_Picture')

    comment.forEach(function (item, index) {
      var a = item
      user.forEach(function (item1, index1) {
        if (a.User_Name == item1.User_Name) {
          Object.assign(a, item1)
          arr.push(a)
        }

      })
    })

    ctx.state.data = arr


 } 