const path = require('path');
const webpack = require('webpack');
const config = require('webpack-config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new config.default().merge({
  devtool: 'source-map',
  output: {
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'stylus-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2|xml|json|webmanifest)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    port: 8080,
    inline: true,
    hot: true,
    lazy: false,
    contentBase: "dist",
    stats: 'errors-only'
  }
})