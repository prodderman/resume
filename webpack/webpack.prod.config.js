const path = require('path');
const webpack = require('webpack');
const config = require('webpack-config');
const etp = require('extract-text-webpack-plugin');


module.exports = new config.default().merge({
  output: {
    filename: 'js/[name].js',
    publicPath: "",
    path: path.resolve(__dirname, "..", 'dist'),
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
        use: etp.extract({
          fallback: 'style-loader',
          publicPath: "../",
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              minimize: true,
            },
          }, ],
        })
      },
      {
        test: /\.styl$/,
        use: etp.extract({
          fallback: 'style-loader',
          publicPath: "../",
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: false,
                minimize: true
              },
            },
            'stylus-loader',
          ],
        }),
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: false
        }
      },
      {
        test: /\.(svg|png|ico|xml|json|webmanifest)$/,
        loader: 'file-loader',
        include: [
          path.resolve(__dirname, '..', 'src/global/favicons')
        ],
        options: {
          name: 'favicons/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|svg)$/,
        exclude: [
          /fonts/,
          path.resolve(__dirname, 'src/global/favicons')
        ],
        loader: 'file-loader',
        options: {
          name: "img/[name].[ext]"
        }
      },
      {
        test: /\.(svg|otf|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        exclude: [
          /node_modules/,
          /img/,
          path.resolve(__dirname, 'src/global/favicons')
        ],
        options: {
          name: "font/[name]/[name].[ext]"
        }
      },
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
    new etp({
      filename: "css/[name].css",
      allChunks: true
    }),
  ],
})