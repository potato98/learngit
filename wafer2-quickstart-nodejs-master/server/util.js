const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const ArraySelect = (sel, key) =>
{
  a = []
  sel.forEach(
    function (item, index){
      a.push(item[key])
    }
  )
  return a
}




module.exports = { formatTime, formatTime2, ArraySelect }
