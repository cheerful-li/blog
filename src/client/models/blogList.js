/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 20:58
 */
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as blogApi from '../services/blog.js'
import wrapApi from '../../shared/wrapApi'

export default {
  namespace: 'blogList',
  state: {
    isLoading: false,
    list: [],
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    * getList(action) {
      yield put({ type: 'blogList/setState', payload: { isLoading: true }})
      try {
        const res = yield call(wrapApi(blogApi.getBlogList))
        yield put({ type: 'blogList/setState', payload: { list: res.data }})
      } finally{
        yield put({ type: 'blogList/setState', payload: { isLoading: false }})
      }
    }
  }
}