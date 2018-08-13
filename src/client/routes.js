/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 20:24
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
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
        path: '/',
        exact: true,
        redirectTo: '/blog/list', // for server
        component: () => <Redirect to="/blog/list" />,
      },
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/blog',
        exact: true,
        component: Blog,
        routes: [
          {
            path: '/blog/list',
            exact: true,
            component: BlogList,
          },
          {
            path: '/blog/detail/:blogId',
            exact: true,
            component: BlogDetail,
          },
          {
            path: '/blog/add',
            exact: true,
            component: BlogEdit,
          },
          {
            path: '/blog/edit/:blogId',
            exact: true,
            component: BlogEdit,
          }
        ]
      }
    ],
  }
]