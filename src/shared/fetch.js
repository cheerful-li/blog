/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/27
 * Time 13:11
 */
require('isomorphic-fetch')

/*
*
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
* */

function fetchJson(url, options = {}) {
  options.headers = options.headers || {}
  options.headers = Object.assign({
    Accept: 'application/json',
  }, options.headers)
  return fetch(url, options).then(response => response.json())
}
function postData(url, options = {}) {
  return fetchJson(url, Object.assign({}, options,{method: 'post'}))
}
function getData(url, options = {}) {
  return fetchJson(url, Object.assign({}, options,{method: 'get'}))
}
module.exports = {
  fetchJson, getData, postData,
}