/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/13
 * Time 10:36
 */


export function isServer() {
  return typeof window === 'undefined'
}
export function getServerHost() {
  return 'http://127.0.0.1:3000'
}
