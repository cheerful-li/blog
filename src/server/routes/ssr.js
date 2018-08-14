/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/7
 * Time 17:50
 */

import { matchRoutes, renderRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { connect, Provider  } from 'react-redux'
import React from 'react'
const fs = require('fs')
const path = require('path')

const { promisify, delay } = require('../utils/index.js')
import routes from '../../client/routes'
import getStore from '../../client/getStore'
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
      promiseArr.push(item.route.component.fetchData(store.dispatch, item.match))
    }
  }
  return Promise.all(promiseArr)
}
function getDomString(url, store) {
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  )
  return html
}
async function getPageHtml({ url, state, reactString }) {
  const insertPoint = '<div id=root></div>'
  // console.log(123123, path.join(__dirname, '../../client/dist/index.html'))
  const indexHtmlTemplate = await promisify(fs.readFile, fs)(path.join(__dirname, '../../client/dist/index.html'), { encoding: 'utf8'})
  // console.log(indexHtmlTemplate)
  const replaceStr = `<div id=root>${reactString}</div><script>window.REDUX_INIT_STATE = ${JSON.stringify(state)}</script>`
  return indexHtmlTemplate.replace(insertPoint, replaceStr)
}
function getRoutes() {
  return async function(ctx, next) {
    const routePathArr = matchRoutes(routes, ctx.url)
    // console.log('matchRoutes ', ctx.url, 'get ', routePathArr)
    if (ctx.url !== '/' && routePathArr.length < 2) {
      // console.log('not matched to ssr', ctx.url)
      return next()
    }
    console.log('matched ssr path', ctx.url)
    const redirectUrl = getRedirectUrl(routePathArr)
    if (redirectUrl) {
      ctx.redirect(redirectUrl)
    } else {
      let jwt = ''
      if (ctx.session.logined && ctx.session.userId) {
        jwt = encode({ userId: ctx.session.userId})
      }
      const store = getStore({ preloadedState: { jwt } })
      const resultArr = await getAllRequestPromise(routePathArr, store)
      // await delay(10000)
      // console.log('state: ' ,store.getState())
      const domString = getDomString(ctx.url, store)
      // console.log('state: ' ,store.getState())
      const responseHtml = await getPageHtml({
        url: ctx.url,
        state: store.getState(),
        reactString: domString,
      })
      ctx.body = responseHtml
    }

  }
}
module.exports = {
  routes: getRoutes,
}