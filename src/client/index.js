/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/25
 * Time 20:11
 */
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { connect, Provider  } from 'react-redux'
import getStore from './getStore'

import routes from './routes.js'



const store = getStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
 