const path = require('path');
const webpack = require('webpack');
const config = require('webpack-config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
          path.resolve(__dirname, 'src/vendors/'),
        ],
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
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
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    inline: true,
    contentBase: 'dist',
    port: process.env.PORT
  }
})