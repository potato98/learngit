const { mysql } = require('../qcloud')

module.exports = async ctx => {
    name = await mysql('Book_Inf').select('*')
    ctx.state.data = name
}