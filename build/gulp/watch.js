'use strict';

const gulp   = require('gulp');
const watch  = require('gulp-watch');
const shell  = require('gulp-shell');
const {argv} = require('yargs');

const {src, dest} = require('../config');

gulp.task('watch', () => {
  watch(src.dir + '/**/*.pug', () => gulp.start(['pug']));
  watch(src.dir + '/**/*.{scss,sass}', () => gulp.start(['sass']));

  if (argv.bs) {
    console.log('no-browser-sync');
  } else {
    watch([
      dest.assets + '/**/*',
      dest.dir + '/_pages/*',
    ], () => gulp.start(['bs-reload']));
  }
});

// browser-sync無効でwatchを走らせる
gulp.task('watch_noreload', shell.task([
  'gulp watch --bs=false',
]));
