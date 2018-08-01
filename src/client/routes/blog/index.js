/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 20:27
 */
import React from 'react'
import { matchRoutes, renderRoutes } from 'react-router-config'

export default class Blog extends React.Component{
  static propTypes = {}
  render() {
    const { route, match } = this.props
    return (
      <div className="m-blog">
        blog
        {renderRoutes(route.routes)}
      </div>
    )
  }
}