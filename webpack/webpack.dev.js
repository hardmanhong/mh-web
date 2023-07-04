const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const paths = require('./paths')

const config = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.module\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:6]'
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      logging: 'error',
      progress: true,
      overlay: {
        errors: true,
        warnings: false
      }
    },
    static: {
      directory: paths.public
    },
    compress: true,
    open: false,
    hot: true,
    proxy: {
      '/v1': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/v1': ''
        }
      }
    }
  }
})

module.exports = config
