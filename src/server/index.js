/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/25
 * Time 19:43
 */
const Koa = require('koa')

const app = new Koa()
app.use(ctx => {
  ctx.body = 'hello Koa'
})
app.listen(3000)
console.log('listen 3000')