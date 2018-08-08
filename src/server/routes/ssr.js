/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/7
 * Time 17:50
 */
import routes from '../../client/routes'
import { matchRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'
import {registerModel, getStore} from './modelRegister'
import { encode, decode } from '../utils/jwt'

function getRedirectUrl(routePathArr) {
  for(let item of routePathArr) {
    if (item.match.isExact && item.route.redirectTo) {
      return item.route.redirectTo
    }
  }
}

function getAllRequestPromise(routePathArr, store) {
  const promiseArr = []
  for(let item of routePathArr) {
    if (item.route.component.fetchData) {
      promiseArr.push(item.route.component.fetchData(store.dispatch))
    }
  }
  return Promise.all(promiseArr)
}
function getRoutes() {
  return async function(ctx, next) {
    const routePathArr = matchRoutes(routes, ctx.url)
    if (!routePathArr.length) {
      return next()
    }
    console.log(routePathArr)
    const redirectUrl = getRedirectUrl(routePathArr)
    if (redirectUrl) {
      ctx.redirect(redirectUrl)
    } else {
      let jwt = ''
      if (ctx.session.logined && ctx.session.userId) {
        jwt = encode(ctx.session.userId)
      }
      const store = getStore({ preloadedState: { jwt } })
      await getAllRequestPromise(routePathArr, store)
      console.log(store, store.getState())
    }

  }
}
module.exports = {
  routes: getRoutes,
}