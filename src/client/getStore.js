/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/8
 * Time 15:16
 */

import ReduxModelRegister from './modelRegister'
import blogListModel from './models/blogList'
import appModel from './models/app'
import blogEditModel from './models/blogEdit'
/*

*/

const modelRegister = new ReduxModelRegister()

// 注册model
modelRegister.registerModel(blogListModel)
/*modelRegister.registerModel(blogListModel)
modelRegister.registerModel(appModel)
modelRegister.registerModel(blogEditModel)*/

export default function(...args) {
  return modelRegister.getStore(...args)
}
