const { mysql } = require('../qcloud')
const utils = require('../util.js');

module.exports = async ctx =>{
  var arr = []
  name = ctx.query.name
  book = await mysql('User_Book').select('Book_Name').where('User_Name', name).andWhere('If_Collect', 1)
  userlabel = await mysql('User_Book').select('Book_Name', 'User_Label').where('User_Name', name).andWhere('If_Collect', 1)
  book = utils.ArraySelect(book, 'Book_Name')
  book = await mysql('Book_Inf').select().whereIn('Book_Name', book)
  
  book.forEach(function(item, index){
    var a = item
    userlabel.forEach(function(item1, index1){
      if(a.Book_Name == item1.Book_Name){
        Object.assign(a, item1)
        arr.push(a)
      }

    })
    // var label = await mysql('User_Book').select('User_Label').where('Book_Name', item.Book_Name).andWhere('User_Name', name)
    // Object.assign(a, label)
    //arr.push(a)
  })
  ctx.state.data = arr
} 