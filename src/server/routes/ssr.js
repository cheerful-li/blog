/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/7
 * Time 17:50
 */
import routes from '../../client/routes'
import { matchRoutes } from 'react-router-config'

function getRedirectUrl(routePathArr) {
  for(let item of routePathArr) {
    if (item.match.isExact && item.route.redirectTo) {
      return item.route.redirectTo
    }
  }
}

function getAllRequestPromise(routePathArr, dispatch) {
  const promiseArr = []
  for(let item of routePathArr) {
    if (item.route.component.fetchData) {}
  }
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
      getAllRequestPromise(routePathArr)
    }


  }
}
module.exports = {
  routes: getRoutes,
}