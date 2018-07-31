/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 17:57
 */
/* 整合redux redux-saga, 实现dva中的model能力*/

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import app from './app'


const modelMap = {}
const modelArr = []
export function registerModel(model = {}) {
  const { namespace, state, effects, reducers } = model
  if (namespace){
    modelMap[namespace] = model
    modelArr.push(model)
  }
}
let store
export function getStore({ preloadedState = {}, middlewares = [] } = {}) {
  if (store) return store
  const sagaMiddleware = createSagaMiddleware()
  let reducerMap = {}
  let rootReducers
  let allSagaEffect = {}
  modelArr.forEach((model) => {
    const { namespace, state = {}, effects = {}, reducers = {} } = model
    reducerMap[namespace] = function(theState = state, action = {}) {
      const { type, payload } = action
      // 处理当前model的reducer
      if (type.indexOf(namespace + '/') === 0) {
        let realType = type.slice(namespace.length + 1)
        const theReducer = reducers[realType]
        if (theReducer) return theReducer(state, action)
      }
      return state
    }
    for (let effectName in effects) {
      allSagaEffect[namespace + '/' + effectName] = effects[effectName]
    }
  })
  function * rootSaga() {
    for (let effectName in allSagaEffect) {
      yield takeEvery(effectName, allSagaEffect[effectName])
    }
  }


  rootReducers = combineReducers(reducerMap)
  middlewares.push(sagaMiddleware)
  store = createStore(rootReducers, preloadedState, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)

  return store
}