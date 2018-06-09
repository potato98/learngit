const { mysql } = require('../qcloud')
var util = require('../util')

module.exports = async ctx => {
  state = 'failed'
  ContinueDay = 0

  name = ctx.query.name
  res = await mysql('User').select('Sign_Time', 'ContinueDay').where('User_Name', name);

  // data = res[0]
  // ctx.state.data = res[0].ContinueDay
  if (res[0].Sign_Time == null) {
    
    state = '新用户首次签到'
    await mysql('User').where('User_Name', name).update(
      {
        'Sign_Time': util.formatTime(new Date()),
        'ContinueDay': 1
      }
    )
    ContinueDay = 1

  } else {

    var nowdate = new Date(util.formatTime2(
      new Date()
      ));
    var d = new Date(util.formatTime2(
      new Date(res[0].Sign_Time)
      ));

    if (nowdate.getTime() > d.getTime()) {

      if (nowdate.getTime() == d.getTime() + 24 * 60 * 60 * 1000) {
         state = '连续登录'
        
        await mysql('User').where('User_Name', name).update(
          {
            'Sign_Time': util.formatTime(new Date()),
            'ContinueDay': res[0].ContinueDay + 1
          }
        )

        ContinueDay = res[0].ContinueDay + 1
      } else {
        
        state = '签到中断'
       
        await mysql('User').where('User_Name', name).update(
          {
            'Sign_Time': util.formatTime(new Date()),
            'ContinueDay': 1
          }
        )
        
        ContinueDay = 1
      }


    } else {
       state = '今天已签到'
       ContinueDay = res[0].ContinueDay
    }

  }

  money = await mysql('User').select('User_Money').where('User_Name', name)

  if (state != 'failed' && state != '今天已签到'){
    await mysql('User').update(
      {
        User_Money: money[0].User_Money + ContinueDay
      }
    ).where('User_Name', name)
  }
 

  ctx.state.data = {
    state,
    ContinueDay,
    res,
    money
  }
}