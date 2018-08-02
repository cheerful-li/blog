/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/2
 * Time 13:53
 */
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as appApi from '../services/app.js'

export default {
  namespace: 'app',
  state: {
    isLogined: false,
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    * checkLoginState(action) {
      const res = yield call(appApi.checkIsLogined)
      yield put({ type: 'app/setState', payload: { isLogined: res.data.logined }})
    }
  }
}
 