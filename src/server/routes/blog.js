/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 12:47
 */
const Router = require('koa-router')
const BlogModel = require('../models/blog')
const formatResponse = require('../utils/formatResponse')

const router = new Router()

async function ensureUserLogined(ctx, next) {
  if (ctx.session.logined) {
    await next()
  } else {
    ctx.body = formatResponse.createNeedLoginError()
  }
}

// 添加博客
router.post('/add', ensureUserLogined, async function (ctx, next) {
  const { title, summary, md } = ctx.request.body
  console.log(ctx.request.body)
  const authorId = ctx.session.userId
  const blog = new BlogModel({ authorId, title, summary, md })
  await blog.save()
  ctx.body = formatResponse.createSuccess(blog)
})

// 修改博客
router.post('/edit/:blogId', ensureUserLogined, async function (ctx, next) {
  const { blogId } = ctx.params
  const { title, summary, md } = ctx.request.body

  const blog = await BlogModel.findOne({ id: blogId }).exec()
  blog.updateTime = new Date()
  blog.title = title
  blog.summary = summary
  blog.md = md
  await blog.save()
  ctx.body = formatResponse.createSuccess(blog)
})

// 获取博客详情
router.get('/detail/:blogId', async function (ctx, next) {
  const { blogId } = ctx.params
  const blog = await BlogModel.findOne({ id: blogId }).exec()
  ctx.body = formatResponse.createSuccess(blog)
})

// 获取博客列表
router.get('/list', async function (ctx, next) {
  const blogList = await BlogModel.find({  }).exec()
  ctx.body = formatResponse.createSuccess(blogList)
})


module.exports = router