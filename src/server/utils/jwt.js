/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/8
 * Time 15:04
 */

const jwt = require('jwt-simple')
const moment = require('moment')
const { jwtSecret } = require('../privateConfig')


export function encode(payload = {}, expireSeconds = 12 * 60 * 60) { // 默认12小时过期的token
  payload = {
    ...payload,
    iat: moment().unix(),
    exp: moment().add(expireSeconds, 'seconds').unix()
  }
  return jwt.encode(payload, jwtSecret)
}
export function decode(token) {
  return jwt.decode(token, jwtSecret)
}