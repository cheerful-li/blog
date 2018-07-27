/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/25
 * Time 19:43
 */
const Koa = require('koa')
const app = new Koa()


const githubAuth = require('./githubAuth')

const { UserModel } = require('./db/models/user.js')
const { createObjectId } = require('./db/index.js')

const user = new UserModel({
  name: 'lilieming',
  email: '602663787@qq.com',
})

app.use(githubAuth.routes)
app.use(async (ctx, next) => {
 // const result = await user.save()
 //  console.log('保存用户成功', result)
  /*const userList = await UserModel.find().exec()
  console.log('用户列表', JSON.stringify(userList))
  console.log(userList && userList[0]._id)
  ctx.body = userList*/
})
app.use(ctx => {
  ctx.body = 'hello Koa'

})
app.listen(3000)
console.log('listen 3000')