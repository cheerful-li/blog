/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/2
 * Time 12:22
 */
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

export default {
  namespace: 'blogEdit',
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