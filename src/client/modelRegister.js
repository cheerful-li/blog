/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/31
 * Time 17:57
 */
/* 整合redux redux-saga, 实现dva中的model能力*/

import { createStore, combineReducers, applyMiddleware, compose  } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

// 添加redux-devtools-extension的支持
let composeEnhancers = compose
if (typeof window !== 'undefined') composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers

export default class ReduxModelRegister{
  constructor() {
    this.modelMap = {}
    this.modelArr = []
    this.store = null
  }
  registerModel(model = {}) {
    const { namespace, state, effects, reducers } = model
    if (namespace){
      this.modelMap[namespace] = model
      this.modelArr.push(model)
    }
  }
  getStore({ preloadedState = {}, middlewares = [], enhancers = [] } = {}) {
    if (this.store) return store
    const sagaMiddleware = createSagaMiddleware()
    let reducerMap = {}
    let rootReducers
    let allSagaEffect = {}
    this.modelArr.forEach((model) => {
      const { namespace, state = {}, effects = {}, reducers = {} } = model
      reducerMap[namespace] = function(theState = state, action = {}) {
        const { type, payload } = action
        // 处理当前model的reducer
        if (type.indexOf(namespace + '/') === 0) {
          let realType = type.slice(namespace.length + 1)
          const theReducer = reducers[realType]
          if (theReducer) return theReducer(theState, action)
        }
        return theState
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
    console.log('create store with', reducerMap, rootReducers, preloadedState)
    middlewares.push(promiseMiddleware)
    middlewares.push(sagaMiddleware)
    this.store = createStore(rootReducers, preloadedState, composeEnhancers(...enhancers, applyMiddleware(...middlewares)))
    sagaMiddleware.run(rootSaga)

    if (typeof window !== 'undefined') window.store = this.store
    return this.store
  }
}
