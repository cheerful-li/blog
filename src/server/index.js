/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/25
 * Time 19:43
 */
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaLogger = require('koa-logger')
const KoaSession = require('koa-session')

const router = require('./router.js')
const privateConfig = require('./privateConfig')

const app = new Koa()

// secret key array, use for sign cookie
app.keys = privateConfig.appSecretKeys

// logger
app.use(KoaLogger())

// session
// ctx.session
app.use(KoaSession({
  key: 'koa:sess', /** cookie名 */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}, app))

// ctx.request.body
// ctx.request.files
app.use(KoaBody())

// 路由
app.use(router.routes())

// 监听端口
app.listen(3000)
console.log('listen 3000')