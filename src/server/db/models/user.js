/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/26
 * Time 20:34
 */
const { mongoose, db, createObjectId } = require('../index.js')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
})
// 设置输出
userSchema.set('toJSON', { getters: true, transform: (doc, ret) => {
  delete ret._id
  delete ret.__v
  return ret
}})

const  UserModel = db.model('user', userSchema)
exports.UserModel = UserModel
