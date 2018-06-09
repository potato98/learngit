const {mysql} = require('../qcloud')


module.exports =async ctx => {
  a = []
  for(i = 0; i < 3; i++){
    a.push(Math.floor(Math.random() * 10 + 1) % 6 + 1)
  }

  ctx.state.data =  await mysql('Book_Inf').select().whereIn('Book_Id', a)

}

