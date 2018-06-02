'use strict';

const SRC    = './_src';
const WEB_ROOT   = './public_html';
const DEST   = './public_html';
const ASSETS = DEST + '/assets';

module.exports = {
  vars: {
    siteName: 'CSV 2 ENTRIES',
    root: '/',
    host: 'https://example.com',
    // assets: '/assets', // ルート相対
    assets: './assets', // 相対
  },
  src: {
    'dir': SRC,
    'js': SRC + '/js',
    'sass': SRC + '/sass',
    'pug': SRC + '/pug',
    'json': SRC + '/json',
    'fonts': SRC + '/fonts',
    'vue': SRC + '/vue',
    'port': 8001,
  },
  dest: {
    'dir': DEST,
    'root': WEB_ROOT,
    'assets': ASSETS,
    'css': ASSETS + '/css',
    'js': ASSETS + '/js',
    'json': ASSETS + '/json',
    'ssi': ASSETS + '/ssi',
    'fonts': ASSETS + '/fonts',
    'img': ASSETS + '/img',
  },
  browsers: [
    'last 5 versions',
    'ie >= 11',
    'safari >= 8',
    'ios >= 8',
    'android >= 5',
  ],
  npm: './node_modules',
};
