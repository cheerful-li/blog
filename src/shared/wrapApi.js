/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/8
 * Time 14:57
 */
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

/* 服务端渲染时，在服务端请求接口，把jwt参数放到store里面，接口调用前添加jwt参数作为登录鉴权*/
export default function wrapApiWithJwtParam(api) {
  return function*(data = {}) {
    const jwt = yield select(state => state.jwt)
    data = { ...data }
    if (jwt) data.jwt = jwt
    return yield call(api, data)
  }
}