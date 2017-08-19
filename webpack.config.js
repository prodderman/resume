const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const hwp = require('html-webpack-plugin');
const config = require('webpack-config');

const pages = [];

const paths = {
  pages: path.resolve(__dirname,'src','pages'),
  dist: path.resolve(__dirname,'dist'),
};

fs
  .readdirSync(paths.pages)
  .forEach((file) => {
    pages.push(file);
  });

const htmls = pages.map(fileName => new hwp({
  filename: `${fileName}.html`,
  chunks: [`${fileName}`, 'common'],
  template: `./src/pages/${fileName}/${fileName}.pug`,
}));

const entries = pages.reduce((entry, fileName) => {
  entry[fileName] = `./src/pages/${fileName}/${fileName}.js`;
  return entry;
}, {});

module.exports = new config.default().merge({
  entry: entries,
  output: {
    path: paths.dist,
    filename: "js/[name].js",
    library: '[name]'
  },

  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
  ].concat(htmls),

  
}).extend("webpack/webpack.[NODE_ENV].config.js");