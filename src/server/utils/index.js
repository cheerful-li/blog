/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 13:39
 */

const formatResponse = require('../utils/formatResponse')
import { decode } from '../utils/jwt'

async function delay(time) {
  await new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/* 将一个node js风格的使用callback的异步函数转换为一个返回promise的函数*/
function promisify(fn, context) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      args.push(function(err, data) {
        if (err) return reject(err)
        resolve(data)
      })
      fn.apply(context, args)
    })
  }
}

function unifyLoginState(ctx, next) {
  // 后端ssr时调用的请求，使用jwt授权
  if (ctx.query && ctx.query.jwt) {
    const payload = decode(ctx.query.jwt)
    if (payload.userId) {
      ctx.session.logined = true
      ctx.session.userId = payload.userId
    }
  }
  if (next) next()
}
async function ensureUserLogined(ctx, next) {
  unifyLoginState(ctx)
  if (ctx.session.logined) {
    await next()
  } else {
    ctx.body = formatResponse.createNeedLoginError()
  }
}
module.exports = {
  unifyLoginState,
  promisify,
  ensureUserLogined,
  delay
}