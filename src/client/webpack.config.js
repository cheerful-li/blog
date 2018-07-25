const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const packageJson = require('../../package.json')

// console.warn('is development/?', process.env.NODE_ENV === 'development' ,process.env.NODE_ENV)

const extractLess = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development',
})

let webpackConfig =
  {
    mode: process.env.NODE_ENV || 'none',
    entry: {
      app: './index.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.NODE_ENV === 'development' ? '/' : '/dist',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
            loader: 'babel-loader',
          }],
        },
        {
          test: /\.css$/,
          use: extractLess.extract({
            use: [{
              loader: 'css-loader',
            }],
            // use style-loader in development
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.less$/,
          use: extractLess.extract({
            use: [{
              loader: 'css-loader',
            }, {
              loader: 'less-loader',
            }],
            // use style-loader in development
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|ogg|mp3|wma)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[md5:hash:hex:6].[ext]',
            },
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      ],
    },
    devtool: 'cheap-eval-source-map', /* 'inline-source-map'*/
    plugins: [
      // new es3ifyPlugin(),
      extractLess,
      new webpack.DefinePlugin({
        CVD_CLIENT_VERSION: JSON.stringify(`version: ${packageJson.version}, build on ${(new Date()).toLocaleString()}`),
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: process.env.NODE_ENV === 'development' ? 'index.html' : 'index.html',
        chunks: ['app'],
      })
    ],
  }
if (process.env.NODE_ENV === 'development') {
  console.log('development use devServer')
  webpackConfig.devtool = 'inline-source-map'
  webpackConfig.devServer = {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/',
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      '/xhr': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        proxyTimeout: 10000000,
        logLevel: 'info',
      },
    },
  }
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  webpackConfig.devtool = false
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // properties: false,
        warnings: false,
      },
      output: {
        // beautify: true,
        // quote_keys: true,
      },
      mangle: {
        // screw_ie8: false,
      },
      sourceMap: false,
    })
  )
}

// 打包开发文件
module.exports = webpackConfig
