const { mysql } = require('../qcloud')

module.exports = async ctx => {

  oid = ctx.query.openid
  bid = ctx.query.bookid
  bname = ctx.query.bookname
  purl = ctx.query.url

  res = await mysql('User_Book').select('If_Collect','If_Buy').where('User_Name',oid).andWhere('Book_Id',bid)

  if(JSON.stringify(res) === '[]'){
    await mysql('User_Book').insert(
      {
        User_Name: oid,
        Book_Id: bid,
        Book_Name: bname,
        Pic: purl,
      }
    )

    ctx.state.data =[{
        'If_Collect':0,
        'If_Buy':0
      }]
  }
  else
  {
    ctx.state.data = res
  }
}