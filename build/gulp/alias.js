'use strict';

const gulp        = require('gulp');
const shell       = require('gulp-shell');
const runSequence = require('run-sequence');

gulp.task('default', (callback) => {
  return runSequence(
    'server',
    ['watch', 'webpack'],
    callback
  );
});

gulp.task('build', (callback) => {
  return runSequence(
    ['pug', 'sass', 'webpack_prod'],
    // ['pug_all'],
    callback
  );
});

gulp.task('deploy', (callback) => {
  return runSequence(
    'build',
    'git-ftp',
    callback
  );
});

// sehll task
gulp.task('cmod', shell.task([
  'find ./public_html/ -type f -print | xargs chmod 644',
]));

gulp.task('commit', shell.task([
  `git add .`,
  `git commit -a -m 'auto commit'`,
]));

gulp.task('git-ftp', shell.task([
  `git add .`,
  `git commit -a -m 'auto commit'`,
  `git ftp push -k -s dev`,
]));
