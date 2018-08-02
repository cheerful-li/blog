/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 20:24
 */
import React from 'react'
import App from './routes/app.js'
import Login from './routes/login.js'
import Blog from './routes/blog/index.js'
import BlogList from './routes/blog/list.js'
import BlogDetail from './routes/blog/detail.js'
import BlogEdit from './routes/blog/edit.js'

export default [
  {
    component: App,
    routes: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/blog',
        component: Blog,
        routes: [
          {
            path: '/blog/list',
            component: BlogList,
          },
          {
            path: '/blog/detail/:blogId',
            component: BlogDetail,
          },
          {
            path: '/blog/add',
            component: BlogEdit,
          },
          {
            path: '/blog/edit/:blogId',
            component: BlogEdit,
          }
        ]
      }
    ],
  }
]