/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 20:27
 */
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

async function fetchData (dispatch) {
  return await dispatch('blogList/getList')
}

@connect(({ blogList, app }) => {
  return { blogList, app }
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
    const { blogList, app } = this.props
    const { isLoading, list } = blogList
    const { isLogined, userId } = app
    console.log(isLogined , userId,)
    return (
      <div className="m-blog-list">
        { isLogined && (
          <NavLink to="/blog/add">添加</NavLink>
        )}
        {isLoading && 'loading'}
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                {item.title}<br/>
                { item.summary}<br/>
                { item.lastModifiedDate } <br/>
                {isLogined && userId === item.authorId  && (
                  <NavLink to={"/blog/edit/" + item.id}>编辑</NavLink>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}