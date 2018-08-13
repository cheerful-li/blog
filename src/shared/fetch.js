/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/27
 * Time 13:11
 */

require('isomorphic-fetch')
const qs = require('qs')
import { isServer, getServerHost } from './util'

/*
*
*  fetchOptions
*   {
*   body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
    }
* */

const fetchOptionsDefault = {
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, same-origin, *omit
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  redirect: 'follow', // manual, *follow, error
}

const optionsDefault = {
  data: null,
  method: 'get',
  contentType: 'json', // json form multipart
  accept: 'json', // json or other
  headers: {},
}
function doFetch(url, options = {}) {
  if (isServer() && url && url.indexOf('/') === 0 && url.indexOf('//') !== 0) {
    // 服务器本地请求，添加前缀
    url = getServerHost() + url
  }
  options = Object.assign({}, optionsDefault, options)
  options.headers = Object.assign({}, options.headers)
  const fetchOptions = Object.assign({}, fetchOptionsDefault)
  fetchOptions.headers = Object.assign({}, fetchOptions.headers)
  fetchOptions.method = options.method.toUpperCase()

  if (options.headers) {
    Object.assign(fetchOptions, options.headers )
  }
  // 'application/json, application/xml, text/plain, text/html, */*'
  if (options.accept && options.accept !== 'json') {
    fetchOptions.headers.Accept = options.accept
  }

  if (options.contentType && options.contentType !== 'json') {
    switch(options.contentType) {
      case 'form':
        fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        fetchOptions.body = qs.stringify(options.data || {})
        break
      case 'multipart':
        fetchOptions.headers['Content-Type'] = 'multipart/form-data'
        fetchOptions.body = options.data // formData
        break
      default :
        fetchOptions.headers['Content-Type'] = options.contentType
        fetchOptions.body = options.data
        break
    }
  } else {
    fetchOptions.body = JSON.stringify(options.data || {})
  }
  if (options.method === 'get') {
    fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (options.data) {
      url += url.indexOf('?') >= 0 ? '&' : '?'
      url += qs.stringify(options.data || {})
      delete options.data
    }
    delete fetchOptions.body
  }
  const req = fetch(url, fetchOptions)
  // console.log(url, fetchOptions)
  if (options.accept === 'json') {
    return req.then(response => response.json())
  } else {
    return req
  }
}
module.exports = {
  doFetch
}

