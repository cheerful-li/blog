/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/25
 * Time 22:02
 */
import React from 'react'
import { hot } from 'react-hot-loader'
import qs from 'qs'
import {registerModel, getStore} from './modelRegister'

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
const blogModel = {
  namespace: 'blog',
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
      console.log('blog/getList', action)
      yield put({ type: 'blog/setState', payload: { isLoading: true }})
      return 123
    }
  }
}

registerModel(blogModel)
const store =  getStore()
window.store = store

class App extends React.Component{
  render() {
    const githubAuthParams = {
      client_id: '0d644dadb0736ac9ab23',
      redirect_uri: 'http://localhost:3001/xhr/oauth/github/codeCallback',
      scope: 'read:user',
    }
    return (
      <div className="m-app">
        <a href={`https://github.com/login/oauth/authorize?${qs.stringify(githubAuthParams)}`}>github登录</a>
      </div>
    )
  }
}
// react HMR
export default hot(module)(App)