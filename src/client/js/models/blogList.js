/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 20:58
 */
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

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
      // yield put({ type: 'blog/setState', payload: { isLoading: true }})
    }
  }
}