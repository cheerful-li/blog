/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/8
 * Time 15:16
 */

import {registerModel, getStore} from './modelRegister'
import blogListModel from './models/blogList'
import appModel from './models/app'
import blogEditModel from './models/blogEdit'


// 注册model
registerModel(blogListModel)
registerModel(appModel)
registerModel(blogEditModel)

export default function(...args) {
  return getStore(...args)
}