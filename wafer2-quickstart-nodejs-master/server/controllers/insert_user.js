const {mysql} = require('../qcloud')

module.exports = async ctx => {
  
  ctx.state.data = 'User has been here'
  name = ctx.query.name
  nickname = ctx.query.nickname
  pic = ctx.query.picurl
  // userinfo = ctx.query.userinfo
  res = await mysql('User').select().where('User_Name', name);

  

  if (JSON.stringify(res) === '[]'){
    ctx.state.data = 'success'
    var usr = {
      User_Name: name,
      User_Money: 10,
      Read_Time: '10:20:20',
      User_Nickname: nickname,
      User_Picture: pic
    }
    res2 = await mysql('User').insert(usr)
    if(res2.length == 0){
      ctx.state.data = 3

    }
  }

 
 
}