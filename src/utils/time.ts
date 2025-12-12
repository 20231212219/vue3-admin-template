// 封装一个获取时间的方法
export const getTime = () => {
  let message = ''
  // 内置函数Date.now()获取当前时间戳
  const hours = new Date().getHours()
  if (hours < 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
