/* eslint-disable */
var gulp = require('gulp');
var babel = require('gulp-babel');
var shell = require('gulp-shell');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var rimraf = require('rimraf');

/**
 * Where compiled files go.
 * NOTE: Do not edit anything here. Changes will be deleted upon next build.
 * @type {String}
 */
var TMP_DIR = '.tmp';

/**
 * Where test files go.
 * @type {String}
 */
var TEST_DIR = 'test';

/**
 * Where source code goes.
 * @type {String}
 */
var SOURCE_DIR = 'src';

/**
 * Test files.
 * @type {String}
 */
var TEST_FILES = `${TEST_DIR}/**/*.test.js`;
var TEST_DIR_CONTENT = `${TEST_DIR}/**/*.js`;

/**
 * Source files.
 * @type {String}
 */
var SOURCE_FILES = `${SOURCE_DIR}/**/*.js`;

/**
 * Holds all files.
 * @type {Array}
 */
var FILES = []
.concat(TEST_FILES)
.concat(TEST_DIR_CONTENT)
.concat(SOURCE_FILES);

/**
 * `gulp default`
 * An alias for `test` task.
 */
gulp.task('default', ['test'], function () {
});

/**
 * `gulp test`
 * Runs test files.
 */
gulp.task('test/unit', ['compile'], shell.task([
  `blue-tape ${TMP_DIR}/${TEST_FILES} | faucet`,
]));

/**
 * `gulp compile`
 * Compiles ES6 files into ES5.
 */
gulp.task('compile', ['lint', 'clean'], function () {
  return gulp.src(FILES, {base: '.'})
  .pipe(babel())
  .pipe(rename(function (p) { p.extname = '.js' }))
  .pipe(gulp.dest(TMP_DIR));
});

/**
 * `gulp lint`
 * Checks ES6 files for syntax errors.
 */
gulp.task('lint', function () {
  var filesToLint = FILES.concat([
    'gulpfile.babel.js',
  ]);

  return gulp.src(filesToLint)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

/**
 * `gulp clean`
 * Deletes temporal directory.
 */
gulp.task('clean', function (done) {
  rimraf(TMP_DIR, done);
});

gulp.on('err', function (e) {
  console.log(e.err.stack);
});
