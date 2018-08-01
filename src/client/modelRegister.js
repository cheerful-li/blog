/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 17:57
 */
/* 整合redux redux-saga, 实现dva中的model能力*/

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

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
      function * temp(action, ...args) {
        try{
          const result =  yield call(allSagaEffect[effectName], action)
          action.__resolve(result)
        } catch(e) {
          action.__reject(e)
        }

      }
      yield takeEvery(effectName, temp)
    }
  }
  // 用于实现 dispatch({ type: 'xxx/xxx' }) 这种返回一个promise
  const promiseMiddleware = store => next => action => {
    action = action || {}
    const { type } = action
    // model 中定义的相关action
    if (type && allSagaEffect[type]) {
      const promise = new Promise(function(resolve, reject) {
        action.__resolve = resolve.bind(promise)
        action.__reject = reject.bind(promise)
      })

      next(action)
      return promise
    } else { // model之外的action
      return next(action)
    }
  }


  rootReducers = combineReducers(reducerMap)
  middlewares.push(promiseMiddleware)
  middlewares.push(sagaMiddleware)
  store = createStore(rootReducers, preloadedState, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)

  return store
}