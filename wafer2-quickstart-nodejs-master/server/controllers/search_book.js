const { mysql } = require('../qcloud')


module.exports = async ctx => {
  
  name = ctx.query.name

  res = await mysql('Book_Inf').select().where('Book_Name', 'like', '%' + name + '%').orWhere('Category', 'like', '%' + name + '%')
  if(JSON.stringify(res) === '[]'){
    ctx.state.data = {
      state : 0
    }
  }else{
    ctx.state.data = {
      state : 'ok',
      data: res
    }
  }

}
