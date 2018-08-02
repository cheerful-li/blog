/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/2
 * Time 12:15
 */
import React from 'react'
import { connect } from 'react-redux'

@connect()
export default class BlogEdit extends React.Component{
  static propTypes = {}
  static async fetchData(dispatch) {
    await dispatch()
  }
  render() {
    return (
      <div className="m-blog-edit">
        edit
      </div>
    )
  }
}
 