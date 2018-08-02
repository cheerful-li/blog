/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/2
 * Time 12:15
 */
import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ blogEdit, app }) => {
  return { blogEdit, app}
}
@connect(mapStateToProps)
export default class BlogEdit extends React.Component{
  static propTypes = {}
  static async fetchData(dispatch, isEdit, blogId) {
    if (isEdit) {
      await dispatch({ type: 'blogEdit/getBlogDetail', payload: { blogId }})
    }
  }
  componentWillMount() {
    const { match, dispatch, } = this.props
    const { url, params } = match
    BlogEdit.fetchData(dispatch, url !== '/blog/add', params.blogId)
  }
  setModelState = (state = {}) => {
    return this.dispatchModelEffect('setState', state)
  }
  dispatchModelEffect = (type, payload = {}) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'blogEdit/' + type,
      payload,
    })
  }
  submit = () => {
    const { blogEdit, match } = this.props
    const { title, summary, md } = blogEdit
    const isEdit = match.url !== '/blog/add'
    const blogId = match.params.blogId
    this.dispatchModelEffect('submit', { isEdit, blogId})
  }
  render() {
    const { blogEdit, match } = this.props
    const { title, summary, md, isLoading } = blogEdit
    const isEdit = match.url !== '/blog/add'
    const blogId = match.params.blogId
    return (
      <div className="m-blog-edit">
        { isLoading && 'loading'}
        <input
          type="text"
          className="title"
          placeholder={'标题'}
          value={title}
          onChange={e => this.setModelState({ title: e.target.value })}
        /><br/>
        <input
          type="text"
          className="summary"
          placeholder={'概况'}
          value={summary}
          onChange={e => this.setModelState({ summary: e.target.value })}
        /><br/>
        <textarea
          className="md"
          placeholder={'内容'}
          value={md}
          onChange={e => this.setModelState({ md: e.target.value })}
        ></textarea><br/>
        <button
          className="submit"
          onClick={this.submit}
        >提交</button>
      </div>
    )
  }
}
 