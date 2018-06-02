'use strict';

const gulp    = require('gulp');
const browser = require('browser-sync');
const ssi     = require('browsersync-ssi');
const {src, dest}  = require('../config');

gulp.task('server', () => {
  browser({
    server: dest.dir,
    directory: true,
    open: 'external',
    port: src.port,
    startPath: '/',
    ghostMode: false,
    notify: false,

    middleware: [
      ssi({
        baseDir: dest.dir,
        ext: '.html',
      }),
    ],
  });
});

gulp.task('bs-reload', () => {
  browser.reload();
});

