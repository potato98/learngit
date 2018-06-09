 const {mysql} = require('../qcloud.js')

 module.exports = async ctx =>{
   name = ctx.query.username
   book = ctx.query.bookname

   wallet = await mysql('User').select('User_Money').where('User_Name', name)
   price = await mysql('Book_Inf').select('Price').where('Book_Name', book)

  //余额不足
   ctx.state.data = -1

   if(wallet[0].User_Money >= price[0].Price){
     ctx.state.data = 0
     await mysql('User').update('User_Money', wallet[0].User_Money - price[0].Price).where('User_Name', name)
     await mysql('User_Book').update('If_Buy', 1).where('User_Name', name).andWhere('Book_Name', book)
   }

    
   
 }