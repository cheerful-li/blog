/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/27
 * Time 13:07
 */
const { getData, postData } = require('../shared/fetch')
const config = require('./privateConfig')
const Router = require('koa-router')

function init(app) {
  const router = new Router()
  router.get('/xhr/oauth/github/codeCallback', async (ctx, next) => {
    const code = ctx.query.code
    const token = await postData('https://github.com/login/oauth/access_token', {
      data: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
      })
    })
    console.log('github oauth success', token)
    ctx.body = token
  })
  app.use(router.routes())
}

module.exports = {
  init
}