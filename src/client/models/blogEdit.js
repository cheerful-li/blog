/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/2
 * Time 12:22
 */
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as blogApi from '../services/blog.js'

export default {
  namespace: 'blogEdit',
  state: {
    isLoading: false,
    blog: {},

    title: '',
    summary: '',
    md: '',
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    * getBlogDetail({ payload: { blogId }}) {
      yield put({ type: 'blogEdit/setState', payload: { isLoading: true }})
      try {
        const res = yield call(blogApi.getBlogDetail, { blogId })
        const blog = res.data
        yield put({ type: 'blogEdit/setState', payload: { blog, title: blog.title, summary: blog.summary, md: blog.md, }})
      } finally{
        yield put({ type: 'blogEdit/setState', payload: { isLoading: false }})
      }
    },
    * submit({ payload: { blogId, isEdit }}) {
      yield put({ type: 'blogEdit/setState', payload: { isLoading: true }})
      const { md, title, summary } = yield select(({ blogEdit }) => blogEdit)
      try {
        const api = isEdit ? blogApi.editBlog : blogApi.addBlog
        const res = yield call(api, { blogId, md, title, summary })
      } finally{
        yield put({ type: 'blogEdit/setState', payload: { isLoading: false }})
      }
    }
  }
}