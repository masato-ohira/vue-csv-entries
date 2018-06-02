'use strict';

const gulp        = require('gulp');
const pug         = require('gulp-pug');
const pugGlobbing = require('pug-include-glob');

const plumber     = require('gulp-plumber');
const changed     = require('gulp-changed');
const cache       = require('gulp-cached');
// const rename   = require('gulp-rename');
const data        = require('gulp-data');
const fs          = require('fs');

const prettify    = require('gulp-html-beautify');
const {src, dest, vars} = require('../config');

const MarkdownIt  = require('markdown-it');
const Sugar       = require('sugar');


// Opts
const OPTS = {
  pug: {
    plugins: [pugGlobbing()],
    basedir: src.pug,
  },
  files: {
    pages: [
      `${src.pug}/**/**/!(_)*.pug`,
    ],
    excludes: [
      `!${src.pug}/**/*_copy.pug`,
      `!${src.pug}/**/*コピー.pug`,
      `!${src.pug}/**/*コピー2.pug`,
      `!${src.pug}/**/*コピー3.pug`,
    ],
  },
  prettify: {
    indent_char: ' ',
    indent_size: 2,
  },
};

const loadData = {
  VARS: vars,
  // pug内でspreadsheetを使いたいなら
  // 下記をONにする
  // sheets: JSON.parse(
  //   fs.readFileSync(`${src.json}/sheets.json`)
  // ),

  // pug内でsugar.jsやmarkdownを
  // 利用可能にする
  sugar: Sugar,
  md: new MarkdownIt({
    breaks: true,
    html: true,
    linkify: true,
  }),
};


// Tasks
gulp.task('pug', () => {
  return gulp.src(
    OPTS.files.pages.concat(OPTS.files.excludes)
  )
    .pipe(plumber())
    // cacheを有効にするなら下記をONにする
    // .pipe(changed(dest.dir, {extension: '.html'}))
    // .pipe(cache('pug'))
    .pipe(data(() => {
      return loadData;
    }))
    .pipe(pug(OPTS.pug))
    .pipe(prettify(OPTS.prettify))
    .pipe(gulp.dest(dest.dir));
});
