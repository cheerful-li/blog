/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 17:49
 */
import { doFetch } from '../../shared/fetch'
import pathToRegexp from 'path-to-regexp'

function isServer() {
  return typeof global !== 'undefined' && typeof window === 'undefined' && typeof document === 'undefined'
}

function checkAuth(res) {
  if (res && res.errorCode === 110) {
    window.location.href = '/login'
  }
  return res
}
function checkError(res) {
  if (!res || res.errorCode) {
    throw res
  } else {
    return res
  }
}
function dealUrlParam(url, data = {}) {
  const compile = pathToRegexp.compile(url)
  return compile(data)
}
function get(url, data) {
  url = dealUrlParam(url, data)
  return doFetch(url, {
    method: 'get',
    data,
  }).then(checkAuth).then(checkError)
}

function post(url, data) {
  url = dealUrlParam(url, data)
  return doFetch(url, {
    method: 'post',
    data,
  }).then(checkAuth).then(checkError)
}
export { get, post }