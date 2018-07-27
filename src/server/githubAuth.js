/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/27
 * Time 13:07
 */
const { doFetch } = require('../shared/fetch')
const config = require('./privateConfig')
const Router = require('koa-router')
const { addOrUpdateGithubUser } = require('./db/models/user')

const router = new Router()
router.get('/xhr/oauth/github/codeCallback', async (ctx, next) => {
  const code = ctx.query.code
  console.log('get github code, fetching access_token...', code)
  const token = await doFetch('https://github.com/login/oauth/access_token', {
    data: {
      client_id: config.githubOauth.clientId,
      client_secret: config.githubOauth.clientSecret,
      code,
    },
    method: 'post',
    contentType: 'form',
  })
  console.log('get github access_token, fetching userInfo...', token.access_token)
  if (token.access_token) {

    let userInfo  = await doFetch(`https://api.github.com/user?access_token=${token.access_token}`)
    if (!userInfo || !userInfo.id) { // 重试一次
      console.log('fetch userinfo 失败， 重试一次')
      userInfo  = await doFetch(`https://api.github.com/user?access_token=${token.access_token}`)
    }
    if (userInfo && userInfo.id) {
      const user = await addOrUpdateGithubUser({
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.avatar_url,
        githubId: userInfo.id,
      })
      console.log('github oauth success', userInfo)
      ctx.body = user
    }

  }


})


module.exports = {
  routes: router.routes(),
}