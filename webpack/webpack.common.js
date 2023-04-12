const paths = require('./paths')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: {
    app: `${paths.src}/index.tsx`
  },
  output: {
    path: paths.build,
    publicPath: isDev ? '/' : './',
    filename: isDev
      ? 'static/js/bundle.js'
      : 'static/js/[name].[contenthash:8].js',
    chunkFilename: isDev
      ? 'static/js/[name].chunk.js'
      : 'static/js/[name].[contenthash:8].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '聚宝盆',
      template: paths.appHtml
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': paths.src
    }
  }
}
module.exports = config
