/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 20:27
 */
import React from 'react'
import { connect } from 'react-redux'

async function fetchData (dispatch) {
  return await dispatch('blogList/getList')
}

@connect(({ blogList }) => {
  return { blogList }
})
export default class BlogList extends React.Component{
  static propTypes = {}
  static fetchData = async function (dispatch) {
    return await dispatch({ type: 'blogList/getList'})
  }
  componentWillMount() {
    const { dispatch } = this.props
    BlogList.fetchData(dispatch)
  }
  render() {
    const { blogList } = this.props
    const { isLoading, list } = blogList
    return (
      <div className="m-blog-list">
        {isLoading && 'loading'}
        {JSON.stringify(list)}
      </div>
    )
  }
}