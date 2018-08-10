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
    if (this.store) return this.store
    const sagaMiddleware = createSagaMiddleware()
    let reducerMap = {}
    let rootReducers
    let allSagaEffect = {}
    this.modelArr.forEach((model) => {
      const { namespace, state = {}, effects = {}, reducers = {} } = model
      reducerMap[namespace] = function(theState = state, action = {}) {
        // console.log('reducer start', namespace)
        console.log(theState, action)
        const { type, payload } = action
        // console.log('action type:', type)
        // 处理当前model的reducer
        if (type.indexOf(namespace + '/') === 0) {
          // console.log('right model:', namespace, type)
          let realType = type.slice(namespace.length + 1)
          const theReducer = reducers[realType]
          // console.log('find reducer', realType, theReducer, reducers)
          if (theReducer) return theReducer(theState, action)
        }
        return theState
      }
      for (let effectName in effects) {
        allSagaEffect[namespace + '/' + effectName] = effects[effectName]
      }
    })
    function * rootSaga() {
      const effectNameArr = Object.keys(allSagaEffect)
      function getTemp(effectName) {
        return function*(action, ...args) {
          console.log('saga start:', effectName, action, args)
          try{
            const result =  yield call(allSagaEffect[effectName], action)
            if (!action.__resolve) console.log('no __resolve, ', action)
            action.__resolve && action.__resolve(result)
          } catch(e) {
            action.__reject && action.__reject(e)
          }

        }
      }
      for (let effectName of effectNameArr) {

        console.log('takeEvery ', effectName)
        yield takeEvery(effectName, getTemp(effectName))
      }
    }
    // 用于实现 dispatch({ type: 'xxx/xxx' }) 这种返回一个promise
    const promiseMiddleware = store => next => action => {
      action = action || {}
      const { type } = action
      // model 中定义的相关action
      if (type && allSagaEffect[type]) {
        console.log(Promise)
        let promise
        promise = new Promise(function(resolve, reject) {
          action.__resolve = resolve
          action.__reject = reject
        })
        console.log('promise is,', promise)
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
