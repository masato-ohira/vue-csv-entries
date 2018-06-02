'use strict';

const webpack = require('webpack');
const prodConf = require('./base.conf');

prodConf.watch = false;
prodConf.devtool = '#source-map';
prodConf.plugins =  (prodConf.plugins || []).concat([

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    extractComments: true,
    compress: {
      warnings: false,
    },
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
]);

module.exports = prodConf;
