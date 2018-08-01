/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 17:45
 */
import { get, post } from '../utils/request'

export async function getBlogList(data) {
  return get('/xhr/blog/list', data)
}
export async function getBlogDetail(data) {
  return get('/detail/:blogId', data)
}
export async function addBlog(data) {
  return get('/xhr/blog/add', data)
}
export async function editBlog(data) {
  return get('/xhr/blog/edit/:blogId', data)
}



 