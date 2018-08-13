/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 13:39
 */

/* 将一个node js风格的使用callback的异步函数转换为一个返回promise的函数*/
function promisify(fn, context) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      args.push(function(err, data) {
        if (err) return reject(err)
        resolve(data)
      })
      fn.apply(context, args)
    })
  }
}
module.exports = {
  promisify
}