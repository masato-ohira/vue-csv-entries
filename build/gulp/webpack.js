'use strict';

const gulp          = require('gulp');
const plumber       = require('gulp-plumber');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');

const {src, dest} = require('../config');

// tasks
gulp.task('webpack', () => {
  const devConf = require('../webpack/dev.conf');
  return webpackStream(devConf, webpack)
    .pipe(plumber())
    .pipe(gulp.dest(dest.js));
});

gulp.task('webpack_prod', () => {
  const prodConf = require('../webpack/prod.conf');
  return webpackStream(prodConf, webpack)
    .pipe(plumber())
    .pipe(gulp.dest(dest.js));
});
