/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/26
 * Time 20:29
 */
const mongoose = require('mongoose')
const dbConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/testDb')
dbConnection.on('error', e => console.log(e))
dbConnection.once('open', e => console.log('db connected'))

function createObjectId() {
  return new mongoose.Types.ObjectId()
}
module.exports = {
  db: dbConnection,
  createObjectId,
  mongoose,
}