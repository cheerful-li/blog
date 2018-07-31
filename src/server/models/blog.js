/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 11:00
 */
const { mongoose, db, createObjectId } = require('../db/index.js')
const Schema = mongoose.Schema
const blogSchema = new Schema({
  authorId: Schema.Types.ObjectId,
  title: String,
  summary: String,
  md: String,
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  viewedCount: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
})
// 设置输出
blogSchema.set('toJSON', { getters: true, transform: (doc, ret) => {
  delete ret._id
  delete ret.__v
  return ret
}})

const  BlogModel = db.model('blog', blogSchema)


module.exports = BlogModel
