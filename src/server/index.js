/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/25
 * Time 19:43
 */
require("babel-register")
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'css', 'less']
})
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaLogger = require('koa-logger')
const KoaSession = require('koa-session')
const mount = require('koa-mount');
const serve = require('koa-static');
const path = require('path')

const router = require('./router.js')
const privateConfig = require('./privateConfig')
const { createError } = require('./utils/formatResponse')
const ssr = require('./routes/ssr')

const app = new Koa()

// secret key array, use for sign cookie
app.keys = privateConfig.appSecretKeys

// logger
app.use(KoaLogger())

// 前端静态资源访问
app.use(mount('/dist', serve(path.join(__dirname, '../client/dist/'))))

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

//ssr
app.use(ssr.routes())

// 路由
app.use(router.routes())

// 全局错误捕获，处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = createError(1, err && err.message);
  }
})
// 监听端口
app.listen(3000)
console.log('listen 3000')