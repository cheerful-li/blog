/**
 * Created by lilieming@xiaoduotech.com
 * Date 2018/8/1
 * Time 20:25
 */
import React from 'react'
import { hot } from 'react-hot-loader'
import qs from 'qs'
import { connect } from 'react-redux'

export default class Login extends React.Component{
  render() {
    const githubAuthParams = {
      client_id: '0d644dadb0736ac9ab23',
      redirect_uri: 'http://localhost:3000/xhr/oauth/github/codeCallback',
      scope: 'read:user',
    }
    return (
      <div className="m-login">
        <a href={`https://github.com/login/oauth/authorize?${qs.stringify(githubAuthParams)}`}>github登录</a>
      </div>
    )
  }
}