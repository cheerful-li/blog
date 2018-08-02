/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/2
 * Time 13:58
 */
const Router = require('koa-router')
const formatResponse = require('../utils/formatResponse')

const router = new Router()


// 添加博客
router.get('/loginState', async function (ctx, next) {
  ctx.body = formatResponse.createSuccess({
    logined: !!ctx.session.logined,
  })
})

module.exports = router