const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const paths = require('./paths')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const argv = require('minimist')(process.argv.slice(2))

console.log('argv', argv)
const isAnalyze = argv.analyze

const config = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.module\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
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
  plugins: [
    // isAnalyze && new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    })
  ],
  optimization: {
    minimize: true,
    // 优化压缩
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
          mangle: {
            safari10: true
          },
          // Added for profiling in devtools
          keep_classnames: process.argv.includes('--profile'),
          keep_fnames: process.argv.includes('--profile'),
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          },
          sourceMap: false
        }
      })
    ]
  }
})

module.exports = config
