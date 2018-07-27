/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/27
 * Time 13:07
 */
const { doFetch } = require('../shared/fetch')
const config = require('./privateConfig')
const Router = require('koa-router')

function init(app) {
  const router = new Router()
  router.get('/xhr/oauth/github/codeCallback', async (ctx, next) => {
    const code = ctx.query.code
    const token = await doFetch('https://github.com/login/oauth/access_token', {
      data: {
        client_id: config.githubOauth.clientId,
        client_secret: config.githubOauth.clientSecret,
        code,
      },
      method: 'post',
      contentType: 'form',
    })
    console.log('github oauth success', token)
    ctx.body = token
  })
  app.use(router.routes())
}

module.exports = {
  init
}