const webpack = require('webpack');
const config = require('webpack-config');

module.exports = new config.default().merge({
  devtool: 'eval',
  output: {
    pathinfo: true,
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  watch: true,

  devServer: {
    contentBase: 'dist',
    port: process.env.PORT
  }
})