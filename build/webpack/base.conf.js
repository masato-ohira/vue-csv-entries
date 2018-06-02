'use strict';

const path = require('path');
const webpack = require('webpack');
const Notifier = require('webpack-notifier');
const cssnext = require('postcss-cssnext');
const {src, browsers} = require('../config');

module.exports = {
  entry: {
    app: `${src.js}/app.js`,
    vendor: [
      'vue',
      'sugar',
      'jquery',
    ],
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax=1',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            cssnext({
              browsers: browsers,
              warnForDuplicates: false,
            }),
          ],
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader',
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax=1',
            ],
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  // バンドル対象外
  // externals: {
  //   'jquery': '$',
  // },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    modules: [
      'node_modules',
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(src.dir),
      '@vue': path.resolve(src.vue),
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
  performance: {
    hints: false,
  },

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
    }),

    // new Notifier({
    //   alwaysNotify: true
    // }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
