/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 12:51
 */
const UserModel = require('../models/user')

async function addOrUpdateGithubUser (data) {
  const githubId = data.githubId
  let user = await UserModel.findOne({ githubId }).exec()
  if (user) {
    user.name = data.name
    user.email = data.email
    user.avatar = data.avatar
  } else {
    user = new UserModel(data)
  }
  await user.save()
  return user
}

module.exports = {
  addOrUpdateGithubUser,
}
 