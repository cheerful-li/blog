/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/7/25
 * Time 22:02
 */
import React from 'react'
import { hot } from 'react-hot-loader'
import qs from 'qs'
import { connect } from 'react-redux'
import { matchRoutes, renderRoutes } from 'react-router-config'

@connect(({ app }) => {
  return { app }
})
class App extends React.Component{
  static fetchData = async function (dispatch) {
    return await dispatch({ type: 'app/checkLoginState'})
  }
  componentWillMount() {
    const { dispatch } = this.props
    App.fetchData(dispatch)
  }
  render() {
    const { route, match } = this.props
    console.log(route, match)
    return (
      <div className="m-app">
        {renderRoutes(route.routes)}
      </div>
    )
  }
}
// react HMR
export default hot(module)(App)