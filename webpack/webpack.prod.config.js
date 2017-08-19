const path = require('path');
const webpack = require('webpack');
const config = require('webpack-config');


module.exports = new config.default().merge({
  output: {
    filename: 'js/[name]-[hash].js',
    path: path.resolve(__dirname, "..", 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: false
        }
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }) 
  ],
})