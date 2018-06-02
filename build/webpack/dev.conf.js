'use strict';

const path = require('path');
const {dest} = require('../config');
const devConf = require('./base.conf');

devConf.cache = true;
devConf.watch = true;
devConf.devtool = '#eval-source-map';
// devConf.devServer = {
//   historyApiFallback: true,
//   noInfo: true,
//   overlay: true,
//   hot: true,
//   contentBase: path.resolve(dest.dir),
//   port: 3000,
// };

module.exports = devConf;
