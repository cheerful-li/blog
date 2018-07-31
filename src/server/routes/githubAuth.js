/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/27
 * Time 13:07
 */
const { doFetch } = require('../../shared/fetch')
const config = require('../privateConfig')
const Router = require('koa-router')
const { addOrUpdateGithubUser } = require('../controllers/user')

const router = new Router()
router.get('/codeCallback', async (ctx, next) => {
  // 从参数里面拿到code
  const code = ctx.query.code
  console.log('get github code, fetching access_token...', code)
  // 用code去获取access_token
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
  // 拿到access_token后，访问github用户信息
  if (token.access_token) {
    let userInfo  = await doFetch(`https://api.github.com/user?access_token=${token.access_token}`)
    // 可能会超时，重试一次
    if (!userInfo || !userInfo.id) {
      console.log('fetch userinfo 失败， 重试一次')
      userInfo  = await doFetch(`https://api.github.com/user?access_token=${token.access_token}`)
    }
    if (userInfo && userInfo.id) {
      // 写入数据库
      // 添加用户或者更新用户
      const user = await addOrUpdateGithubUser({
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.avatar_url,
        githubId: userInfo.id,
      })
      console.log('github oauth success', userInfo)
      ctx.body = user
      return
    }

  }
  ctx.body = '授权失败'


})


module.exports = router