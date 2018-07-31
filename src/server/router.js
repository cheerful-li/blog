/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 11:35
 */
const Router = require('koa-router')
const githubAuthRouter = require('./routes/githubAuth.js')
const blogRouter = require('./routes/blog')

// 所有异步请求添加前缀 /xhr
let router = new Router({
  prefix: '/xhr'
})

// github oAuth 登录
router.use('/oauth/github', githubAuthRouter.routes() )

// blog相关操作
router.use('/blog', blogRouter.routes() )

module.exports = router
