'use strict';

const gulp       = require('gulp');
const sass       = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob   = require('gulp-sass-glob');
const csso       = require('gulp-csso');
const notify     = require('gulp-notify');
const changed    = require('gulp-changed');
const cache      = require('gulp-cached');
const plumber    = require('gulp-plumber');

// postcss
const postcss    = require('gulp-postcss');
const cssnext    = require('postcss-cssnext');
const mqpacker   = require('css-mqpacker');

const {src, dest, browsers} = require('../config');

gulp.task('sass', () => {
  gulp.src([
      src.sass + `/*.sass`,
      src.sass + `/*.scss`,
    ])
    .pipe(plumber())
    .pipe(changed(dest.dir, {extension: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error',
      notify.onError( (error) => {
        return error.message;
      }
    )))
    .pipe(postcss([
      cssnext({
        browsers: browsers,
        warnForDuplicates: false,
      }),
      mqpacker,
    ]))
    .pipe(csso())
    .pipe(cache('sass'))
    // .pipe(notify(`build <%= file.relative %>`))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest.css));
});
