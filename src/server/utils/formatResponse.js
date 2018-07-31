/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 13:01
 */

function createSuccess(data) {
  return {
    errorCode: 0,
    data,
  }
}
const errorCodeMap = {
  1: '系统错误',
  2: '参数错误',
  110: '无访问权限，请先登录',
}
function createError(errorCode = 1, message = '系统错误') {
  return {
    errorCode,
    message: message || errorCodeMap[errorCode]
  }
}
function createNeedLoginError() {
  return createError(110)
}
module.exports = {
  createSuccess,
  createError,
  createNeedLoginError,
}
 