const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const hwp = require('html-webpack-plugin');
const config = require('webpack-config');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const pages = [];

const paths = {
  pages: path.resolve(__dirname, 'src', 'pages'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = new config.default().merge({
  entry: `./src/pages/resume-page/resume-page.js`,
  output: {
    path: paths.dist,
    filename: "js/[name].js"
  },

  module: {
    noParse: function (content) {
      return /jquery|lodash/.test(content);
    },
  },

  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },

  plugins: [
    new CleanPlugin(['./dist']),
    new webpack.ProgressPlugin(),
    new hwp({
      filename: `resume.html`,
      chunks: ['common', 'main'],
      template: `./src/pages/resume-page/resume-page.pug`,
      alwaysWriteToDisk: true,
      inject: 'body',
      hash: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],


}).extend("webpack/webpack.[NODE_ENV].config.js");